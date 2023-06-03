import React, { useCallback, useState } from 'react';
import { Button } from '@mui/joy';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { DEFAULT_TAX_CALCULATED_VALUE, useTaxData } from '../hooks/useTaxData';
import { LOADING_STATUS } from '../statics/enums';
import { isLoading } from '../utils/CommonUtils';
import { CalculatedTaxType } from '../types/taxTypes';

import './home-page.scss';

const styles = {
  container: 'pgtc__home-page__container',
};

const HomePage = () => {
  const { calculateTax } = useTaxData();

  const [yearValue, setYearValue] = useState<string>('');
  const [incomeValue, setIncomeValue] = useState<string>('');
  const [loadingStatus, setLoadingStatus] = useState<LOADING_STATUS>(LOADING_STATUS.NOT_YET_STARTED);
  const [calculatedTaxData, setCalculatedTaxData] = useState<CalculatedTaxType>(DEFAULT_TAX_CALCULATED_VALUE);

  const onYearChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setYearValue(e.target.value);
    }, [],
  );

  const onIncomeValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIncomeValue(e.target.value);
    }, [],
  );

  const onCalculateClick = useCallback(
    () => {
      if (isLoading(loadingStatus)) {
        return;
      }
      setLoadingStatus(LOADING_STATUS.LOADING);
      calculateTax(
        yearValue, incomeValue,
      ).then((res: CalculatedTaxType) => {
        setCalculatedTaxData(res);
        setLoadingStatus(LOADING_STATUS.COMPLETED);
      }).catch(() => {
        setCalculatedTaxData(DEFAULT_TAX_CALCULATED_VALUE);
        setLoadingStatus(LOADING_STATUS.FAILED);
      });
    }, [calculateTax, yearValue, incomeValue],
  );

  return (
    <div className={styles.container}>
      <input
        onChange={onYearChange}
        value={yearValue}
      />
      <input
        onChange={onIncomeValueChange}
        value={incomeValue}
      />
      <Button
        size="lg"
        loading={isLoading(loadingStatus)}
        onClick={onCalculateClick}
        endDecorator={<KeyboardArrowRight />}
      >
        Calculate
      </Button>
      <div>{loadingStatus}</div>
      <div>{JSON.stringify(calculatedTaxData)}</div>
    </div>
  );
};

export { HomePage };
