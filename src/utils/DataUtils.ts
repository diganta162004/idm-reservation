import {
  BracketsType,
  CalculatedTaxBreakdownType, CalculatedTaxType, TaxBracketsType,
} from '../types/taxTypes';
import { isNullOrEmpty } from './CommonUtils';

export const parseTaxBracketsApiData = (apiData: any): TaxBracketsType => {
  try {
    if (!isNullOrEmpty(apiData?.tax_brackets)) {
      return apiData.tax_brackets.map((bracketData: any) => ({
        min: bracketData.min >= 0 ? bracketData.min : 0,
        max: bracketData.max >= 0 ? bracketData.max : Infinity,
        rate: bracketData.rate >= 0 ? bracketData.rate : 0,
      }));
    }
  } catch (e) {
    return [];
  }
  return [];
};

export const calculateTaxForBracket = (
  bracket: BracketsType, totalIncome: number,
): number => {
  const bracketIncome = Math.min(
    totalIncome - bracket.min > 0 ? totalIncome - bracket.min : 0, bracket.max - bracket.min,
  );
  return bracketIncome * bracket.rate;
};

export const calculateTaxBreakdownForYear = (
  bracketData: TaxBracketsType, income: number,
): CalculatedTaxType => {
  let totalAmount = 0;
  const breakdown: CalculatedTaxBreakdownType[] = bracketData.map((currentBracketData) => {
    const taxForBracket = calculateTaxForBracket(
      currentBracketData, income,
    );
    totalAmount += taxForBracket;
    return ({
      bracket: currentBracketData,
      amount: taxForBracket,
    });
  });
  return ({
    breakdown,
    total: totalAmount,
  });
};