import React, {
  useCallback,
  useState,
} from 'react';

import { useTaxData } from '../hooks/useTaxData';

import './home-page.scss';

const styles = {
  container: 'pgtc__home-page__container',
};

const HomePage = () => {
  const { calculateTax } = useTaxData();

  const [yearValue, setYearValue] = useState<string>('');
  const [incomeValue, setIncomeValue] = useState<string>('');

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
      calculateTax(
        yearValue, incomeValue,
      ).then((res) => {
        console.log(
          'PROMISE RESOLVE', res,
        );
      }).catch((e) => {
        console.log(
          'Error 5', e,
        );
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
      <button onClick={onCalculateClick}>Calculate</button>
    </div>
  );
};

export { HomePage };
