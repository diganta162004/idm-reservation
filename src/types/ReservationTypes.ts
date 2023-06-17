export type ReservationType = {
	id: string,
  firstName: string,
  lastName: string,
  email: string,
};

export type ReservationDictionary = Record<string, ReservationType[]>
