import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { CalculatedTaxType, TaxBracketsType } from '../types/taxTypes';
import { useApi } from './useApi';
import { API_URLS } from '../statics/apiUrls';
import { calculateTaxBreakdownForYear, parseTaxBracketsApiData } from '../utils/DataUtils';

type Props = {
    children: React.ReactNode,
}

const DEFAULT_TAX_CALCULATED_VALUE = {
  breakdown: [],
  total: 0,
};

interface UseTaxDataType {
  calculateTax: (year: string, incomeValue: string) => Promise<CalculatedTaxType>
}

const UseTaxDataContext = createContext<UseTaxDataType>({
  calculateTax: () => Promise.resolve(DEFAULT_TAX_CALCULATED_VALUE),
});

const useTaxData = () => useContext(UseTaxDataContext);

const UseTaxDataProvider = ({ children }: Props) => {
  const { apiGet } = useApi();

  const [taxBracketsData, setTaxBracketsData] = useState<Record<string, TaxBracketsType>>({});

  const calculateTax = useCallback(
    (
      year: string, incomeValue: string,
    ): Promise<CalculatedTaxType> => new Promise((
      resolve, reject,
    ) => {
      try {
        if (taxBracketsData[year]) {
          resolve(calculateTaxBreakdownForYear(
            taxBracketsData[year], Number(incomeValue),
          ));
          return;
        }
        apiGet(
          API_URLS.GET_TAX_DATA_FOR_YEAR, {
            year,
          },
        )
          .then((responseData: any) => {
            if (responseData.data.tax_brackets) {
              const parsedTaxBracketData: TaxBracketsType = parseTaxBracketsApiData(responseData.data);
              setTaxBracketsData((prevState) => ({
                ...prevState,
                [year]: parsedTaxBracketData,
              }));
              resolve(calculateTaxBreakdownForYear(
                parsedTaxBracketData, Number(incomeValue),
              ));
            } else {
              reject(new Error('Calculation Error 1'));
            }
          }).catch((e) => {
            console.log(
              'ERROR 2', e,
            );
            reject(new Error('Calculation Error 3'));
          });
      } catch (e) {
        reject(new Error('Calculation Error 4'));
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
  DEFAULT_TAX_CALCULATED_VALUE,
};

export type { Props };
