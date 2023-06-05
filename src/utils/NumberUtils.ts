/**
 * Checks if the value is a valid number, (including float, negative, Infinity and 0)
 *
 * Used by other utils
 *
 * @param  {string | number} value  value to check if number
 * @return {boolean} true for valid number else false
 */
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

/**
 * Gives back value with rounded off to a fixed decimal places
 * It internally checks if the value is valid number
 *
 * Used for rendering purpose
 *
 * @param  {string | number} value  value to convert, returns back value if fails to convert
 * @param  {number}  [decimalPlaces=2] of decimal places required
 * @return {number | string}  number with fixed decimal places or original value if invalid type
 */
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

/**
 * Formats currency to comma seperated format, with required decimal places
 * It internally checks if the value is valid number
 *
 * Used for rendering purpose
 *
 * @param  {string | number} value  value to convert
 * @param  {number}  [decimalPlaces=2] of decimal places required
 * @return {number | string}  currency with comma seperated or original value if invalid type
 */
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
