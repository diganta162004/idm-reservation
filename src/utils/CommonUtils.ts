declare const USE_MOCK_DATA: string;

export const isMocked: boolean = USE_MOCK_DATA.toString() === 'true' || false;
