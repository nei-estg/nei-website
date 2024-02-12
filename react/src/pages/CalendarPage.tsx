import { Calendar, SlotInfo, momentLocalizer } from "react-big-calendar";
import moment from "moment";
//import events from "../components/calendar/events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { ICalendar } from "@src/interfaces/ICalendar";
import "../components/calendar/calendar.css";
import { createCalendarEvent, getCalendarEvents } from "@src/api/CalendarRoutes";
import { toast, Bounce } from "react-toastify";
import { Box, Button, ListSubheader, MenuItem, Modal, Select, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!(event.currentTarget.startDate.value && event.currentTarget.endDate.value)) {
      toast.error("Por favor preenche os campos de Data e Hora!", {
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
      return;
    }

    const newCalendar: ICalendar = {
      name: event.currentTarget.eventName.value,
      description: event.currentTarget.description.value,
      startDate: new Date(event.currentTarget.startDate.value),
      endDate: new Date(event.currentTarget.endDate.value),
      //curricularUnit: 
      place: event.currentTarget.place.value,
    }
    createCalendarEvent(newCalendar).then((result: ICalendar) => {
      toast.success("Evento criado com sucesso! O NEI irá rever o teu evento para que seja mostrado!", {
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
      setOpenAddEventModal(false);
    }).catch(() => {
      toast.error("Ocorreu um erro ao criar o Evento! Por favor tenta novamente!", {
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
  }

  // Map eventsData to the format expected by react-big-calendar
  const calendarEvents = eventsData.map((event) => ({
    title: event.name,
    start: event.startDate,
    end: event.endDate,
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
          onSelectEvent={(event) => {setSelectedEvent(eventsData.filter((e) => {e.name === event.title && e.startDate === event.start && e.endDate === event.end})[0]); setOpenViewEventModal(true)}}
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
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            textAlign: "center",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h1>Novo Evento</h1>
          <TextField
              margin="normal"
              required
              fullWidth
              id="eventName"
              label="Name"
              name="eventName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              id="description"
            />
            //TODO: Add Required Date and Time fields, Course Select that filters Curricular Units and Styling
            {selectedSlot && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  name="startDate"
                  label="Start Date"
                  //value={selectedSlot.start}
                />
                <DateTimePicker
                  name="endDate"
                  label="End Date"
                  //value={selectedSlot.end}
                />
              </LocalizationProvider>
            )}
            <Select
              id="curricularUnit"
              //value={}
              //onChange={}
            >
              <ListSubheader>Group 1</ListSubheader>
              <MenuItem>Item 1</MenuItem>
              <MenuItem>Item 2</MenuItem>
              <ListSubheader>Group 2</ListSubheader>
              <MenuItem>Item 3</MenuItem>
              <MenuItem>Item 4</MenuItem>
            </Select>
            <TextField
              margin="normal"
              fullWidth
              name="place"
              label="Place"
              id="place"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Adicionar Evento
            </Button>
        </Box>
      </Modal>
    </div>
  );
}
