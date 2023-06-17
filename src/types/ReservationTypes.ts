export type ReservationType = {
	id: string,
  firstName: string,
  lastName: string,
  email: string,
};

export type ReservationDictionary = Record<string, ReservationType[]>

export type ReservationList = Record<string, ReservationType>
