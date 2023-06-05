import React, {
  useCallback,
  useState,
} from 'react';
import {
  Card,
  Typography,
} from '@mui/joy';

import { DEFAULT_TAX_CALCULATED_VALUE, useTaxData } from '../../hooks/useTaxData';
import { LOADING_STATUS } from '../../statics/enums';
import { isLoading } from '../../utils/CommonUtils';
import { CalculatedTaxType } from '../../types/taxTypes';
import { HOMEPAGE_STATICS } from './HomepageStatics';
import { InputView } from './InputView';
import { CalculatedView } from './CalculatedView';

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
  },
};

const HomePage = () => {
  const { calculateTax } = useTaxData();

  const [loadingStatus, setLoadingStatus] = useState<LOADING_STATUS>(LOADING_STATUS.NOT_YET_STARTED);
  const [calculatedTaxData, setCalculatedTaxData] = useState<CalculatedTaxType>(DEFAULT_TAX_CALCULATED_VALUE);

  // gets data from hook and stores in local storage
  // locally keeps loading status
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
        // setCalculatedTaxData(DEFAULT_TAX_CALCULATED_VALUE);
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
      >
        <div className={styles.cardContent}>
          {getInputView()}
          {getCalculatedView()}
        </div>
      </Card>
    </div>
  );
};

export { HomePage };
