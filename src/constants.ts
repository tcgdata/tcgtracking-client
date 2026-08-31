export const SET_TYPE = {
  SUPPLEMENTAL: 'supplemental',
  COMMANDER: 'commander',
  EXPANSION: 'expansion',
  MASTERPIECE: 'masterpiece',
  CORE: 'core',
  MEMORABILIA: 'memorabilia',
  MASTERS: 'masters',
  BOX: 'box',
  STARTER: 'starter',
  VANGUARD: 'vanguard',
  FUNNY: 'funny',
  PROMO: 'promo',
  PLANECHASE: 'planechase',
  DUEL_DECK: 'duel_deck',
  FROM_THE_VAULT: 'from_the_vault',
  PREMIUM_DECK: 'premium_deck',
  ARCHENEMY: 'archenemy',
  ARSENAL: 'arsenal',
  DRAFT_INNOVATION: 'draft_innovation',
  SPELLBOOK: 'spellbook',
  ETERNAL: 'eternal',
} as const;

export type SetType = (typeof SET_TYPE)[keyof typeof SET_TYPE];

export const PRODUCT_TYPE = {
  CARDS: 'cards',
  SEALED: 'sealed',
} as const;

export type ProductType = (typeof PRODUCT_TYPE)[keyof typeof PRODUCT_TYPE];

export const CARD_TRADER_PROPERTY_TYPE = {
  STRING: 'string',
  BOOLEAN: 'boolean',
} as const;

export type CardTraderPropertyType =
  (typeof CARD_TRADER_PROPERTY_TYPE)[keyof typeof CARD_TRADER_PROPERTY_TYPE];

export const CARD_TRADER_PRODUCT_TYPE = {
  ACCESSORY: 'accessory',
  BOOSTER: 'booster',
  BOOSTER_BOX: 'booster_box',
  BOX_SET: 'box_set',
  BUNDLER: 'bundle',
  COMPLETE_SET: 'complete_set',
  OVERSIZE: 'oversized',
  PRERELEASE: 'prerelease',
  PRECONSTRUCTED_DECK: 'precon_deck',
  SEALED: 'sealed',
  SINGLE: 'single',
  STARTER_DECK: 'starter_deck',
  TOKEN: 'token',
} as const;

export type CardTraderProductType =
  (typeof CARD_TRADER_PRODUCT_TYPE)[keyof typeof CARD_TRADER_PRODUCT_TYPE];

export const SKU_CONDITION = {
  NEAR_MINT: 'Near Mint',
  LIGHTLY_PLAYED: 'Lightly Played',
  MODERATELY_PLAYED: 'Moderately Played',
  HEAVILY_PLAYED: 'Heavily Played',
  DAMAGED: 'Damaged',
} as const;

export type SkuCondition = (typeof SKU_CONDITION)[keyof typeof SKU_CONDITION];

export const SKU_CONDITION_ABBREVIATION = {
  NEAR_MINT: 'NM',
  LIGHTLY_PLAYED: 'LP',
  MODERATELY_PLAYED: 'MP',
  HEAVILY_PLAYED: 'HP',
  DAMAGED: 'DMG',
} as const;

export type SkuConditionAbbreviation =
  (typeof SKU_CONDITION_ABBREVIATION)[keyof typeof SKU_CONDITION_ABBREVIATION];

export const SKU_CONDITION_ID = {
  NEAR_MINT: 1,
  LIGHTLY_PLAYED: 2,
  MODERATELY_PLAYED: 3,
  HEAVILY_PLAYED: 4,
  DAMAGED: 5,
} as const;

export type SkuConditionId = (typeof SKU_CONDITION_ID)[keyof typeof SKU_CONDITION_ID];

