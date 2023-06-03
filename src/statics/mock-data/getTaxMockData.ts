export const GET_TAX_FOR_YEAR_MOCK_DATA = {
  tax_brackets: [{
    max: 50197, rate: 0.15,
  }, {
    max: 100392, min: 50197, rate: 0.205,
  }, {
    max: 155625, min: 100392, rate: 0.26,
  }, {
    max: 221708, min: 155625, rate: 0.29,
  }, {
    min: 221708, rate: 0.33,
  }],
};

// ERROR
export const GET_TAX_FOR_YEAR_MOCK_DATA2 = {
  errors: [{
    code: 'INTERNAL_SERVER_ERROR', field: '', message: 'Database not found!',
  }],
};
