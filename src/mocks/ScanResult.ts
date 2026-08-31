import { faker } from '@faker-js/faker';
import { ScanResult } from '../schemas';

export const createMockScanResult = (props: Partial<ScanResult> = {}): ScanResult => {
  return {
    success: faker.datatype.boolean(),
    game_id: faker.number.int(),
    set_ids: [faker.number.int()],
    cropped_image: 'data:image/jpeg;base64,...',
    results: [
      {
        product_id: faker.number.int(),
        score: faker.number.int(),
      },
    ],
    candidates_scanned: faker.number.int(),
    ...props,
  };
};
