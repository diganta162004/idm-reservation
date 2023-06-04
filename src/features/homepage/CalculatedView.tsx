import React, { useMemo } from 'react';
import {
  CircularProgress, Divider,
  Table,
  Typography,
} from '@mui/joy';
import stringTemplate from 'string-template';

import {
  isFailed,
  isLoading,
  isNotYetStarted,
} from '../../utils/CommonUtils';
import { HOMEPAGE_STATICS } from './HomepageStatics';
import { formatCurrency, toFixedDecimalPlaces } from '../../utils/NumberUtils';
import { CalculatedTaxBreakdownType, CalculatedTaxType } from '../../types/taxTypes';
import { LOADING_STATUS } from '../../statics/enums';
import { calculateNetPercentage } from '../../utils/DataUtils';

import './calculated-view.scss';

type Props = {
	calculatedTaxData: CalculatedTaxType,
	loadingStatus: LOADING_STATUS
}
const styles = {
  container: 'pgtc__calculated-view__container',
  loader: 'pgtc__calculated-view__loader',
  defaultText: 'pgtc__calculated-view__default-text',
  failedText: 'pgtc__calculated-view__failed-text',
  primary: {
    container: 'pgtc__calculated-view__primary-container',
    amountText: 'pgtc__calculated-view__primary-amount-text',
    amountLabel: 'pgtc__calculated-view__primary-amount-label',
    percentText: 'pgtc__calculated-view__primary-percent-text',
    percentLabel: 'pgtc__calculated-view__primary-percent-label',
  },
  table: {
    container: 'pgtc__calculated-view__table-container',
    row: 'pgtc__calculated-view__table-row',
    rowData: 'pgtc__calculated-view__table-row-data',
  },

};
const CalculatedView = (props: Props) => {
  const { calculatedTaxData, loadingStatus } = props;

  const netTaxPercentage: number = useMemo(
    () => calculateNetPercentage(
      calculatedTaxData.income, calculatedTaxData.total,
    ), [calculatedTaxData],
  );

  const getPrimaryCalculatedValue = () => (
    <div className={styles.primary.container}>
      <Typography
        level="h2"
        className={styles.primary.amountText}
        startDecorator={(
          <Typography
            fontSize="lg"
            textColor="text.secondary"
          >
            $
          </Typography>
        )}
        sx={{
          alignItems: 'flex-start',
        }}
      >
        {stringTemplate(
				  HOMEPAGE_STATICS.CALCULATED.TOTAL_TAX_TEMPLATE, {
				    value: formatCurrency(calculatedTaxData.total),
				  },
        )}
      </Typography>
      <Typography
        level="body2"
        className={styles.primary.amountLabel}
      >
        {HOMEPAGE_STATICS.CALCULATED.TOTAL_TAX_LABEL}
      </Typography>
      <Typography
        level="h4"
        className={styles.primary.percentText}
        endDecorator={(
          <Typography
            fontSize="lg"
            textColor="text.secondary"
          >
            %
          </Typography>
        )}
        sx={{
          alignItems: 'flex-end',
        }}
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
        className={styles.primary.percentLabel}
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
        className={styles.table.row}
        key={tableData.bracket.min}
      >
        <td className={styles.table.rowData}>
          <Typography>
            {`${tableData.bracket.min} - ${tableData.bracket.max}`}
          </Typography>
        </td>
        <td className={styles.table.rowData}>
          <Typography>
            {stringTemplate(
              HOMEPAGE_STATICS.CALCULATED.BRACKET_RATE_TEMPLATE, {
                value: tableData.bracket.rate,
              },
            )}
          </Typography>
        </td>
        <td className={styles.table.rowData}>
          <Typography
            variant="solid"
            level="body1"
          >
            {stringTemplate(
              HOMEPAGE_STATICS.CALCULATED.BRACKET_TAX_TEMPLATE, {
                value: formatCurrency(tableData.amount),
              },
            )}
          </Typography>
        </td>
      </tr>
    );
  };

  const getTaxBreakdownTable = () => (
    <Table className={styles.table.container}>
      <tbody>
        {calculatedTaxData.breakdown?.map(getTaxBreakdownRow)}
      </tbody>
    </Table>
  );

  if (isLoading(loadingStatus)) {
    return (
      <CircularProgress
        variant="plain"
        className={styles.loader}
      />
    );
  }

  if (isFailed(loadingStatus)) {
    return (
      <Typography
        className={styles.failedText}
        textAlign="center"
        textColor="danger.500"
      >
        {HOMEPAGE_STATICS.CALCULATED.FAILED_TEXT}
      </Typography>
    );
  }

  if (isNotYetStarted(loadingStatus)) {
    return (
      <Typography
        className={styles.defaultText}
        textAlign="center"
      >
        {HOMEPAGE_STATICS.CALCULATED.DEFAULT_TEXT}
      </Typography>
    );
  }

  return (
    <div className={styles.container}>
      {getPrimaryCalculatedValue()}
      <Divider />
      {getTaxBreakdownTable()}
    </div>
  );
};
export { CalculatedView };
