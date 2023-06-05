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

  const [yearValue, setYearValue] = useState<string>('');
  const [incomeValue, setIncomeValue] = useState<string>('');

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

  const onCalculateLocal = useCallback(
    () => {
      onCalculateClick(
        incomeValue, yearValue,
      );
    }, [incomeValue, yearValue],
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
        value={yearValue}
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
        onChange={onIncomeValueChange}
        value={incomeValue}
      />
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