export const SKU_VARIANT = {
  NORMAL: 'Normal',
  HOLOFOIL: 'Holofoil',
  REVERSE_HOLOFOIL: 'Reverse Holofoil',
  FOIL: 'Foil',
  FIRST_EDITION: '1st Edition',
  UNLIMITED: 'Unlimited',
  LIMITED: 'Limited',
  FIRST_EDITION_HOLOFOIL: '1st Edition Holofoil',
  FIRST_EDITION_NORMAL: '1st Edition Normal',
  FIRST_EDITION_FOIL: '1st Edition Foil',
  UNLIMITED_HOLOFOIL: 'Unlimited Holofoil',
  UNLIMITED_EDITION_FOIL: 'Unlimited Edition Foil',
  UNLIMITED_EDITION_NORMAL: 'Unlimited Edition Normal',
  CARD_AND_DIE: 'Card and Die',
  CARD_ONLY: 'Card Only',
  DIE_ONLY: 'Die Only',
  PARALLEL_FOIL: 'Parallel Foil',
  PLASTIC: 'Plastic',
  HOLOHEX: 'Holohex',
  METAL: 'Metal',
  FIRST_WAVE_FOIL: '1st Wave Foil',
  RAINBOW_FOIL: 'Rainbow Foil',
  COLD_FOIL: 'Cold Foil',
  FIRST_EDITION_COLD_FOIL: '1st Edition Cold Foil',
  UNLIMITED_EDITION_RAINBOW_FOIL: 'Unlimited Edition Rainbow Foil',
  FIRST_EDITION_RAINBOW_FOIL: '1st Edition Rainbow Foil',
  HOLO: 'Holo',
  REVERSE_HOLO: 'Reverse Holo',
} as const;

export type SkuVariant = (typeof SKU_VARIANT)[keyof typeof SKU_VARIANT];

export const SKU_VARIANT_ABBREVIATION = {
  NORMAL: 'N',
  FOIL: 'F',
  HOLOFOIL: 'H',
  REVERSE_HOLOFOIL: 'RH',
  FIRST_EDITION: '1E',
  UNLIMITED: 'UL',
  FIRST_EDITION_HOLOFOIL: '1EH',
  UNLIMITED_HOLOFOIL: 'ULH',
  COLD_FOIL: 'CF',
  FIRST_EDITION_NORMAL: '1EN',
  PARALLEL_FOIL: 'PF',
  UNLIMITED_EDITION_NORMAL: 'UEN',
  FIRST_EDITION_RAINBOW_FOIL: '1ERF',
  UNLIMITED_EDITION_RAINBOW_FOIL: 'UERF',
  HOLO: 'HO',
  REVERSE_HOLO: 'RHO',
  RAINBOW_FOIL: 'RF',
  LIMITED: 'LM',
} as const;

export type SkuVariantAbbreviation =
  (typeof SKU_VARIANT_ABBREVIATION)[keyof typeof SKU_VARIANT_ABBREVIATION];

export const SKU_VARIANT_ID = {
  NORMAL: 1,
  FOIL: 2,
  HOLOFOIL: 3,
  REVERSE_HOLOFOIL: 4,
  REVERSE_HOLO: 5,
  FIRST_EDITION: 6,
  UNLIMITED: 7,
  FIRST_EDITION_HOLOFOIL: 8,
  UNLIMITED_HOLOFOIL: 9,
  COLD_FOIL: 10,
  RAINBOW_FOIL: 11,
  HOLO: 12,
  LIMITED: 13,
  FIRST_EDITION_NORMAL: 14,
  PARALLEL_FOIL: 15,
  UNLIMITED_EDITION_NORMAL: 16,
  FIRST_EDITION_RAINBOW_FOIL: 17,
  UNLIMITED_EDITION_RAINBOW_FOIL: 18,
} as const;

export type SkuVariantId = (typeof SKU_VARIANT_ID)[keyof typeof SKU_VARIANT_ID];

export const SKU_LANGUAGE = {
  ENGLISH: 'English',
  FRENCH: 'French',
  GERMAN: 'German',
  ITALIAN: 'Italian',
  JAPANESE: 'Japanese',
  SPANISH: 'Spanish',
  PORTUGUESE: 'Portuguese',
  RUSSIAN: 'Russian',
  KOREAN: 'Korean',
  CHINESE_SIMPLIFIED: 'Chinese (S)',
  CHINESE_TRADITIONAL: 'Chinese (T)',
} as const;

export type SkuLanguage = (typeof SKU_LANGUAGE)[keyof typeof SKU_LANGUAGE];

export const SKU_LANGUAGE_ABBREVIATION = {
  ENGLISH: 'EN',
  JAPANESE: 'JP',
  FRENCH: 'FR',
  GERMAN: 'DE',
  ITALIAN: 'IT',
  SPANISH: 'ES',
  PORTUGUESE: 'PT',
  RUSSIAN: 'RU',
  KOREAN: 'KO',
  CHINESE_SIMPLIFIED: 'CS',
  CHINESE_TRADITIONAL: 'CT',
} as const;

