import { LOADING_STATUS } from '../statics/enums';

declare const USE_MOCK_DATA: string;

export const isMocked: boolean = USE_MOCK_DATA.toString() === 'true' || false;

export const isANumber = (value: string | number): boolean => {
  if (!value && value !== 0) {
    return false;
  } if (value === Infinity || value === -Infinity) {
    return true;
  }
  // return !Number.isNaN(parseFloat(value.toString()));
  return /^(?!-0?(\.0+)?$)-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/.test(value.toString());
};

export const isNullOrEmpty = (value: any) => {
  if (typeof value === 'number' && value === 0) {
    return false;
  }
  if (typeof value === 'boolean' && value === false) {
    return false;
  }
  if (typeof value !== 'undefined' && value) {
    if (Object.keys(value).length !== 0) {
      return false;
    }
    if (
      typeof value === 'number'
			|| typeof value === 'string'
			|| typeof value === 'boolean'
			|| typeof value.getMonth === 'function'
    ) {
      return false;
    }
  }
  return true;
};

export const isLoading = (...args: LOADING_STATUS[]) => args.some((status: LOADING_STATUS) => status === LOADING_STATUS.LOADING);

export const isNotYetStarted = (...args: LOADING_STATUS[]) => args.some((status: LOADING_STATUS) => status === LOADING_STATUS.NOT_YET_STARTED);

export const isCompleted = (...args: LOADING_STATUS[]) => args.some((status: LOADING_STATUS) => status === LOADING_STATUS.COMPLETED);

export const isFailed = (...args: LOADING_STATUS[]) => args.some((status: LOADING_STATUS) => status === LOADING_STATUS.FAILED);
