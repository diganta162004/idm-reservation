import {
  BracketsType,
  CalculatedTaxBreakdownType, CalculatedTaxType, TaxBracketsType,
} from '../types/taxTypes';
import { isNullOrEmpty } from './CommonUtils';
import { isANumber } from './NumberUtils';

// parse API data before storing in local state, sets type
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

// calculates tax for individual bracket
export const calculateTaxForBracket = (
  bracket: BracketsType, totalIncome: number,
): number => {
  try {
    if (!isANumber(bracket.min)
      || !isANumber(bracket.max)
      || !isANumber(bracket.rate)
      || !isANumber(totalIncome)) {
      return 0;
    }
    const bracketIncome = Math.min(
      totalIncome - bracket.min > 0 ? totalIncome - bracket.min : 0, bracket.max - bracket.min,
    );
    return bracketIncome * bracket.rate;
  } catch (e) {
    return 0;
  }
};

// gets individual breakdown of taxes for brackets
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
    income,
  });
};

// calculates overall percentage based on entire income
export const calculateNetPercentage = (
  totalIncome: number|string, taxAmount: number|string,
): number => {
  if (!totalIncome || !taxAmount || totalIncome === 0 || taxAmount === 0) {
    return 0;
  }
  if (!isANumber(totalIncome) || !isANumber(taxAmount)) {
    return 0;
  }
  return (Number(taxAmount) / Number(totalIncome)) * 100;
};
