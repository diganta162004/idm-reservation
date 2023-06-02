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

  const onYearChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setYearValue(e.target.value);
    }, [],
  );

  const onCalculateClick = useCallback(
    () => {
      calculateTax(
        yearValue, '1234',
      ).then((res) => {
        console.log(
          'PROMISE RESOLVE', res,
        );
      });
    }, [calculateTax, yearValue],
  );

  return (
    <div className={styles.container}>
      <input
        onChange={onYearChange}
        value={yearValue}
      />
      <button onClick={onCalculateClick}>Calculate</button>
    </div>
  );
};

export { HomePage };
