import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  Card,
  CircularProgress,
  Table,
  Typography,
} from '@mui/joy';

import stringTemplate from 'string-template';
import { DEFAULT_TAX_CALCULATED_VALUE, useTaxData } from '../../hooks/useTaxData';
import { LOADING_STATUS } from '../../statics/enums';
import {
  isCompleted, isFailed, isLoading, isNotYetStarted,
} from '../../utils/CommonUtils';
import { CalculatedTaxBreakdownType, CalculatedTaxType } from '../../types/taxTypes';
import { HOMEPAGE_STATICS } from './HomepageStatics';
import { calculateNetPercentage } from '../../utils/DataUtils';
import { formatCurrency, toFixedDecimalPlaces } from '../../utils/NumberUtils';
import { InputView } from './InputView';

import './home-page.scss';
import { CalculatedView } from './CalculatedView';

const styles = {
  container: 'pgtc__home-page__container',
  card: 'pgtc__home-page__card',
  header: {
    container: 'pgtc__home-page__header-container',
    titleText: 'pgtc__home-page__header-title-text',
  },
  inputView: {
    container: 'pgtc__home-page__input-view-container',
  },
  calculatedView: {
    container: 'pgtc__home-page__calculated-view-container',
  },
};

const HomePage = () => {
  const { calculateTax } = useTaxData();

  const [loadingStatus, setLoadingStatus] = useState<LOADING_STATUS>(LOADING_STATUS.NOT_YET_STARTED);
  const [calculatedTaxData, setCalculatedTaxData] = useState<CalculatedTaxType>(DEFAULT_TAX_CALCULATED_VALUE);

  const onCalculateClick = useCallback(
    (
      incomeValue: string, yearValue: string,
    ) => {
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
    }, [calculateTax],
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
      {getHeaderView()}
      <InputView
        loadingStatus={loadingStatus}
        onCalculateClick={onCalculateClick}
      />
    </div>
  );

  const getCalculatedView = () => (
    <div className={styles.calculatedView.container}>
      <CalculatedView
        calculatedTaxData={calculatedTaxData}
        loadingStatus={loadingStatus}
      />
    </div>
  );

  return (
    <div className={styles.container}>
      <Card
        className={styles.card}
        orientation="horizontal"
      >
        {getInputView()}
        {getCalculatedView()}
      </Card>
    </div>
  );
};

export { HomePage };
