import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { RootState } from "@src/components/redux/store";
import { useSelector } from "react-redux";



const darkMode = useSelector((state: RootState) => state.theme.darkMode);

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState(events);

  const handleSelect = () => {
    const title = window.prompt("Novo Evento");
  };

  return (
    <div className="App" style={{ width: "800px", margin: "0 auto", }}>
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
  );
}
