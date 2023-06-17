import React, { useCallback, useEffect } from 'react';

import './search-page.scss';
import { useReservation } from '../../hooks/useReservation';
import { SearchBar } from './SearchBar';

type Props = {
    id?: string,
}

const styles = {
  container: 'idr__search-page__container',
};

const SearchPage = (props: Props) => {
  const { id } = props;

  const {
    reservationList,
    searchReservationByEmail,
  } = useReservation();

  const onSearchClick = useCallback(
    (searchEmail: string) => {
      searchReservationByEmail(searchEmail).then((results) => {
        console.log(
          'RESULTS', results,
        );
      });
    }, [searchReservationByEmail],
  );

  return (
    <div className={styles.container}>
      <SearchBar onSearchClick={onSearchClick} />
    </div>
  );
};
export { SearchPage };
