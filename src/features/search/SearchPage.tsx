import React, { useEffect } from 'react';

import './search-page.scss';
import { useReservation } from '../../hooks/useReservation';

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

  useEffect(
    () => {
      searchReservationByEmail('email@email.com').then((data) => {
        console.log(
          'RESULTS', data,
        );
      });
    }, [searchReservationByEmail],
  );

  return (
    <div className={styles.container}>
      Search Page
      <div>
        {JSON.stringify(reservationList)}
      </div>
    </div>
  );
};
export { SearchPage };
