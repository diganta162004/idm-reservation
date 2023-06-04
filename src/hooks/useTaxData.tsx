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
import { useLogger } from '../utils/UseLogger';

type Props = {
    children: React.ReactNode,
}

const DEFAULT_TAX_CALCULATED_VALUE = {
  breakdown: [],
  total: 0,
  income: 0,
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
  const { info, error } = useLogger();

  const [taxBracketsData, setTaxBracketsData] = useState<Record<string, TaxBracketsType>>({});

  const calculateTax = useCallback(
    (
      yearValue: string, incomeValue: string,
    ): Promise<CalculatedTaxType> => new Promise((
      resolve, reject,
    ) => {
      try {
        if (taxBracketsData[yearValue]) {
          const calculatedTaxBreakdown: CalculatedTaxType = calculateTaxBreakdownForYear(
            taxBracketsData[yearValue], Number(incomeValue),
          );
          resolve(calculatedTaxBreakdown);
          info(
            'useTaxData calculateTax', `Found ${yearValue} brackets in cache, income ${incomeValue}, amount ${calculatedTaxBreakdown.total}.`,
          );

          return;
        }
        apiGet(
          API_URLS.GET_TAX_DATA_FOR_YEAR, {
            year: yearValue,
          },
        )
          .then((responseData: any) => {
            if (responseData.data.tax_brackets) {
              const parsedTaxBracketData: TaxBracketsType = parseTaxBracketsApiData(responseData.data);
              setTaxBracketsData((prevState) => ({
                ...prevState,
                [yearValue]: parsedTaxBracketData,
              }));
              const calculatedTaxBreakdown: CalculatedTaxType = calculateTaxBreakdownForYear(
                parsedTaxBracketData, Number(incomeValue),
              );
              resolve(calculatedTaxBreakdown);
              info(
                'useTaxData calculateTax', `Received ${yearValue} brackets from api, income ${incomeValue}, amount ${calculatedTaxBreakdown.total}.`,
              );
            } else {
              error(
                'useTaxData calculateTax', `Error for  ${yearValue} brackets from api, income ${incomeValue}`, new Error('Missing API keys'),
              );
              reject(new Error('Calculation Error'));
            }
          }).catch((e) => {
            reject(new Error(e));
            error(
              'useTaxData calculateTax', `Error for  ${yearValue} brackets from api, income ${incomeValue}`, e,
            );
          });
      } catch (e: any) {
        reject(new Error('Calculation Error'));
        error(
          'useTaxData calculateTax', `Error for  ${yearValue} brackets from api, income ${incomeValue}`, e,
        );
      }
    }), [apiGet, taxBracketsData, info, error],
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
