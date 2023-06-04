export const HOMEPAGE_STATICS = {
  TITLE: 'Calculate your tax',
  YEAR_SELECT: {
    label: 'Select financial year',
    placeholder: 'Select year',
    defaultValue: '2022',
    options: [{
      id: '2019',
      name: '2019',
    }, {
      id: '2020',
      name: '2020',
    }, {
      id: '2021',
      name: '2021',
    }, {
      id: '2022',
      name: '2022',
    }],
  },
  INPUT_INCOME: {
    label: 'Enter total income per annum',
    placeholder: 'Enter total income',
    endDecorator: 'p.a.',
  },
  CALCULATE_BUTTON: {
    label: 'Calculate',
  },
  CALCULATED: {
    TOTAL_TAX_TEMPLATE: '$ {value}',
    TOTAL_TAX_LABEL: 'Yearly Tax',
    TAX_PERCENTAGE_TEMPLATE: '{value} %',
    TAX_PERCENTAGE_LABEL: 'Net Percentage',
    BRACKET_RATE_TEMPLATE: '{value} %',
    BRACKET_TAX_TEMPLATE: '$ {value}',
  },
};
