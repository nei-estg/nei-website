import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  createCalendarEvent,
  getCalendarEvents,
} from "@src/api/CalendarRoutes";
import { getCourses } from "@src/api/CourseRoutes";
import { isLoggedIn } from "@src/api/utils/LoginStatus";
import { ICalendar } from "@src/interfaces/ICalendar";
import { ICourse } from "@src/interfaces/ICourse";
import { ICurricularUnit } from "@src/interfaces/ICurricularUnit";
import Holidays from "date-holidays";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { Calendar, SlotInfo, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Bounce, toast } from "react-toastify";
import "../components/calendar/calendar.css";
import routes from "@src/router/Routes";

moment.locale("pt-BR"); // Set the locale to Portuguese
const localizer = momentLocalizer(moment);
const hd = new Holidays("PT");

const customLabels = {
  day: "Dia",
  agenda: "Agenda",
  work_week: "Semana",
  month: "Mês",
  today: "Hoje",
  previous: "<",
  next: ">",
};




export default function CalendarPage() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const [eventsData, setEventsData] = useState<ICalendar[]>([]);
  const [coursesData, setCoursesData] = useState<ICourse[]>([]);
  const [openAddEventModal, setOpenAddEventModal] = useState(false);
  const [openViewEventModal, setOpenViewEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({} as ICalendar);
  const [selectedSlot, setSelectedSlot] = useState({} as SlotInfo);
  const [selectedCourse, setSelectedCourse] = useState({} as ICourse);
  const [curricularUnitsData, setCurricularUnitsData] = useState<
    ICurricularUnit[]
  >([]);
  const [selectedCurricularUnit, setSelectedCurricularUnit] = useState({} as ICurricularUnit);

  useEffect(() => {
    document.title = routes.calendarpage.name;

    //! Add Holidays to Calendar
    const holidays = hd.getHolidays();
    const holidayEvents = holidays.map((holiday, index) => ({
      id: -(index + 1),
      name: holiday.name,
      description: "Evento Automático",
      startDate: new Date(holiday.start),
      endDate: new Date(holiday.end),
    }));

    //! Get Calendar Events
    getCalendarEvents()
      .then((result) => {
        setEventsData(holidayEvents.concat(result)); // Adicionar eventos de feriados e eventos obtidos
      })
      .catch(() => {
        toast.error(
          "Ocorreu um erro ao aceder ao Calendário! Por favor tenta novamente!",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          }
        );
      });

    //! Get Courses
    getCourses()
      .then((result) => {
        setCoursesData(result);
      })
      .catch(() => {
        toast.error(
          "Ocorreu um erro ao aceder aos Cursos! Por favor tenta novamente!",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          }
        );
      });

    // Limpar eventos antes de montar novamente o componente
    return () => {
      setEventsData([]);
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !(
        event.currentTarget.startDate.value && event.currentTarget.endDate.value
      )
    ) {
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
    };
    createCalendarEvent(newCalendar)
      .then((result: ICalendar) => {
        toast.success(
          "Evento criado com sucesso! O NEI irá rever o teu evento para que seja mostrado! (ao dar refresh ele desaparece!)",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          }
        );
        setEventsData([...eventsData, result]);
        setOpenAddEventModal(false);
        setSelectedCurricularUnit({} as ICurricularUnit);
        setSelectedCourse({} as ICourse);
      })
      .catch(() => {
        toast.error(
          "Ocorreu um erro ao criar o Evento! Por favor tenta novamente!",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          }
        );
      });
  };

  // Map eventsData to the format expected by react-big-calendar
  const calendarEvents = eventsData.map((event) => ({
    id: event.id,
    title: event.name,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
  }));

  const handleSelectCourse = (event: SelectChangeEvent) => {
    setSelectedCourse(
      coursesData.filter((c) => c.abbreviation === event.target.value)[0]
    );
    setCurricularUnitsData(
      coursesData.filter((c) => c.abbreviation === event.target.value)[0]
        .curricularUnits
    );
  };

  const handleSelectCurricularUnit = (event: SelectChangeEvent) => {
    setSelectedCurricularUnit(
      curricularUnitsData.filter(
        (c) => c.abbreviation === event.target.value
      )[0]
    );
  };

  const handleSelectEvent = (event: { id: number | undefined }) => {
    setSelectedEvent(eventsData.filter((e) => e.id === event.id)[0]);
    setOpenViewEventModal(true);
  };

  return (
    <ThemeProvider theme={createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } })}>

      <Container maxWidth="xl" sx={{ marginBottom: '60px' }}>
        <Alert severity="info" sx={{ marginTop: "30px", marginBottom: "30px" }}>
          Podes ver eventos adicionados pela comunidade e verificados pelo NEI.
          Também mostramos feriados, e tu, com a tua sessão iniciada, podes criar eventos.
          Quando crias um evento, ele fica visível para ti até que atualizes a página.
        </Alert>

        <Typography
          variant="h4"
          sx={{
            color: "#1E2022",
            display: "flex",
            fontWeight: 700,
            flexDirection: "column",
            alignItems: "center",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          Calendário
        </Typography>

        <div>
          <Calendar
            views={["day", "work_week", "month"]}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={calendarEvents}
            style={{ height: "80vh", width: "100%", margin: "0 auto" }}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={(slotInfo) => {
              setSelectedSlot(slotInfo);
              setOpenAddEventModal(true);
            }}
            messages={customLabels}
          />
        </div>
        <Modal
          open={openViewEventModal}
          onClose={() => setOpenViewEventModal(false)}
        >
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
            <p>Titulo: {selectedEvent?.name}</p>
            <p>Descrição: {selectedEvent?.description}</p>
            <p>
              Inicio: {new Date(selectedEvent?.startDate).toLocaleString("pt-PT")}
            </p>
            <p>Fim: {new Date(selectedEvent?.endDate).toLocaleString("pt-PT")}</p>
            {selectedEvent?.place && <p>Local: {selectedEvent.place}</p>}
            {selectedEvent?.curricularUnit && (
              <>
                <p>
                  Unidade Curricular: {selectedEvent.curricularUnit.abbreviation}
                </p>
                <p>
                  Curso:{" "}
                  {selectedEvent.curricularUnit?.course
                    ?.map((course) => course.abbreviation)
                    .join(", ")}
                </p>
              </>
            )}
          </Box>
        </Modal>
        <Modal
          open={openAddEventModal}
          onClose={() => setOpenAddEventModal(false)}
        >
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
            <h1>Adicionar Evento</h1>
            {!isLoggedIn() ? (
              <h2>Para adicionar um evento é necessário iniciar sessão!</h2>
            ) : (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="eventName"
                  label="Nome"
                  name="eventName"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="description"
                  label="Descrição"
                  id="description"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    sx={{
                      width: "100%",
                      mt: 2,
                    }}
                    name="startDate"
                    label="Data Inicial"
                    value={dayjs(selectedSlot?.start)}
                  />
                  <DateTimePicker
                    sx={{
                      width: "100%",
                      mt: 2,
                    }}
                    name="endDate"
                    label="Data Final"
                    value={dayjs(selectedSlot?.end)}
                  />
                </LocalizationProvider>
                <TextField
                  margin="normal"
                  fullWidth
                  name="place"
                  label="Local"
                  id="place"
                />
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="course-label">Curso</InputLabel>
                  <Select
                    labelId="course-label"
                    id="course"
                    label="Curso"
                    value={selectedCourse.abbreviation}
                    onChange={handleSelectCourse}
                  >
                    {coursesData.map((option) => (
                      <MenuItem
                        key={option.abbreviation}
                        value={option.abbreviation}
                      >
                        {option.abbreviation}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="curricular-unit-label">
                    Unidade Curricular
                  </InputLabel>
                  <Select
                    labelId="curricular-unit-label"
                    id="curricularUnit"
                    label="Unidade Curricular"
                    value={selectedCurricularUnit.abbreviation}
                    onChange={handleSelectCurricularUnit}
                    disabled={!selectedCourse.abbreviation}
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
              </>
            )}
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
}
