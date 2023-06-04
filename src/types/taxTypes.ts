export type BracketsType = {
	min: number,
	max: number,
	rate: number,
}

export type TaxBracketsType = BracketsType[];

export type CalculatedTaxBreakdownType = {
	bracket: BracketsType,
	amount: number,
}

export type CalculatedTaxType = {
  breakdown?: CalculatedTaxBreakdownType[],
  total: number,
	income: number,
};
