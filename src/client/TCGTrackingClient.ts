import { z } from 'zod';
import { ScanProps, ScanPropsSchema, TCGTrackingClientProps } from './TCGTrackingClient.types';
import {
  MetaSchema,
  Meta,
  CategoryListSchema,
  CategoryList,
  SetList,
  SetListSchema,
  ProductSkuList,
  ProductListSchema,
  ProductSkuListSchema,
  ProductList,
  ExpandedProduct,
  ExpandedProductSchema,
  SetSearchList,
  SetSearchListSchema,
  ProductPriceList,
  ProductPriceListSchema,
} from '../schemas';
import { HTTPError, ValidationError } from '../error';
import { isValidId } from '../utils';
import { PRODUCT_TYPE, ProductType } from '../constants';

export class TCGTrackingClient {
  #strictSchemas: Map<z.ZodType, z.ZodType>;
  #props: Required<TCGTrackingClientProps>;

  public constructor(props: TCGTrackingClientProps) {
    this.#props = {
      baseUrl: 'https://openapi.tcgtracking.com/',
      strict: false,
      ...props,
    };
    this.#strictSchemas = new Map();
  }

  public async getMeta(): Promise<Meta> {
    return this.#requestAndParse('/v1/meta', MetaSchema);
  }

  public async getCategories(): Promise<CategoryList> {
    return this.#requestAndParse('/v1/categories', CategoryListSchema);
  }

  public async getSets(categoryId: number): Promise<SetList> {
    if (!isValidId(categoryId)) {
      throw new ValidationError(`Category "${categoryId}" is invalid, must be a positive integer.`);
    }

    return this.#requestAndParse(`/v1/${categoryId}/sets`, SetListSchema);
  }

  public async searchSets(categoryId: number, query: string): Promise<SetSearchList> {
    if (!isValidId(categoryId)) {
      throw new ValidationError(`Category "${categoryId}" is invalid, must be a positive integer.`);
    }

    return this.#requestAndParse(
      `/v1/${categoryId}/search?q=${encodeURIComponent(query)}`,
      SetSearchListSchema
    );
  }

  public async getProducts(
    categoryId: number,
    setId: number,
    productType?: ProductType
  ): Promise<ProductList> {
    if (!isValidId(categoryId)) {
      throw new ValidationError(`Category "${categoryId}" is invalid, must be a positive integer.`);
    }

    if (!isValidId(setId)) {
      throw new ValidationError(`Set "${setId}" is invalid, must be a positive integer.`);
    }

    if (productType !== undefined) {
      if (!Object.values(PRODUCT_TYPE).includes(productType)) {
        throw new ValidationError(
          `Product type "${productType}" is invalid, must be one of: ${Object.values(PRODUCT_TYPE).join(', ')}.`
        );
      }

      return this.#requestAndParse(
        `/v1/${categoryId}/sets/${setId}/${productType}`,
        ProductListSchema
      );
    }

    return this.#requestAndParse(`/v1/${categoryId}/sets/${setId}`, ProductListSchema);
  }

  public async getProduct(productId: number): Promise<ExpandedProduct> {
    if (!isValidId(productId)) {
      throw new ValidationError(`Product "${productId}" is invalid, must be a positive integer.`);
    }

    return this.#requestAndParse(`/v1/products/${productId}`, ExpandedProductSchema);
  }

  public async getProductPrices(categoryId: number, setId: number): Promise<ProductPriceList> {
    if (!isValidId(categoryId)) {
      throw new ValidationError(`Category "${categoryId}" is invalid, must be a positive integer.`);
    }

    if (!isValidId(setId)) {
      throw new ValidationError(`Set "${setId}" is invalid, must be a positive integer.`);
    }

    return this.#requestAndParse(`/v1/${categoryId}/sets/${setId}/pricing`, ProductPriceListSchema);
  }

  public async getProductSkus(categoryId: number, setId: number): Promise<ProductSkuList> {
    if (!isValidId(categoryId)) {
      throw new ValidationError(`Category "${categoryId}" is invalid, must be a positive integer.`);
    }

    if (!isValidId(setId)) {
      throw new ValidationError(`Set "${setId}" is invalid, must be a positive integer.`);
    }

    return this.#requestAndParse(`/v1/${categoryId}/sets/${setId}/skus`, ProductSkuListSchema);
  }

  public async scan(props: ScanProps) {
    const { data, success, error } = ScanPropsSchema.safeParse(props);

    if (!success) {
      throw new ValidationError(`Invalid scan inputs: ${error.message}`);
    }

    const response = await this.#requestAndParse('/v1/scan', z.any(), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        game_id: data.gameId,
        set_ids: data.setIds,
        limit: data.limit,
        image: `data:image/jpeg;base64,${data.image.toString('base64')}`,
      }),
    });

    return response;
  }

  async #requestAndParse<T>(url: string, schema: z.ZodType<T>, init?: RequestInit): Promise<T> {
    if (this.#props.strict && schema instanceof z.ZodObject) {
      schema = this.#makeStrict(schema) as z.ZodType<T>;
    }

    const response = await this.#request(url, init);
    const body = await response.json();
    return schema.parse(body);
  }

  async #request(url: string, init?: RequestInit): Promise<Response> {
    const resolvedUrl = new URL(url, this.#props.baseUrl);
    const response = await fetch(resolvedUrl, {
      headers: {
        'user-agent': this.#props.userAgent,
        ...init?.headers,
      },
      ...init,
    });

    if (!response.ok) {
      throw new HTTPError(
        `Failed to fetch "${resolvedUrl}", received status ${response.status}: ${await response.clone().text()}`,
        { response }
      );
    }

    return response;
  }

  #makeStrict<TSchema extends z.ZodType>(
    schema: TSchema extends z.ZodObject ? TSchema : never
  ): TSchema {
    let newSchema = this.#strictSchemas.get(schema);

    if (newSchema) {
      return newSchema as TSchema;
    }

    if (schema instanceof z.ZodObject) {
      const newShape: { [key: string]: z.ZodType } = {};

      Object.entries(schema.shape).forEach(([key, subSchema]: [string, z.ZodObject]) => {
        newShape[key] = this.#makeStrict(subSchema);
      });

      newSchema = z.object(newShape).strict();
      this.#strictSchemas.set(schema, newSchema!);
      return newSchema as unknown as TSchema;
    }

    return schema;
  }
}
