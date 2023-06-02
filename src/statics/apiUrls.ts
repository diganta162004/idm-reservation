import { GET_TAX_FOR_YEAR_MOCK_DATA } from './mock-data/getTaxMockData';

export const API_URLS = {
  GET_TAX_DATA_FOR_YEAR: '/tax-calculator/tax-year/{year}',
};

export const MOCK_DATA = {
  [API_URLS.GET_TAX_DATA_FOR_YEAR]: GET_TAX_FOR_YEAR_MOCK_DATA,
};
