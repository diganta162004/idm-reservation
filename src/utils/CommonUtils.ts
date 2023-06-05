import { LOADING_STATUS } from '../statics/enums';

declare const USE_MOCK_DATA: string;

// check if environment is mocked
export const isMocked: boolean = USE_MOCK_DATA.toString() === 'true' || false;

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

// universal check for null, empty objects, arrays and values
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

// checks if any of the params matches with enum
export const isLoading = (...args: LOADING_STATUS[]) => args.some((status: LOADING_STATUS) => status === LOADING_STATUS.LOADING);

export const isNotYetStarted = (...args: LOADING_STATUS[]) => args.some((status: LOADING_STATUS) => status === LOADING_STATUS.NOT_YET_STARTED);

export const isCompleted = (...args: LOADING_STATUS[]) => args.some((status: LOADING_STATUS) => status === LOADING_STATUS.COMPLETED);

export const isFailed = (...args: LOADING_STATUS[]) => args.some((status: LOADING_STATUS) => status === LOADING_STATUS.FAILED);
