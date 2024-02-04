import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "../components/calendar/events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import "../components/calendar/calendar.css";

moment.locale("pt-BR"); // Set the locale to Portuguese
const localizer = momentLocalizer(moment);

const customMessages = {
  day: "Dia",
  agenda: "Agenda",
  work_week: "Semana",
  month: "Mês",
  today: "Hoje",
  previous: "<-",
  next: "->",
};

export default function CalendarPage() {
  const [eventsData, setEventsData] = useState(events);

  const handleSelect = () => {
    const title = window.prompt("New Event name");
  };

  // Map eventsData to the format expected by react-big-calendar
  const calendarEvents = eventsData.map((event) => ({
    title: event.name,
    start: new Date(event.date),
    end: new Date(event.date),
    allDay: true, // assuming all events are all-day events
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
          messages={customMessages}
        />
      </div>
    </div>
  );
}
