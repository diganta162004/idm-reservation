import {
  BracketsType,
  CalculatedTaxBreakdownType, CalculatedTaxType, TaxBracketsType,
} from '../types/taxTypes';
import { isNullOrEmpty } from './CommonUtils';
import { isANumber } from './NumberUtils';

/**
 * Parse api data to a fixed type state for storing in state
 *
 * Used in data hook
 *
 * @param {any} apiData the raw tax brackets api data
 * @return {TaxBracketsType} valid TaxBracketsType object with missing keys
 */
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

/**
 * Calculates tax for a given bracket data and income amount
 *
 * Used in other util function
 *
 * @param {BracketsType} bracket bracket data based on what the tax will be calculated
 * @param {number} totalIncome total income on which the tax will be calculated
 * @return {number} tax amount
 */
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

/**
 * Calculates tax for a set of brackets (entire range of income)
 *
 * Used in data util
 *
 * @param {TaxBracketsType} bracketData bracket data based on what the tax will be calculated
 * @param {number} totalIncome total income on which the tax will be calculated
 * @return {CalculatedTaxType} object with total tax and bracket breakdown
 */
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

/**
 * Calculates overall percentage based on entire income
 *
 * Used in render views
 *
 * @param {number|string} totalIncome total income on which the tax will be calculated
 * @param {number|string} taxAmount tax amount already calculated
 * @return {number} net tax percentage
 */
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
