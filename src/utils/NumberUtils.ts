// gets value with fixed decimal places
export const toFixedDecimalPlaces = (
  value: string | number, decimalPlaces: number = 2,
): number | string => {
  if (!value || Number.isNaN(value)) {
    return value;
  }
  return Number.parseFloat(value.toString()).toFixed(decimalPlaces);
};

// formats currency to comma seperated with fixed decimal places
export const formatCurrency = (
  value: string | number, decimalPlaces: number = 2,
): string => {
  try {
    if (!value || Number.isNaN(value)) {
      return value.toString();
    }
    return value.toLocaleString(
      'en-US', {
        maximumFractionDigits: decimalPlaces,
      },
    );
  } catch (e) {
    return value.toString();
  }
};
