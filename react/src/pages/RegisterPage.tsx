import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { RootState } from "@src/components/redux/store";
import { getCourses } from "@src/api/CourseRoutes";
import { registerUser } from "@src/api/UserRoutes";
import { ICourse } from "@src/interfaces/ICourse";
import { IUser } from "@src/interfaces/IUser";
import routes from "@src/router/Routes";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function Register() {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);


  const [userCreateAccount, setUserCreateAccount] = useState(false);

  const [courses, setCourses] = React.useState<ICourse[]>([]);

  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");

  useEffect(() => {
    document.title = routes.registerpage.name;
    getCourses()
      .then((courses) => setCourses(courses))
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
  }, []);

  const handleChangeCourses = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setSelectedCourses(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeYear = (event: SelectChangeEvent) => {
    setSelectedYear(event.target.value as string);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedCoursesObj = courses.filter((course) =>
      selectedCourses.includes(course.abbreviation)
    );

    const signUp: IUser = {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
      first_name: event.currentTarget.firstName.value,
      last_name: event.currentTarget.lastName.value,
      email: event.currentTarget.email.value,
      profilemodel: {
        course: selectedCoursesObj,
        year: parseInt(selectedYear),
      },
    };
    try {
      await registerUser(signUp);
      setUserCreateAccount(true);
    } catch (error) {
      toast.error("There was an error with your registration!", {
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
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>

      <Container component="main" maxWidth="xl" sx={{ marginTop: "60px", marginBottom: "60px" }}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color={darkMode ? "#FFFFFF" : "#191919"}>
            Criar Conta
          </Typography>

          {userCreateAccount && darkMode && (
          <Alert variant="filled" severity="info" sx={{ marginTop: "30px", marginBottom: "30px", color: "#FFFFFF" }}>
            Precisas de ativar a tua conta! Se o teu email da conta
              corresponder a um email de estudante, vais receber um email para
              ativares a tua conta. Se não corresponder, precisas de contactar o
              NEI para confirmar que és estudante ou ex-estudante da ESTG. Até
              ativares a tua conta, não vais conseguir entrar.
          </Alert>
        )}

          {userCreateAccount && !darkMode && (
          <Alert severity="info" sx={{ marginTop: "30px", marginBottom: "30px" }}>
             Precisas de ativar a tua conta! Se o teu email da conta
              corresponder a um email de estudante, vais receber um email para
              ativares a tua conta. Se não corresponder, precisas de contactar o
              NEI para confirmar que és estudante ou ex-estudante da ESTG. Até
              ativares a tua conta, não vais conseguir entrar.
          </Alert>
        )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '34%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  variant="filled"
                  id="firstName"
                  label="Primeiro Nome"
                  autoFocus
                  sx={{ backgroundColor: darkMode ? '#FFFFFF' : '', color: darkMode ? '#FFFFFF' : '',}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  variant="filled"
                  id="lastName"
                  label="Último Nome"
                  name="lastName"
                  autoComplete="family-name"
                  sx={{ backgroundColor: darkMode ? '#FFFFFF' : '', color: darkMode ? '#FFFFFF' : '',}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  variant="filled"
                  name="email"
                  autoComplete="email"
                  sx={{ backgroundColor: darkMode ? '#FFFFFF' : '', color: darkMode ? '#FFFFFF' : '',}}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  variant="filled"
                  name="Username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  sx={{ backgroundColor: darkMode ? '#FFFFFF' : '', color: darkMode ? '#FFFFFF' : '',}}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="filled"
                  name="password"
                  label="Palavra-Passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  sx={{ backgroundColor: darkMode ? '#FFFFFF' : '', color: darkMode ? '#FFFFFF' : '',}}

                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="course-label">Curso</InputLabel>
                  <Select
                    labelId="course-label"
                    id="course"
                    multiple
                    required
                    value={selectedCourses} //? Ignore this error
                    onChange={handleChangeCourses}
                    input={<OutlinedInput label="Course" />}
                    renderValue={(selected) => selected + " "}
                    MenuProps={MenuProps}
                    sx={{ backgroundColor: darkMode ? '#FFFFFF' : '', color: darkMode ? '#FFFFFF' : '',}}
                  >
                    {courses.map((course) => (
                      <MenuItem
                        key={course.abbreviation}
                        value={course.abbreviation}
                      >
                        <Checkbox
                          checked={
                            selectedCourses.indexOf(course.abbreviation) > -1
                          }
                        />
                        <ListItemText primary={course.abbreviation} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="year-label" >Ano</InputLabel>
                  <Select
                    labelId="year-label"
                    id="year"
                    value={selectedYear}
                    label="Age"
                    required
                    onChange={handleChangeYear}
                    sx={{ backgroundColor: darkMode ? '#FFFFFF' : '', color: darkMode ? '#FFFFFF' : '',}}
                    >
                    <MenuItem value={1}>1st</MenuItem>
                    <MenuItem value={2}>2nd</MenuItem>
                    <MenuItem value={3}>3rd</MenuItem>
                    <MenuItem value={4}>Erasmus</MenuItem>
                    <MenuItem value={5}>Alumni</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#054496", color: "#FFFFFF" }}
            >
              Criar Conta
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href={routes.loginpage.path} variant="body2">
                  Já tens conta? Inicia Sessão
                </Link>
              </Grid>

              <Grid item>
                <Link href={routes.activateaccountpage.path} variant="body2">
                  Ativar conta
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
