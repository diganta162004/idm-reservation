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
    loader: 'pgtc__home-page__calculated-view-loader',
    defaultText: 'pgtc__home-page__calculated-view-default-text',
    primary: {
      container: 'pgtc__home-page__calculated-view-primary-container',
      amountText: 'pgtc__home-page__calculated-view-primary-amount-text',
      amountLabel: 'pgtc__home-page__calculated-view-primary-amount-label',
      percentText: 'pgtc__home-page__calculated-view-primary-percent-text',
      percentLabel: 'pgtc__home-page__calculated-view-primary-percent-label',
    },
    table: {
      container: 'pgtc__home-page__calculated-view-table-container',
      row: 'pgtc__home-page__calculated-view-table-row',
      rowData: 'pgtc__home-page__calculated-view-table-row-data',
    },
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

  const netTaxPercentage: number = useMemo(
    () => calculateNetPercentage(
      calculatedTaxData.income, calculatedTaxData.total,
    ), [calculatedTaxData],
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

  const getPrimaryCalculatedValue = () => (
    <div className={styles.calculatedView.primary.container}>
      <Typography
        level="h2"
        className={styles.calculatedView.primary.amountText}
      >
        {stringTemplate(
          HOMEPAGE_STATICS.CALCULATED.TOTAL_TAX_TEMPLATE, {
            value: formatCurrency(calculatedTaxData.total),
          },
        )}
      </Typography>
      <Typography
        level="body2"
        className={styles.calculatedView.primary.amountLabel}
      >
        {HOMEPAGE_STATICS.CALCULATED.TOTAL_TAX_LABEL}
      </Typography>
      <Typography
        level="h4"
        className={styles.calculatedView.primary.percentText}
      >
        {stringTemplate(
          HOMEPAGE_STATICS.CALCULATED.TAX_PERCENTAGE_TEMPLATE, {
            value: toFixedDecimalPlaces(
              netTaxPercentage, 2,
            ),
          },
        )}
      </Typography>
      <Typography
        level="body2"
        className={styles.calculatedView.primary.percentLabel}
      >
        {HOMEPAGE_STATICS.CALCULATED.TAX_PERCENTAGE_LABEL}
      </Typography>
    </div>
  );

  const getTaxBreakdownRow = (tableData: CalculatedTaxBreakdownType) => {
    if (tableData.amount <= 0) {
      return null;
    }
    return (
      <tr
        className={styles.calculatedView.table.row}
        key={tableData.bracket.min}
      >
        <td className={styles.calculatedView.table.rowData}>{`${tableData.bracket.min} - ${tableData.bracket.max}`}</td>
        <td className={styles.calculatedView.table.rowData}>
          {stringTemplate(
            HOMEPAGE_STATICS.CALCULATED.BRACKET_RATE_TEMPLATE, {
              value: tableData.bracket.rate,
            },
          )}
        </td>
        <td className={styles.calculatedView.table.rowData}>
          {stringTemplate(
            HOMEPAGE_STATICS.CALCULATED.BRACKET_TAX_TEMPLATE, {
              value: formatCurrency(tableData.amount),
            },
          )}
        </td>
      </tr>
    );
  };

  const getTaxBreakdownTable = () => (
    <Table className={styles.calculatedView.table.container}>
      <tbody>
        {calculatedTaxData.breakdown?.map(getTaxBreakdownRow)}
      </tbody>
    </Table>
  );

  const getDefaultCalculatedView = () => (
    <Typography
      className={styles.calculatedView.defaultText}
      textAlign="center"
    >
      {HOMEPAGE_STATICS.CALCULATED.DEFAULT_TEXT}
    </Typography>
  );

  const getFailedView = () => (
    <Typography
      className={styles.calculatedView.defaultText}
      textAlign="center"
      textColor="danger.500"
    >
      {HOMEPAGE_STATICS.CALCULATED.FAILED_TEXT}
    </Typography>
  );

  const getLoadingView = () => (
    <CircularProgress variant="plain" />
  );

  const getCalculatedResult = () => (
    <>
      {getPrimaryCalculatedValue()}
      {getTaxBreakdownTable()}
    </>
  );

  const getCalculatedView = () => (
    <div className={styles.calculatedView.container}>
      {isLoading(loadingStatus) && getLoadingView()}
      {isFailed(loadingStatus) && getFailedView()}
      {isNotYetStarted(loadingStatus) && getDefaultCalculatedView()}
      {isCompleted(loadingStatus) && calculatedTaxData.income > 0 && getCalculatedResult()}
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
