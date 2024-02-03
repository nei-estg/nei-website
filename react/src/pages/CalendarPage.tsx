import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "../components/calendar/events"
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const [eventsData, setEventsData] = useState(events);

  const handleSelect = () => {
    const title = window.prompt("New Event name");
  };
  return (
    <div className="App">
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
  );
}
