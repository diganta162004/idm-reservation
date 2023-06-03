import { LOADING_STATUS } from '../statics/enums';

declare const USE_MOCK_DATA: string;

export const isMocked: boolean = USE_MOCK_DATA.toString() === 'true' || false;

export const isNullOrEmpty = (value: any) => {
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
