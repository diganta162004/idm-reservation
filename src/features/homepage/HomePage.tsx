import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Button, Card, Input, Option, Select, Table, Typography,
} from '@mui/joy';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import stringTemplate from 'string-template';
import { DEFAULT_TAX_CALCULATED_VALUE, useTaxData } from '../../hooks/useTaxData';
import { LOADING_STATUS } from '../../statics/enums';
import { isLoading } from '../../utils/CommonUtils';
import { CalculatedTaxBreakdownType, CalculatedTaxType } from '../../types/taxTypes';
import { HOMEPAGE_STATICS } from './HomepageStatics';
import { calculateNetPercentage } from '../../utils/DataUtils';

import './home-page.scss';
import { formatCurrency, toFixedDecimalPlaces } from '../../utils/NumberUtils';

const styles = {
  container: 'pgtc__home-page__container',
  card: 'pgtc__home-page__card',
  header: {
    container: 'pgtc__home-page__header-container',
    titleText: 'pgtc__home-page__header-title-text',
  },
  inputView: {
    container: 'pgtc__home-page__input-view-container',
    form: 'pgtc__home-page__input-view-form',
    yearSelect: {
      container: 'pgtc__home-page__input-view-year-select-container',
    },
    incomeInput: {
      container: 'pgtc__home-page__input-view-income-input-container',
    },
  },
  calculatedView: {
    container: 'pgtc__home-page__calculated-view-container',
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

  const [yearValue, setYearValue] = useState<string>('');
  const [incomeValue, setIncomeValue] = useState<string>('');
  const [loadingStatus, setLoadingStatus] = useState<LOADING_STATUS>(LOADING_STATUS.NOT_YET_STARTED);
  const [calculatedTaxData, setCalculatedTaxData] = useState<CalculatedTaxType>(DEFAULT_TAX_CALCULATED_VALUE);

  useEffect(
    () => {
      calculateTax(
        '2022', '300000',
      ).then((d) => {
        setCalculatedTaxData(d);
        setLoadingStatus(LOADING_STATUS.COMPLETED);
      });
    }, [],
  );

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

  const netTaxPercentage: number = useMemo(
    () => calculateNetPercentage(
      calculatedTaxData.income, calculatedTaxData.total,
    ), [calculatedTaxData, incomeValue],
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

  const getYearSelect = () => (
    <div className={styles.inputView.yearSelect.container}>
      <Typography
        level="body1"
        className={styles.calculatedView.primary.amountText}
      >
        {HOMEPAGE_STATICS.YEAR_SELECT.label}
      </Typography>
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
    </div>
  );

  const getIncomeInput = () => (
    <div className={styles.inputView.incomeInput.container}>
      <Typography
        level="body1"
        className={styles.calculatedView.primary.amountText}
      >
        {HOMEPAGE_STATICS.INPUT_INCOME.label}
      </Typography>
      <Input
        size="lg"
        placeholder={HOMEPAGE_STATICS.INPUT_INCOME.placeholder}
        endDecorator={
          <Typography>{HOMEPAGE_STATICS.INPUT_INCOME.endDecorator}</Typography>
        }
        onChange={onIncomeValueChange}
        value={incomeValue}
      />
    </div>
  );

  const getFormView = () => (
    <form
      className={styles.inputView.form}
      onSubmit={(e) => e.preventDefault()}
    >
      {getYearSelect()}
      {getIncomeInput()}
      <Button
        size="lg"
        loading={isLoading(loadingStatus)}
        onClick={onCalculateClick}
        endDecorator={<KeyboardArrowRight />}
      >
        {HOMEPAGE_STATICS.CALCULATE_BUTTON.label}
      </Button>
    </form>
  );

  const getInputView = () => (
    <div className={styles.inputView.container}>
      {getHeaderView()}
      {getFormView()}
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
      <tr className={styles.calculatedView.table.row} key={tableData.bracket.min}>
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

  const getCalculatedView = () => (
    <div className={styles.calculatedView.container}>
      {getPrimaryCalculatedValue()}
      {getTaxBreakdownTable()}
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