export type SkuLanguageAbbreviation =
  (typeof SKU_LANGUAGE_ABBREVIATION)[keyof typeof SKU_LANGUAGE_ABBREVIATION];

export const SKU_LANGUAGE_ID = {
  ENGLISH: 1,
  FRENCH: 2,
  GERMAN: 3,
  ITALIAN: 4,
  JAPANESE: 5,
  SPANISH: 6,
  PORTUGUESE: 7,
  RUSSIAN: 8,
  KOREAN: 9,
  CHINESE_SIMPLIFIED: 10,
  CHINESE_TRADITIONAL: 11,
} as const;

export type SkuLanguageId = (typeof SKU_LANGUAGE_ID)[keyof typeof SKU_LANGUAGE_ID];

export const MANAPOOL_SKU_VARIANT = {
  NORMAL: 'normal',
  FOIL: 'foil',
  ETCHED: 'etched',
} as const;

export type ManapoolSkuVariant = (typeof MANAPOOL_SKU_VARIANT)[keyof typeof MANAPOOL_SKU_VARIANT];

export const CATEGORY_ID = {
  MAGIC_THE_GATHERING: 1,
  YU_GI_OH: 2,
  POKEMON: 3,
  EPIC: 7,
  WO_W: 13,
  CARDFIGHT_VANGUARD: 16,
  FORCE_OF_WILL: 17,
  DICE_MASTERS: 18,
  FUTURE_CARD_BUDDY_FIGHT: 19,
  WEISS_SCHWARZ: 20,
  DRAGON_BALL_Z_TCG: 23,
  FINAL_FANTASY_TCG: 24,
  UNI_VERSUS: 25,
  STAR_WARS_DESTINY: 26,
  DRAGON_BALL_SUPER_MASTERS: 27,
  DRAGOBORNE: 28,
  META_X_TCG: 30,
  CARD_SLEEVES: 31,
  DECK_BOXES: 32,
  PLAYMATS: 35,
  ZOMBIE_WORLD_ORDER_TCG: 36,
  THE_CASTER_CHRONICLES: 37,
  MY_LITTLE_PONY_CCG: 38,
  EXODUS_TCG: 47,
  LIGHTSEEKERS_TCG: 48,
  PROTECTIVE_PAGES: 49,
  STORAGE_ALBUMS: 50,
  MUNCHKIN_CCG: 53,
  WARHAMMER_AGE_OF_SIGMAR_CHAMPIONS_TCG: 54,
  ARCHITECT_TCG: 55,
  BULK_LOTS: 56,
  TRANSFORMERS_TCG: 57,
  BAKUGAN_TCG: 58,
  KEY_FORGE: 59,
  CHRONO_CLASH_SYSTEM: 60,
  ARGENT_SAGA_TCG: 61,
  FLESH_AND_BLOOD_TCG: 62,
  DIGIMON_CARD_GAME: 63,
  ALTERNATE_SOULS: 64,
  GATE_RULER: 65,
  META_ZOO: 66,
  WIXOSS: 67,
  ONE_PIECE_CARD_GAME: 68,
  DISNEY_LORCANA: 71,
  BATTLE_SPIRITS_SAGA: 72,
  SHADOWVERSE_EVOLVE: 73,
  GRAND_ARCHIVE_TCG: 74,
  AKORA_TCG: 75,
  KRYPTIK_TCG: 76,
  SORCERY_CONTESTED_REALM: 77,
  ALPHA_CLASH: 78,
  STAR_WARS_UNLIMITED: 79,
  DRAGON_BALL_SUPER_FUSION_WORLD: 80,
  UNION_ARENA: 81,
  ELESTRALS: 83,
  NEOPETS_BATTLEDOME: 84,
  POKEMON_JAPAN: 85,
  GUNDAM_CARD_GAME: 86,
  HOLOLIVE_OFFICIAL_CARD_GAME: 87,
  GODZILLA_CARD_GAME: 88,
  RIFTBOUND_LEAGUE_OF_LEGENDS_TRADING_CARD_GAME: 89,
  COOKIE_RUN_BRAVERSE_TCG: 90,
} as const;

export type CategoryId = (typeof CATEGORY_ID)[keyof typeof CATEGORY_ID];
