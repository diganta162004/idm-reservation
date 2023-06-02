import React, { useEffect } from 'react';

import { useApi } from '../hooks/useApi';
import { API_URLS } from '../statics/apiUrls';

import './home-page.scss';

const styles = {
  container: 'pgtc__home-page__container',
};

const HomePage = () => {
  const { apiGet } = useApi();

  useEffect(
    () => {
      apiGet(
        API_URLS.GET_TAX_DATA_FOR_YEAR, {
          year: 2022,
        },
      )
        .then((responseData: any) => {
          console.log(
            'RESPONSE', responseData.data,
          );
        });
    }, [apiGet],
  );

  return (
    <div className={styles.container}>
      PG Tax calculator
    </div>
  );
};

export { HomePage };
