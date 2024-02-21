import { Calendar, SlotInfo, momentLocalizer } from "react-big-calendar";
import moment from "moment";
//import events from "../components/calendar/events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { ICalendar } from "@src/interfaces/ICalendar";
import "../components/calendar/calendar.css";
import { createCalendarEvent, getCalendarEvents } from "@src/api/CalendarRoutes";
import { toast, Bounce } from "react-toastify";
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { ICourse } from "@src/interfaces/ICourse";
import { getCourses } from "@src/api/CourseRoutes";
import { ICurricularUnit } from "@src/interfaces/ICurricularUnit";

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
  const [coursesData, setCoursesData] = useState<ICourse[]>([]);
  const [openAddEventModal, setOpenAddEventModal] = useState(false);
  const [openViewEventModal, setOpenViewEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({} as ICalendar);
  const [selectedSlot, setSelectedSlot] = useState({} as SlotInfo);
  const [selectedCourse, setSelectedCourse] = useState({} as ICourse);
  const [curricularUnitsData, setCurricularUnitsData] = useState<ICurricularUnit[]>([]);
  const [selectedCurricularUnit, setSelectedCurricularUnit] = useState({} as ICurricularUnit);

  useEffect(() => {
    document.title = "Calendar - NEI"
    getCalendarEvents().then((result) => {
      setEventsData(result);
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
    getCourses().then((result) => {
      setCoursesData(result);
    }).catch(() => {
      toast.error("Ocorreu um erro ao aceder aos Cursos! Por favor tenta novamente!", {
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

    //if course is selected check if curricular unit is selected
    if (selectedCourse.abbreviation && !selectedCurricularUnit.abbreviation) {
      toast.error("Por favor seleciona uma Unidade Curricular!", {
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
      curricularUnit: selectedCurricularUnit,
      place: event.currentTarget.place.value,
    }
    createCalendarEvent(newCalendar).then((result: ICalendar) => {
      toast.success("Evento criado com sucesso! O NEI irá rever o teu evento para que seja mostrado! (ao dar refresh ele desaparece!)", {
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
      setSelectedCurricularUnit({} as ICurricularUnit);
      setSelectedCourse({} as ICourse);
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
    id: event.id,
    title: event.name,
    start: event.startDate,
    end: event.endDate,
  }));

  const handleSelectCourse = (event: SelectChangeEvent) => {
    setSelectedCourse(coursesData.filter((c) => c.abbreviation === event.target.value)[0]);
    setCurricularUnitsData(coursesData.filter((c) => c.abbreviation === event.target.value)[0].curricularUnits);
  }

  const handleSelectCurricularUnit = (event: SelectChangeEvent) => {
    setSelectedCurricularUnit(curricularUnitsData.filter((c) => c.abbreviation === event.target.value)[0]);
  }

  const handleSelectEvent = (event: { id: number | undefined; }) => {
    setSelectedEvent(eventsData.filter((e) => e.id === event.id)[0]);
    setOpenViewEventModal(true)
  }

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Calendar
          views={["day", "work_week", "month"]}
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={calendarEvents}
          style={{ height: "80vh", width: "80%", margin: "0 auto" }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={(slotInfo) => {setSelectedSlot(slotInfo); setOpenAddEventModal(true)}}
          messages={customLabels}
        />
      </div>
      <Modal open={openViewEventModal} onClose={() => setOpenViewEventModal(false)}>
        <Box
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
          <h1>Ver Evento</h1>
          <p>Titulo: {selectedEvent?.name}</p>
          <p>Descrição: {selectedEvent?.description}</p>
          <p>Inicio: {selectedEvent?.startDate}</p>
          <p>Fim: {selectedEvent?.endDate}</p>
          {selectedEvent?.place && <p>Local: {selectedEvent.place}</p>}
          {selectedEvent?.curricularUnit && <p>Unidade Curricular: {selectedEvent.curricularUnit.abbreviation}</p>}
        </Box>
      </Modal>
      <Modal open={openAddEventModal} onClose={() => setOpenAddEventModal(false)}>
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                sx={{
                  width: "100%",
                  mt: 2,
                }}
                name="startDate"
                label="Start Date"
                value={dayjs(selectedSlot?.start)}
              />
              <DateTimePicker
                sx={{
                  width: "100%",
                  mt: 2,
                }}
                name="endDate"
                label="End Date"
                value={dayjs(selectedSlot?.end)}
              />
            </LocalizationProvider>
            <TextField
              margin="normal"
              fullWidth
              name="place"
              label="Place"
              id="place"
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="course-label">Course</InputLabel>
              <Select
                labelId="course-label"
                id="course"
                label="Course"
                value={selectedCourse.abbreviation}
                onChange={handleSelectCourse}
              >
                {coursesData.map((option) => (
                  <MenuItem key={option.abbreviation} value={option.abbreviation}>
                    {option.abbreviation}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="curricular-unit-label">Curricular Unit</InputLabel>
              <Select
                labelId="curricular-unit-label"
                id="curricularUnit"
                label="Curricular Unit"
                value={selectedCurricularUnit.abbreviation}
                onChange={handleSelectCurricularUnit}
              >
              {selectedCourse?.curricularUnits?.map((unit) => (
                <MenuItem key={unit.abbreviation} value={unit.abbreviation}>
                  {unit.abbreviation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
    </>
  );
}
