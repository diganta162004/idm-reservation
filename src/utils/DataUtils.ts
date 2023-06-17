import { ReservationList, ReservationType } from '../types/ReservationTypes';

const generateUniqueId = (reservationDetails: any): string => `${reservationDetails?.stay?.arrivalDate}_${reservationDetails?.stay?.departureDate}`;

export const parseSearchResultsForState = (apiResponse: any): ReservationList => {
  const parsedData:Record<string, ReservationType> = {};
  if (apiResponse.length > 0) {
    apiResponse.forEach((resultItem: any) => {
      const uniqueId = generateUniqueId(resultItem);
      parsedData[uniqueId] = {
        id: uniqueId,
        firstName: resultItem.firstName,
        lastName: resultItem.lastName,
        email: resultItem.email,
      };
    });
  }
  return parsedData;
};
