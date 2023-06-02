import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { TaxBracketsType } from '../types/taxTypes';
import { useApi } from './useApi';
import { API_URLS } from '../statics/apiUrls';

type Props = {
    children: React.ReactNode,
}
interface UseTaxDataType {
  calculateTax: (year: string, incomeValue: string) => Promise<string>
}

const UseTaxDataContext = createContext<UseTaxDataType>({
  calculateTax: () => Promise.resolve(''),
});

const useTaxData = () => useContext(UseTaxDataContext);

const UseTaxDataProvider = ({ children }: Props) => {
  const { apiGet } = useApi();

  const [taxBracketsData, setTaxBracketsData] = useState<Record<string, TaxBracketsType>>({});

  const calculateTax = useCallback(
    (
      year: string, incomeValue: string,
    ): Promise<string> => new Promise((
      resolve, reject,
    ) => {
      try {
        if (taxBracketsData[year]) {
          resolve(`Calculated ${incomeValue} for year ${year}, ${JSON.stringify(taxBracketsData[year])}`);
          return;
        }
        apiGet(
          API_URLS.GET_TAX_DATA_FOR_YEAR, {
            year,
          },
        )
          .then((responseData: any) => {
            setTaxBracketsData((prevState) => ({
              ...prevState,
              [year]: responseData.data,
            }));
            resolve(`Calculated ${incomeValue} for year ${year}, ${JSON.stringify(responseData.data)}`);
          });
      } catch (e) {
        reject(new Error('Calculation Error'));
      }
    }), [apiGet, taxBracketsData],
  );

  const contextValue = useMemo(
    () => ({
      calculateTax,
    }), [
      calculateTax,
    ],
  );

  return (
    <UseTaxDataContext.Provider value={contextValue}>
      {children}
    </UseTaxDataContext.Provider>
  );
};

export {
  useTaxData,
  UseTaxDataProvider,
};

export type { Props };
