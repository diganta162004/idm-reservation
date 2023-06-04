import React, { useCallback, useState } from 'react';
import {
  Button,
  Card,
  Typography,
  Input,
  Select,
  Option,
} from '@mui/joy';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { DEFAULT_TAX_CALCULATED_VALUE, useTaxData } from '../../hooks/useTaxData';
import { LOADING_STATUS } from '../../statics/enums';
import { isLoading } from '../../utils/CommonUtils';
import { CalculatedTaxType } from '../../types/taxTypes';
import { HOMEPAGE_STATICS } from './HomepageStatics';

import './home-page.scss';

const styles = {
  container: 'pgtc__home-page__container',
  card: 'pgtc__home-page__card',
  cardContent: 'pgtc__home-page__card-content',
  header: {
    container: 'pgtc__home-page__header-container',
    titleText: 'pgtc__home-page__header-title-text',
  },
  inputView: {
    container: 'pgtc__home-page__input-view-container',
  },
  calculatedView: {
    container: 'pgtc__home-page__calculated-view-container',
    totalTaxText: 'pgtc__home-page__calculated-view-total-tax-text',
  },
};

const HomePage = () => {
  const { calculateTax } = useTaxData();

  const [yearValue, setYearValue] = useState<string>('');
  const [incomeValue, setIncomeValue] = useState<string>('');
  const [loadingStatus, setLoadingStatus] = useState<LOADING_STATUS>(LOADING_STATUS.NOT_YET_STARTED);
  const [calculatedTaxData, setCalculatedTaxData] = useState<CalculatedTaxType>(DEFAULT_TAX_CALCULATED_VALUE);

  const onYearChange = useCallback(
    (
      event: React.SyntheticEvent | null,
      newValue: string | null,
    ) => {
      setYearValue(newValue!);
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

  const getHeaderView = () => (
    <div className={styles.header.container}>
      <Typography
        level="h1"
        className={styles.header.titleText}
      >
        {HOMEPAGE_STATICS.TITLE}
      </Typography>
    </div>
  );

  const getInputView = () => (
    <div className={styles.inputView.container}>
      <Select
        size="lg"
        placeholder={HOMEPAGE_STATICS.YEAR_SELECT.placeholder}
        defaultValue={HOMEPAGE_STATICS.YEAR_SELECT.defaultValue}
        onChange={onYearChange}
      >
        {HOMEPAGE_STATICS.YEAR_SELECT.options.map((item) => (
          <Option
            key={item.id}
            value={item.id}
          >
            {item.name}
          </Option>
        ))}
      </Select>
      <Input
        size="lg"
        placeholder={HOMEPAGE_STATICS.INPUT_INCOME.placeholder}
        endDecorator={
          <Typography>{HOMEPAGE_STATICS.INPUT_INCOME.endDecorator}</Typography>
        }
        onChange={onIncomeValueChange}
        value={incomeValue}
      />
      <Button
        size="lg"
        loading={isLoading(loadingStatus)}
        onClick={onCalculateClick}
        endDecorator={<KeyboardArrowRight />}
      >
        {HOMEPAGE_STATICS.CALCULATE_BUTTON.label}
      </Button>
    </div>
  );

  const getCalculatedView = () => (
    <div className={styles.calculatedView.container}>
      <Typography level="h2">{calculatedTaxData.total}</Typography>
    </div>
  );

  return (
    <div className={styles.container}>
      <Card
        className={styles.card}
      >
        {getHeaderView()}
        <div className={styles.cardContent}>
          {getInputView()}
          {getCalculatedView()}
        </div>
      </Card>
    </div>
  );
};

export { HomePage };
