import React, {
  createContext, useCallback, useContext, useMemo, useState,
} from 'react';
import {
  ReservationDictionary, ReservationList, ReservationType,
} from '../types/ReservationTypes';
import { useApi } from './useApi';
import { API_URLS } from '../statics/apiUrls';
import { parseSearchResultsForState } from '../utils/DataUtils';
import { useLogger } from '../utils/UseLogger';

type Props = {
  children: React.ReactNode,
}

interface UseReservationType {
  reservationList: ReservationDictionary,
  searchReservationByEmail: (email: string) => Promise<ReservationList>,
}

const UseReservationContext = createContext<UseReservationType>({
  reservationList: {},
  searchReservationByEmail: () => Promise.resolve({}),
});

const useReservation = () => useContext(UseReservationContext);

const UseReservationProvider = ({ children }: Props) => {
  const [reservationList, setReservationList] = useState<ReservationDictionary>({});

  const { apiGet } = useApi();
  const { error } = useLogger();

  const searchReservationByEmail = useCallback(
    (searchEmail: string): Promise<ReservationList> => new Promise((
      resolve, reject,
    ) => {
      if (reservationList[searchEmail]) {
        Promise.resolve(reservationList[searchEmail]);
        return;
      }
      apiGet(
        API_URLS.SEARCH_RESERVATIONS, {}, {
          email: searchEmail,
        },
      ).then((responseData: any) => {
        const parsedSearchResult: Record<string, ReservationType> = parseSearchResultsForState(responseData?.data);
        setReservationList((prevData) => ({
          ...prevData,
          [searchEmail]: {
            ...prevData[searchEmail],
            ...parsedSearchResult,
          },
        }));
        resolve(parsedSearchResult);
      }).catch((e) => {
        error(
          'useReservation: searchReservationByEmail', 'Error in fetching search results', e,
        );
        reject();
      });
    }), [reservationList],
  );

  const contextValue = useMemo(
    () => ({
      reservationList,
      searchReservationByEmail,
    }), [
      reservationList,
      searchReservationByEmail,
    ],
  );

  return (
    <UseReservationContext.Provider value={contextValue}>
      {children}
    </UseReservationContext.Provider>
  );
};
export {
  useReservation,
  UseReservationProvider,
};

export type { Props };
