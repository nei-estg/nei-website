import { Calendar, SlotInfo, momentLocalizer } from "react-big-calendar";
import moment from "moment";
//import events from "../components/calendar/events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { ICalendar } from "@src/interfaces/ICalendar";
import "../components/calendar/calendar.css";
import { createCalendarEvent, getCalendarEvents } from "@src/api/CalendarRoutes";
import { toast, Bounce } from "react-toastify";
import { Box, Modal } from "@mui/material";

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
  const [openAddEventModal, setOpenAddEventModal] = useState(false);
  const [openViewEventModal, setOpenViewEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({} as ICalendar);
  const [selectedSlot, setSelectedSlot] = useState({} as SlotInfo);


  const handleCloseViewEventModal = () => {
    setOpenViewEventModal(false);
  }

  const handleCloseAddEventModal = () => {
    setOpenAddEventModal(false);
  }

  useEffect(() => {
    document.title = "Calendar - NEI"
    getCalendarEvents().then((result) => {
      const calendar: ICalendar[] = result;
      setEventsData(calendar);
    }).catch(() => {
      toast.error("Ocorreu um erro ao aceder ao Calendário! Por favor tenta novamente!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    });
  }, [])

  const handleSelect = () => {
    //TODO: Get Data from User
    const newCalendar: ICalendar = {
      name: "Test Event Creation",
      startDate: new Date(),
      endDate: new Date(),
      description: "Lorem Ipsim ...",
      place: "Sala P7"
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
        theme: "dark",
        transition: Bounce,
      });
      setEventsData([...eventsData, result]);
    }).catch(() => {

    });
  };

  // Map eventsData to the format expected by react-big-calendar
  const calendarEvents = eventsData.map((event) => ({
    title: event.name,
    start: event.startDate,
    end: event.endDate,
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
          onSelectEvent={(event) => {setSelectedEvent(eventsData.filter((e) => {e.name === event.title && e.startDate === event.start && e.endDate === event.end} )[0]); setOpenAddEventModal(true)}}
          onSelectSlot={(slotInfo) => {setSelectedSlot(slotInfo); setOpenAddEventModal(true)}}
          messages={customLabels}
        />
      </div>
      <Modal open={openViewEventModal} onClose={handleCloseViewEventModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedEvent && (
            <div>
              <h1>{selectedEvent.name}</h1>
              <p>{selectedEvent.description}</p>
              <p>{selectedEvent.place}</p>
            </div>
          )}
        </Box>
      </Modal>
      <Modal open={openAddEventModal} onClose={handleCloseAddEventModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          
        </Box>
      </Modal>
    </div>
  );
}
