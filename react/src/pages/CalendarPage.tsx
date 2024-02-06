import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
//import events from "../components/calendar/events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { ICalendar } from "@src/interfaces/ICalendar";
import "../components/calendar/calendar.css";
import { createCalendarEvent, getCalendarEvents } from "@src/api/CalendarRoutes";
import { toast, Bounce } from "react-toastify";

moment.locale("pt-BR"); // Set the locale to Portuguese
const localizer = momentLocalizer(moment);

const customLabels = {
  day: "Dia",
  agenda: "Agenda",
  work_week: "Semana",
  month: "Mês",
  today: "Hoje",
  previous: "<-",
  next: "->",
};

export default function CalendarPage() {
  const [eventsData, setEventsData] = useState<ICalendar[]>([]);

  useEffect(() => {
    getCalendarEvents().then((result) => {
      const calendar: ICalendar[] = result;
      setEventsData(calendar);
    }).catch();
  }, [])

  const handleSelect = () => {
    //TODO: Get Data from User
    const newCalendar: ICalendar = {
      name: "Test Event Creation",
      startDate: new Date(),
      endDate: new Date(),
      description: "Lorem Ipsim ...",
      place: "Sala P7"
      //! Acho que nao vale a pena escolher a unidade curricular
    }
    createCalendarEvent(newCalendar).then((result: ICalendar) => {
      toast.success("Evento criado com sucesso! O NEI irá rever o teu evento!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setEventsData([...eventsData, result]);
    }).catch();
  };

  // Map eventsData to the format expected by react-big-calendar
  const calendarEvents = eventsData.map((event) => ({
    title: event.name,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    //allDay: true, // assuming all events are all-day events
  }));

  return (
    <div className="App">
      <div style={{ padding: "20px" }}>
        <Calendar
          views={["day", "work_week", "month"]}
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={calendarEvents}
          style={{ height: "80vh", width: "80%", margin: "0 auto" }}
          onSelectEvent={(event) => alert(event.title)}
          onSelectSlot={handleSelect}
          messages={customLabels}
        />
      </div>
    </div>
  );
}
