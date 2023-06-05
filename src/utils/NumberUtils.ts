// check if value is a valid number
export const isANumber = (value: string | number): boolean => {
  // make sure its not null and also not 0, else !value will give true if 0
  if (!value && value !== 0) {
    return false;
  }
  // check for Infinity separately, below regex won't check for Infinity
  if (value === Infinity || value === -Infinity || typeof value === 'number') {
    return true;
  }
  // return !Number.isNaN(parseFloat(value.toString()));
  // regex to all negative and postive numbers with decimal places
  // does not handle infinity
  return /^(?!-0?(\.0+)?$)-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/.test(value.toString());
};

// gets value with fixed decimal places
// if its not valid number, then return back value as it is
export const toFixedDecimalPlaces = (
  value: string | number, decimalPlaces: number = 2,
): number | string => {
  if ((!value && value !== 0) || !isANumber(value)) {
    return value;
  }
  return Number.parseFloat(value.toString()).toFixed(decimalPlaces);
};

// formats currency to comma seperated with fixed decimal places
// if its not valid number, then return back value as it is
export const formatCurrency = (
  value: string | number, decimalPlaces: number = 2,
): string => {
  try {
    if ((!value && value !== 0) || !isANumber(value)) {
      return value.toString?.() || '';
    }
    const valueInFloat = typeof value === 'string' ? Number.parseFloat(value) : value;
    return valueInFloat.toLocaleString(
      'en-US', {
        maximumFractionDigits: decimalPlaces,
      },
    );
  } catch (e) {
    return value?.toString?.() || '';
  }
};
