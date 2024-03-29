import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import KeyIcon from "@mui/icons-material/Key";
import SaveIcon from "@mui/icons-material/Save";
import SecurityIcon from "@mui/icons-material/Security";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
import { RootState } from "@src/components/redux/store";
import { getCourses } from "@src/api/CourseRoutes";
import { getUser, updateUser } from "@src/api/UserRoutes";
import { ICourse } from "@src/interfaces/ICourse";
import { IUser } from "@src/interfaces/IUser";
import routes from "@src/router/Routes";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";





export default function ProfilePage() {
  const darkReader = useSelector((state: RootState) => state.theme.darkMode);


  const [user, setUser] = useState<IUser>({} as IUser);
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar a visibilidade
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [courses, setCourses] = useState<ICourse[]>([]);

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

  useEffect(() => {
    document.title = routes.profilepage.name;
    getUser()
      .then((response) => {
        setUser(response);

        // Atualiza o estado selectedCourses com os cursos do utilizador
        const userCourses =
          response.profilemodel?.course?.map(
            (course: ICourse) => course.abbreviation
          ) || [];
        setSelectedCourses(userCourses);
      })
      .catch(() => {
        toast.error(
          "Ocorreu um erro ao aceder ao Perfil! Por favor tenta novamente!",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: darkReader ? "dark" : "light",
            transition: Bounce,
          }
        );
      });

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
            theme: darkReader ? "dark" : "light",
            transition: Bounce,
          }
        );
      });
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing); // Alterna o estado de edição
  };

  const handleChange = (event: SelectChangeEvent<typeof selectedCourses>) => {
    const {
      target: { value },
    } = event;
    setSelectedCourses(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeCourses = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setSelectedCourses(typeof value === "string" ? value.split(",") : value);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  /** obter o ano do utilizador
   *
   * @param year
   * @returns
   */
  function getUserYearText(year: number): string {
    switch (year) {
      case 1:
        return "1º ano";
      case 2:
        return "2º ano";
      case 3:
        return "3º ano";
      case 4:
        return "Erasmus";
      case 5:
        return "Alumni";
      case null:
        return "Não especificado";
      default:
        return `${year}º ano`; // Para anos não especificados, mas presentes
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      first_name: event.currentTarget.firstName.value,
      last_name: event.currentTarget.lastName.value,
      username: event.currentTarget.username.value,
      email: event.currentTarget.email.value,
      profilemodel: {
        discord: event.currentTarget.discord.value,
        course: courses.filter((course) =>
          selectedCourses.includes(course.abbreviation)
        ),
        year: event.currentTarget.year.value,
      },
    } as IUser;

    updateUser(data)
      .then(() => {
        toast.success("Perfil atualizado com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkReader ? "dark" : "light",
          transition: Bounce,
        });
        //TODO: Update stuff on localstorage
      })
      .catch(() => {
        toast.error("Ocorreu um erro ao atualizar o perfil!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkReader ? "dark" : "light",
          transition: Bounce,
        });
      });
  };

  const theme = createTheme({
    components: {
      MuiFilledInput: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgb(232, 241, 250)',
            '&:hover': {
              backgroundColor: 'rgb(232, 241, 250)',
              '@media (hover: none)': {
                backgroundColor: 'rgb(232, 241, 250)',
              },
            },
            '&.Mui-focused': {
              backgroundColor: 'rgb(232, 241, 250)',
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgb(232, 241, 250)',
            '&:hover': {
              backgroundColor: 'rgb(232, 241, 250)',
              '@media (hover: none)': {
                backgroundColor: 'rgb(232, 241, 250)',
              },
            },
            '&.Mui-focused': {
              backgroundColor: 'rgb(232, 241, 250)',
            },
          },
        },
      },
    }
  });

  return (
    <ThemeProvider theme={theme}>

      <Container maxWidth="xl" sx={{ marginTop: "30px", marginBottom: "60px" }}>
        <div>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Grid
                container
                direction="row"
                alignItems="start"
                justifyContent="center"
              >
                {!isEditing && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "93%", }}>
                    {/*foto*/}
                    <Avatar
                      sx={{ width: "160px", height: "160px" }}
                      src={user.profilemodel?.image}
                    />

                    {/*nome*/}
                    <div>
                      <Tooltip title="Administrador" placement="left-start">
                        <Typography
                          variant="subtitle2"
                          color="#054496"
                          sx={{
                            fontSize: {
                              xs: "32px",
                              sm: "32px",
                              md: "32px",
                              lg: "32px",
                              xl: "32px",
                            },
                            textAlign: "center",
                            marginTop: "10px",
                          }}
                        >
                          {user.is_staff ? <SecurityIcon /> : ""}
                          {user.first_name} {user.last_name}
                        </Typography>
                      </Tooltip>
                    </div>

                    {/*username*/}
                    <Typography
                      variant="subtitle2"
                      color="#636F80"
                      sx={{
                        fontSize: {
                          xs: "24px",
                          sm: "24px",
                          md: "24px",
                          lg: "24px",
                          xl: "24px",
                        },
                        textAlign: "center",
                        marginTop: "-8px",
                      }}
                    >
                      @{user.username}
                    </Typography>

                    {/*cursos*/}
                    <Typography
                      variant="subtitle2"
                      color="#969696"
                      sx={{
                        fontSize: "16px",
                        textAlign: "center",
                        marginTop: "0px",
                      }}
                    >
                      {user.profilemodel?.course
                        ?.map((course: ICourse) => course.abbreviation)
                        .join(", ")}
                    </Typography>

                    {/*ano*/}
                    <div>
                      <Tooltip
                        title="Todos os anos tens que atualizar, não te esqueças! Este deve ser referente ao teu curso mais recente!"
                        placement="left-start"
                      >
                        <Typography
                          variant="subtitle2"
                          color="#969696"
                          sx={{
                            fontSize: "16px",
                            textAlign: "start",
                            marginTop: "10px",
                          }}
                        >
                          <InfoIcon
                            sx={{ fontSize: 20, marginBottom: "-3px" }}
                          />{" "}
                          {getUserYearText(user.profilemodel?.year)}
                        </Typography>
                      </Tooltip>
                    </div>
                  </div>
                )}

                {isEditing && (
                  <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "93%",
                  }}
                  >
                    <Box component="form" onSubmit={handleSubmit} >
                      {/*nome*/}
                      <div
                        style={{
                          marginTop: "40px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <TextField
                          id="tf-firstName"
                          variant="filled"
                          label="Primeiro Nome"
                          name="firstName"
                          defaultValue={user.first_name}
                          sx={{ width: "48%", }}
                        />
                        <TextField
                          id="tf-lastName"
                          label="Último Nome"
                          name="lastName"
                          variant="filled"
                          defaultValue={user.last_name}
                          sx={{ width: "48%",}}
                        />
                      </div>

                      {/*username*/}
                      <div style={{ marginTop: "20px", width: "100%" }}>
                        <TextField
                          id="tf-username"
                          label="Username"
                          variant="filled"
                          name="username"
                          defaultValue={user.username}
                          sx={{ width: "100%", }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                @
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>

                      {/*username Discord*/}
                      <div style={{ marginTop: "20px", width: "100%" }}>
                        <TextField
                          id="tf-usernameDiscord"
                          label="Discord Username"
                          name="discord"
                          variant="filled"
                          defaultValue={user.profilemodel?.discord}
                          sx={{ width: "100%", }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                @
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>

                      {/*email*/}
                      <div style={{ marginTop: "20px", width: "100%" }}>
                        <TextField
                          id="tf-email"
                          label="Email"
                          variant="filled"
                          defaultValue={user.email}
                          type="email"
                          name="email"
                          sx={{ width: "100%", }}
                          input={<OutlinedInput label="Email" />}
                        />
                      </div>

                      {/*cursos*/}
                      <div style={{ marginTop: "25px", width: "100%" }}>
                        <FormControl sx={{ width: "100%" }}>
                          <InputLabel id="course-label" variant="filled">Cursos</InputLabel>
                          <Select
                            labelId="course-label"
                            id="course"
                            multiple
                            required
                            value={selectedCourses}
                            onChange={handleChangeCourses}
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={MenuProps}
                          >
                            {courses.map((course) => (
                              <MenuItem
                                key={course.abbreviation}
                                value={course.abbreviation}
                              >
                                <Checkbox
                                  checked={
                                    selectedCourses.indexOf(
                                      course.abbreviation
                                    ) > -1
                                  }
                                />
                                <ListItemText primary={course.abbreviation} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>

                      {/*ano*/}
                      <div style={{ marginTop: "20px", width: "100%" }}>
                        <TextField
                          id="tf-year"
                          select
                          name="year"
                          variant="filled"
                          label="Ano"
                          defaultValue={user.profilemodel?.year}
                          sx={{ width: "100%", backgroundColor: darkReader ? "#FFFFFF" : ""}}
                          helperText="Todos os anos tens que atualizar, não te esqueças! Este deve ser referente ao teu curso mais recente!"
                        >
                          <MenuItem value={1}>1st</MenuItem>
                          <MenuItem value={2}>2nd</MenuItem>
                          <MenuItem value={3}>3rd</MenuItem>
                          <MenuItem value={4}>Erasmus</MenuItem>
                          <MenuItem value={5}>Alumni</MenuItem>
                        </TextField>
                      </div>

                      {/*password*/}
                      <div style={{ marginTop: "25px" }}>
                        <Button
                          variant="contained"
                          startIcon={<KeyIcon />}
                          href={routes.changepasswordpage.path}
                          sx={{
                            backgroundColor: "#054496",
                            color: "#FFFFFF",
                            borderRadius: "100px",
                            width: "100%",
                          }}
                        >
                          Alterar Palavra-Passe
                        </Button>
                      </div>

                      {/*logout-all*/}
                      <div style={{ marginTop: "25px" }}>
                        <Button
                          variant="contained"
                          startIcon={<KeyIcon />}
                          href={routes.logoutallpage.path}
                          sx={{
                            backgroundColor: "#054496",
                            color: "#FFFFFF",
                            borderRadius: "100px",
                            width: "100%",
                          }}
                        >
                          Logout em todos os dispositivos
                        </Button>
                      </div>

                      <div style={{ marginTop: "40px" }}>
                        <Button
                          type="submit"
                          variant="contained"
                          startIcon={<SaveIcon />}
                          sx={{
                            backgroundColor: "#054496",
                            color: "#FFFFFF",
                            borderRadius: "100px",
                            width: "100%",
                          }}
                        >
                          Guardar Alterações
                        </Button>
                      </div>
                    </Box>
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", alignItems: "end", justifyContent: "end", width: "7%", }}>
                  <Button
                    onClick={handleEditClick}
                    variant="contained"
                    startIcon={<EditIcon />}
                    sx={{
                      backgroundColor: "#054496",
                      color: "#FFFFFF",
                      borderRadius: "100px",
                    }}
                  >
                    Editar
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>
    </ThemeProvider>
  );
}
