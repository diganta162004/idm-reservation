import { LOADING_STATUS } from '../statics/enums';

declare const USE_MOCK_DATA: string;

// check if environment is mocked
export const isMocked: boolean = USE_MOCK_DATA.toString() === 'true' || false;

/**
 * Universal check for null, empty objects, arrays and values
 *
 * Used in util function and render checks
 *
 * @param  {any} value  value to check
 * @return {boolean} true for any non-null or empty type values, else false
 */
export const isNullOrEmpty = (value: any) => {
  // if type is number, then its never null
  if (typeof value === 'number' && value === 0) {
    return false;
  }
  // if type is boolean, then its never null
  if (typeof value === 'boolean' && value === false) {
    return false;
  }
  // if for null and undefined value
  if (typeof value !== 'undefined' && value) {
    // if object or array, check if it has any keys
    if (Object.keys(value).length !== 0) {
      return false;
    }
    if (
      typeof value === 'number'
			|| typeof value === 'string' // empty string case is already handled earlier
			|| typeof value === 'boolean'
			|| typeof value.getMonth === 'function' // for date object
    ) {
      return false;
    }
  }
  return true;
};

/**
 * Check if any of the params is in LOADING_STATUS.LOADING state
 *
 * Used in rendering and hooks before making API call
 *
 * @param {...*} args  n number of LOADING_STATUS params
 * @return {boolean} true if any one of the arguments is LOADING_STATUS.LOADING, else false
 */
export const isLoading = (...args: LOADING_STATUS[]): boolean => args.some((status: LOADING_STATUS) => status === LOADING_STATUS.LOADING);

/**
 * Check if any of the params is in LOADING_STATUS.NOT_YET_STARTED state
 *
 * Used in rendering and hooks before making API call
 *
 * @param {...*} args  n number of LOADING_STATUS params
 * @return {boolean} true if any one of the arguments is LOADING_STATUS.NOT_YET_STARTED, else false
 */
export const isNotYetStarted = (...args: LOADING_STATUS[]): boolean => args.some((status: LOADING_STATUS) => status === LOADING_STATUS.NOT_YET_STARTED);

/**
 * Check if any of the params is in LOADING_STATUS.COMPLETED state
 *
 * Used in rendering and hooks before making API call
 *
 * @param {...*} args  n number of LOADING_STATUS params
 * @return {boolean} true if any one of the arguments is LOADING_STATUS.COMPLETED, else false
 */
export const isCompleted = (...args: LOADING_STATUS[]) => args.some((status: LOADING_STATUS) => status === LOADING_STATUS.COMPLETED);

/**
 * Check if any of the params is in LOADING_STATUS.FAILED state
 *
 * Used in rendering and hooks before making API call
 *
 * @param {...*} args  n number of LOADING_STATUS params
 * @return {boolean} true if any one of the arguments is LOADING_STATUS.FAILED, else false
 */
export const isFailed = (...args: LOADING_STATUS[]) => args.some((status: LOADING_STATUS) => status === LOADING_STATUS.FAILED);
