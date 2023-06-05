import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import queryString from 'query-string';
import axios from 'axios';
import stringTemplate from 'string-template';
import { MOCK_DATA } from '../statics/apiUrls';

const MOCK_API_DELAY = 1000;

type Props = {
  children: React.ReactNode,
  isMocked?: boolean,
};

type APIParamType = Record<string, any>;

interface UseApiType {
  apiGet: (
    url: string,
    pathParams?: APIParamType,
    queryParams?: APIParamType,
    body?: APIParamType) => Promise<unknown>
}

const UseApiContext = createContext<UseApiType>({
  apiGet: () => Promise.resolve(null),
});

const api = axios.create({});

const useApi = () => useContext(UseApiContext);

const UseApiProvider = (props: Props) => {
  const {
    children,
    isMocked,
  } = props;

  const mockApiCall = useCallback(
    (
      url: string,
      pathParams?: APIParamType,
      queryParams?: APIParamType,
      body?: APIParamType,
    ) => {
      console.log(
        'MOCKING API CALL', url, pathParams, queryParams, JSON.stringify(body),
      );
      const currentMockData = MOCK_DATA?.[url] || 'No mocked data';
      return new Promise((resolve) => {
        setTimeout(
          () => resolve({
            data: currentMockData,
          }), MOCK_API_DELAY,
        );
      });
    }, [],
  );

  const apiGet = useCallback(
    (
      url: string,
      pathParams: APIParamType = {},
      queryParams: APIParamType = {},
      body: APIParamType = {},
    ) => {
      const combinedPathParams = {
        ...pathParams,
      };
      const combinedQueryParams = {
        ...queryParams,
      };

      if (isMocked) {
        return mockApiCall(
          url, combinedPathParams, combinedQueryParams, body,
        );
      }

      const fullUrl = queryString.stringifyUrl({
        url: stringTemplate(
          url, combinedPathParams,
        ),
        query: combinedQueryParams,
      });

      return api.get(fullUrl);
    }, [isMocked],
  );

  const contextValue = useMemo(
    () => ({
      apiGet,

    }), [
      apiGet,
    ],
  );

  return (
    <UseApiContext.Provider value={contextValue}>
      {children}
    </UseApiContext.Provider>
  );
};

UseApiProvider.defaultProps = {
  isMocked: false,
};

export {
  useApi,
  UseApiProvider,
};

export type {
  Props,
  APIParamType,
};
