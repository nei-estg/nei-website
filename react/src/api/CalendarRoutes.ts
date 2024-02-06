import client from "./Client";
import AuthenticatedClient from "./AuthenticatedClient";
import { ICalendar } from "@src/interfaces/ICalendar";

export const getCalendarEvents = async () => {
  const response = await client.get('/api/calendar/');
  if (response.status !== 200) throw new Error(response.data);
  return response.data as ICalendar[];
}

export const createCalendarEvent = async (calendar: ICalendar) => {
  const response = await AuthenticatedClient.post('/api/calendar/', calendar);
  if (response.status !== 201) throw new Error(response.data);
  return response.data as ICalendar;
}
