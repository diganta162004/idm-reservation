import React, {
  useCallback,
  useState,
} from 'react';
import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from '@mui/joy';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { HOMEPAGE_STATICS } from './HomepageStatics';
import { isLoading } from '../../utils/CommonUtils';
import { LOADING_STATUS } from '../../statics/enums';
import { InputValueType } from '../../types/CommonTypes';

import './input-view.scss';

type Props = {
  loadingStatus: LOADING_STATUS,
  onCalculateClick: (incomeValue: string, yearValue: string) => void,
}

const styles = {
  container: 'pgtc__input-view__container',
  form: 'pgtc__input-view__form',
  yearSelect: {
    container: 'pgtc__input-view__year-select-container',
    label: 'pgtc__input-view__year-select-label',
    input: 'pgtc__input-view__year-select-input',
  },
  incomeInput: {
    container: 'pgtc__input-view__income-input-container',
    label: 'pgtc__input-view__income-input-label',
    input: 'pgtc__input-view__income-input-input',
  },
  actionView: {
    container: 'pgtc__input-view__action-view-container',
    button: 'pgtc__input-view__action-view-button',
  },
};

const InputView = (props: Props) => {
  const { loadingStatus, onCalculateClick } = props;

  const [yearValue, setYearValue] = useState<InputValueType>({
    isTouched: false,
    value: '',
    error: '',
  });
  const [incomeValue, setIncomeValue] = useState<InputValueType>({
    isTouched: false,
    value: '',
    error: '',
  });

  const validateValues = useCallback(
    () => {
      setYearValue((prevState) => ({
        ...prevState,
        error: prevState.value ? '' : HOMEPAGE_STATICS.YEAR_SELECT.ERRORS.required,
      }));
      setIncomeValue((prevState) => ({
        ...prevState,
        error: prevState.value ? '' : HOMEPAGE_STATICS.INPUT_INCOME.ERRORS.required,
      }));
    }, [],
  );

  const onYearChange = useCallback(
    (
      event: React.SyntheticEvent | null,
      newValue: string | null,
    ) => {
      setYearValue({
        value: newValue || '',
        isTouched: true,
        error: '',
      });
    }, [],
  );

  const onIncomeValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIncomeValue({
        value: e.target.value,
        isTouched: true,
        error: '',
      });
    }, [],
  );

  const onCalculateLocal = useCallback(
    () => {
      validateValues();
      if (incomeValue.value && yearValue.value) {
        onCalculateClick(
          incomeValue.value, yearValue.value,
        );
      }
    }, [incomeValue, yearValue, validateValues],
  );

  const getYearSelect = () => (
    <div className={styles.yearSelect.container}>
      <Typography
        level="body1"
        className={styles.yearSelect.label}
      >
        {HOMEPAGE_STATICS.YEAR_SELECT.label}
      </Typography>
      <Select
        size="lg"
        className={styles.yearSelect.input}
        placeholder={HOMEPAGE_STATICS.YEAR_SELECT.placeholder}
        defaultValue={HOMEPAGE_STATICS.YEAR_SELECT.defaultValue}
        onChange={onYearChange}
        value={yearValue.value}
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
      {yearValue.error && (
      <Typography
        fontSize="sm"
        color="danger"
      >
        {yearValue.error}
      </Typography>
      )}
    </div>
  );

  const getIncomeInput = () => (
    <div className={styles.incomeInput.container}>
      <Typography
        level="body1"
        className={styles.incomeInput.label}
      >
        {HOMEPAGE_STATICS.INPUT_INCOME.label}
      </Typography>
      <Input
        size="lg"
        className={styles.incomeInput.input}
        placeholder={HOMEPAGE_STATICS.INPUT_INCOME.placeholder}
        endDecorator={
          <Typography>{HOMEPAGE_STATICS.INPUT_INCOME.endDecorator}</Typography>
        }
        type="number"
        onChange={onIncomeValueChange}
        value={incomeValue.value}
      />
      {incomeValue.error && (
      <Typography
        fontSize="sm"
        color="danger"
      >
        {incomeValue.error}
      </Typography>
      )}
    </div>
  );

  const getActionView = () => (
    <div className={styles.actionView.container}>
      <Button
        size="lg"
        className={styles.actionView.button}
        loading={isLoading(loadingStatus)}
        onClick={onCalculateLocal}
        endDecorator={<KeyboardArrowRight />}
      >
        {HOMEPAGE_STATICS.CALCULATE_BUTTON.label}
      </Button>
    </div>
  );

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={(e) => e.preventDefault()}
      >
        {getYearSelect()}
        {getIncomeInput()}
        {getActionView()}
      </form>
    </div>
  );
};

export { InputView };
