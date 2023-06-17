import React, {
  createContext, useCallback, useContext, useMemo, useState,
} from 'react';
import { ReservationDictionary, ReservationType } from '../types/ReservationTypes';
import { useApi } from './useApi';
import { LOADING_STATUS } from '../statics/enums';
import { isLoading } from '../utils/CommonUtils';
import { API_URLS } from '../statics/apiUrls';
import { parseSearchResultsForState } from '../utils/DataUtils';

type Props = {
  children: React.ReactNode,
}

interface UseReservationType {
  reservationList: ReservationDictionary,
  searchReservationByEmail: (email: string) => void,
}

const UseReservationContext = createContext<UseReservationType>({
  reservationList: {},
  searchReservationByEmail: () => {},
});

const useReservation = () => useContext(UseReservationContext);

const UseReservationProvider = ({ children }: Props) => {
  const [reservationList, setReservationList] = useState<ReservationDictionary>({});
  const [searchStatus, setSearchStatus] = useState<LOADING_STATUS>(LOADING_STATUS.NOT_YET_STARTED);

  const { apiGet } = useApi();

  const searchReservationByEmail = useCallback(
    (searchEmail: string) => {
      if (isLoading(searchStatus)) {
        return;
      }
      apiGet(
        API_URLS.SEARCH_RESERVATIONS, {}, {
          email: searchEmail,
        },
      ).then((responseData) => {
        const parsedSearchResult: Record<string, ReservationType> = parseSearchResultsForState(responseData.data);
        setReservationList((prevData) => ({
          ...reservationList,
          [searchEmail]: {
            ...reservationList[searchEmail],
            ...parsedSearchResult,
          },
        }));
      });
    }, [searchStatus],
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
