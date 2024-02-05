import client from "./Client";
import AuthenticatedClient from "./AuthenticatedClient";
import { IPaginatedResponse as IPaginatedResponse } from "@src/interfaces/IPaginatedResponse";
import { ICalendar } from "@src/interfaces/ICalendar";

export const getCalendar = async () => {
  try {
    const response = await client.get('/api/calendar/');
    if (response.status !== 200) throw new Error();
    return response.data as IPaginatedResponse<ICalendar>;
  } catch (error) {
    throw new Error("There was an error fetching the calendar.");
  }
}

export const createCalendar = async (calendar: ICalendar) => {
  try {
    const response = await AuthenticatedClient.post('/api/calendar/', calendar);
    if (response.status !== 201) throw new Error();
    return response.data as ICalendar;
  } catch (error) {
    throw new Error("There was an error creating a calendar event.");
  }
}
