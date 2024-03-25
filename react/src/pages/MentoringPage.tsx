import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { RootState } from "@src/components/redux/store";
import { getCurricularUnitsCourseUser } from "@src/api/CourseRoutes";
import {
  createMentoring,
  createMentoringRequest,
  getMentoringList,
  getMentoringRequestList,
  stopMentoring,
} from "@src/api/MentoringRoutes";
import { ICurricularUnit } from "@src/interfaces/ICurricularUnit";
import { IMentoring } from "@src/interfaces/IMentoring";
import { IMentoringRequest } from "@src/interfaces/IMentoringRequest";
import routes from "@src/router/Routes";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";


export default function MentoringPage() {

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);


  const [mentoringRequestList, setMentoringRequestList] = useState<
    IMentoringRequest[]
  >([]);
  const [mentoringList, setMentoringList] = useState<IMentoring[]>([]);
  const [curricularUnitList, setCurricularUnitList] = useState<
    ICurricularUnit[]
  >([]);
  const [selectedCurricularUnit, setSelectedCurricularUnit] =
    useState<ICurricularUnit>();

  useEffect(() => {
    document.title = routes.mentoringpage.name;
    getMentoringRequestList()
      .then((response) => {
        setMentoringRequestList(response);
      })
      .catch(() => {
        toast.error(
          "Ocorreu um erro ao aceder aos Pedidos de Mentoria! Por favor tenta novamente!",
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
    getMentoringList()
      .then((response) => {
        setMentoringList(response);
      })
      .catch(() => {
        toast.error(
          "Ocorreu um erro ao aceder às Mentorias! Por favor tenta novamente!",
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
    getCurricularUnitsCourseUser()
      .then((response) => {
        setCurricularUnitList(response);
      })
      .catch(() => {
        toast.error(
          "Ocorreu um erro ao aceder às Unidades Curriculares! Por favor tenta novamente!",
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

  const handleCreateMentoringRequest = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!selectedCurricularUnit) {
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

    const newMentoringRequest: IMentoringRequest = {
      curricularUnit: selectedCurricularUnit,
    };
    createMentoringRequest(newMentoringRequest)
      .then(() => {
        toast.success(
          "Pedido de Mentoria criado com sucesso! Fica a aguardar :))",
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
        getMentoringRequestList().then((response) => {
          setMentoringRequestList(response);
        });
      })
      .catch(() => {
        toast.error(
          "Ocorreu um erro ao criar o pedido de mentoria! Por favor tenta novamente!",
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

  const handleCreateMentoring = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const newMentoring: IMentoring = {
      requestId: event.currentTarget.requestId.value,
    };
    createMentoring(newMentoring)
      .then(() => {
        toast.success("Mentoria aceite com sucesso! :))", {
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
        //TODO: Remove mentoring request from list
        getMentoringList().then((response) => {
          setMentoringList(response);
        });
      })
      .catch(() => {
        toast.error(
          "Ocorreu um erro ao aceitar a mentoria! Por favor tenta novamente!",
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

  const handleSelectCurricularUnit = (event: SelectChangeEvent) => {
    setSelectedCurricularUnit(
      curricularUnitList.filter((c) => c.abbreviation === event.target.value)[0]
    );
  };

  /** corrigir o texto de "AAAA B CCCC" para "Aaaaaa b Ccccc"
   *
   * @param text "AAAA B CCCC"
   * @returns "Aaaaaa b Ccccc"
   */
  function correctText(text: string): string {
    if (/^[^A-Z].*[^a-z]$/.test(text)) {
      //verifica se a primeira letra não é maiúscula e se a última letra é minúscula
      text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(); //converte a primeira letra para maiúscula e a última para minúscula
    }

    return text;
  }

  /** calcular o tempo que já passou
   *
   * @param dateString
   * @returns
   */
  function calculatePastTime(dateString: string): string {
    const currentDate = new Date();
    const dateProvided = new Date(dateString);

    const differenceInMilliseconds =
      currentDate.getTime() - dateProvided.getTime();
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    const differenceInHours =
      Math.floor(differenceInMilliseconds / (1000 * 60 * 60)) % 24;
    const differenceInMinutes =
      Math.floor(differenceInMilliseconds / (1000 * 60)) % 60;

    if (differenceInDays > 7) {
      //se já passou mais de uma semana, retorna a data no formato "dd/mm/aaaa"
      const day = String(dateProvided.getDate()).padStart(2, "0");
      const month = String(dateProvided.getMonth() + 1).padStart(2, "0"); //os meses são baseados em zero
      const year = dateProvided.getFullYear();

      return `${day}/${month}/${year}`;
    } //caso contrário, retorna quanto tempo passou em relação à data atual
    else {
      if (differenceInDays > 0) {
        return `${differenceInDays} dia(s) atrás`;
      } else if (differenceInHours > 0) {
        return `${differenceInHours} hora(s) atrás`;
      } else {
        return `${differenceInMinutes} minuto(s) atrás`;
      }
    }
  }

  const handleStopMentoring = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = event.currentTarget.mentoringId.value;
    stopMentoring(id).then(() => {
      toast.success("Mentoria terminada com sucesso! :))", {
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
      //! Delete the mentoring from the list
      const filteredMentoringList = mentoringList.filter((mentoring) => mentoring.id !== parseInt(id));
      setMentoringList(filteredMentoringList);
    }).catch(() => {
      toast.error(
        "Ocorreu um erro ao terminar a mentoria! Por favor tenta novamente!",
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
    })
  }


  const discordImg = "https://img.icons8.com/ios-glyphs/24/636F80/discord.png";
  const mailImg = "https://img.icons8.com/ios-glyphs/24/636F80/secured-letter--v1.png";

  /** verifica se tanto o mentor como o mentorado têm discord
   * 
   * @param mentoring 
   * @returns true caso os dois tenham discord, caso contrario, false
   */
  function checkMentorMenteeHaveDiscord(mentoring: IMentoring): boolean {

    if (mentoring.mentee?.profilemodel?.discord == null || mentoring.mentor?.profilemodel?.discord == null) {
      return false;
    }

    return true;
  }

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

      <Container maxWidth="xl" sx={{ marginBottom: "60px" }}>
        {darkMode ? (
          <Alert variant="filled" severity="info" sx={{ marginTop: "30px", marginBottom: "30px", color: "#FFFFFF" }}>
            A tua privacidade é uma prioridade. Por isso, não vais saber quem é a
            outra pessoa até aceitares a mentoria. Depois, terão de combinar como
            falar, usando Discord, Teams, ou o que preferirem, para realizar a
            mentoria. É simples e seguro, garantindo que escolhes com quem queres
            partilhar informações.
          </Alert>
        ) : (
          <Alert severity="info" sx={{ marginTop: "30px", marginBottom: "30px" }}>
            A tua privacidade é uma prioridade. Por isso, não vais saber quem é a
            outra pessoa até aceitares a mentoria. Depois, terão de combinar como
            falar, usando Discord, Teams, ou o que preferirem, para realizar a
            mentoria. É simples e seguro, garantindo que escolhes com quem queres
            partilhar informações.
          </Alert>
        )}


        <Typography
          variant="h4"
          sx={{
            color: darkMode ? "#FFFFFF" : "#1E2022",
            display: "flex",
            fontWeight: 700,
            flexDirection: "column",
            alignItems: "center",
            marginTop: "30px",
            marginBottom: "0px",
          }}
        >
          Criar Pedido de Mentoria
        </Typography>

        <Box
          component="form"
          onSubmit={handleCreateMentoringRequest}
          sx={{ width: "300px", margin: "auto" }} // Adiciona margin auto para centralizar horizontalmente
        >
          <FormControl fullWidth sx={{ mt: 2, textAlign: "center" }}>
            {" "}
            {/* Adiciona textAlign center para centralizar o FormControl */}
            <InputLabel id="curricular-unit-label" variant="filled">
              Unidade Curricular
            </InputLabel>
            <Select
              labelId="curricular-unit-label"
              id="curricularUnit"
              label="Unidade Curricular"
              value={selectedCurricularUnit?.abbreviation}
              variant="filled"
              onChange={handleSelectCurricularUnit}
            >
              {curricularUnitList.map((unit) => (
                <MenuItem key={unit.abbreviation} value={unit.abbreviation}>
                  {unit.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#054496",
              color: "#FFFFFF",
              borderRadius: "100px",
              marginTop: "10px",
            }}
            type="submit"
          >
            <AddIcon sx={{ marginRight: "5px" }} /> Criar
          </Button>
        </Box>

        {/* Lista de Pedidos de Mentoria */}
        <Typography
          variant="h4"
          sx={{
            color: darkMode ? "#FFFFFF" : "#1E2022",
            display: "flex",
            fontWeight: 700,
            flexDirection: "column",
            alignItems: "center",
            marginTop: "50px",
            marginBottom: "15px",
          }}
        >
          Lista de Pedidos de Mentoria
        </Typography>

        {mentoringRequestList.length === 0 ? (
          <Typography
            variant="h5"
            color={darkMode ? "#FFFFFF" : "#1E2022"}
            fontWeight="700"
            align="center"
          >
            Não há Pedidos de Mentoria no momento.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {mentoringRequestList.map((mentoringRequest) => (
              <Box
                key={mentoringRequest.id} // Adiciona a chave de identificação
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  flexDirection: "column", // Para colocar os elementos um em cima do outro
                  boxShadow: darkMode ? "0px 0px 10px rgba(255, 255, 255, 0.1)" : "0px 0px 10px rgba(0, 0, 0, 0.1)", // Adiciona uma sombra
                  padding: "20px", // Adiciona preenchimento para destacar a sombra
                  borderRadius: "8px", // Adiciona bordas arredondadas para um visual mais suave
                  width: "300px",
                }}
                component="form"
                onSubmit={handleCreateMentoring} // Passa o evento e o ID do pedido de mentoria
              >
                <TextField
                  name="requestId"
                  variant="filled"
                  value={mentoringRequest.id}
                  sx={{ display: "none" }}
                />
                <Typography
                  variant="subtitle1"
                  align="center"
                  gutterBottom
                  sx={{ marginBottom: "20px", color: darkMode ? "#FFFFFF" : "#191919" }}
                >
                  <MenuBookIcon
                    sx={{
                      marginRight: "5px",
                      color: "#636F80",
                      marginBottom: "-5px",
                    }}
                  />
                  {correctText(mentoringRequest.curricularUnit.name)}
                </Typography>

                <Typography variant="subtitle1" align="center" gutterBottom sx={{ color: darkMode ? "#FFFFFF" : "#191919" }}>
                  <AccessTimeFilledIcon
                    sx={{
                      marginRight: "5px",
                      color: "#636F80",
                      marginBottom: "-5px",
                    }}
                  />
                  {calculatePastTime(mentoringRequest.date)}
                </Typography>

                {mentoringRequest.mentee != null ? (
                  <Button
                    variant="contained"
                    sx={{ mt: 2, borderRadius: "100px", '&.Mui-disabled': { backgroundColor: "#E0E0E0" } }}
                    disabled
                  >
                    <CheckIcon sx={{ marginRight: "5px" }} /> Teu Pedido
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{ mt: 2, borderRadius: "100px" }}
                    type="submit"
                    color="success"
                  >
                    <CheckIcon sx={{ marginRight: "5px" }} /> Aceitar
                  </Button>
                )}
              </Box>
            ))}
          </Box>
        )}

        {/* Lista de Mentorias */}
        <Typography
          variant="h4"
          sx={{
            color: darkMode ? "#FFFFFF" : "#1E2022",
            display: "flex",
            fontWeight: 700,
            flexDirection: "column",
            alignItems: "center",
            marginTop: "60px",
            marginBottom: "15px",
          }}
        >
          Lista de Mentorias
        </Typography>

        {mentoringList.length === 0 ? (
          <Typography
            variant="h5"
            color={darkMode ? "#FFFFFF" : "#1E2022"}
            fontWeight="700"
            align="center"
          >
            Não há Mentorias no momento.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {mentoringList.map((mentoring) => (
              //TODO: DARK CARD
              <Box
                component="form"
                onSubmit={handleStopMentoring}
                key={mentoring.id} // Adiciona a chave de identificação
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  flexDirection: "column",
                  width: "300px",
                  boxShadow: darkMode ? "0px 0px 10px rgba(255, 255, 255, 0.1)" : "0px 0px 10px rgba(0, 0, 0, 0.1)", // Adiciona uma sombra
                  padding: "20px", // Adiciona preenchimento para destacar a sombra
                  borderRadius: "8px", // Adiciona bordas arredondadas para um visual mais suave
                }}
              >
                <TextField
                  name="mentoringId"
                  variant="filled"
                  value={mentoring.id}
                  sx={{ display: "none" }}
                />
                <Typography
                  variant="subtitle1"
                  align="center"
                  gutterBottom
                  sx={{ marginBottom: "20px", color: darkMode ? "#FFFFFF" : "#191919" }}
                >
                  <MenuBookIcon
                    sx={{
                      marginRight: "5px",
                      color: "#636F80",
                      marginBottom: "-5px",
                    }}
                  />
                  {correctText(mentoring.curricularUnit?.name)}
                </Typography>

                {checkMentorMenteeHaveDiscord(mentoring) === true ? (
                  <>
                    <Typography variant="subtitle1" align="center" gutterBottom>
                      <img
                        src={discordImg}
                        alt="discord"
                        style={{ marginRight: "5px", marginBottom: "-5px", color: darkMode ? "#FFFFFF" : "#191919" }}
                      />
                      {mentoring.mentee?.profilemodel?.discord}
                      (mentorado)
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      align="center"
                      gutterBottom
                      sx={{ marginBottom: "20px", color: darkMode ? "#FFFFFF" : "#191919" }}
                    >
                      <img
                        src={discordImg}
                        alt="discord"
                        style={{ marginRight: "5px", marginBottom: "-5px" }}
                      />
                      {mentoring.mentor?.profilemodel?.discord}
                      (mentor)
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="subtitle1" align="center" gutterBottom sx={{ color: darkMode ? "#FFFFFF" : "#191919" }}>
                      <img
                        src={mailImg}
                        alt="mail"
                        style={{ marginRight: "5px", marginBottom: "-5px" }}
                      />
                      {mentoring.mentee?.email} (mentorado)
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      align="center"
                      gutterBottom
                      sx={{ marginBottom: "20px", color: darkMode ? "#FFFFFF" : "#191919" }}
                    >
                      <img
                        src={mailImg}
                        alt="mail"
                        style={{ marginRight: "5px", marginBottom: "-5px" }}
                      />
                      {mentoring.mentor?.email} (mentor)
                    </Typography>
                  </>
                )}


                <Typography variant="subtitle1" align="center" gutterBottom sx={{ color: darkMode ? "#FFFFFF" : "#191919" }}>
                  <AccessTimeFilledIcon
                    sx={{
                      marginRight: "5px",
                      color: "#636F80",
                      marginBottom: "-5px",
                    }}
                  />
                  {calculatePastTime(mentoring.date)}
                </Typography>

                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    mt: 2,
                    borderRadius: "100px",
                    backgroundColor: "#054496",
                  }}
                >
                  <DoneAllIcon sx={{ marginRight: "5px", color: "#FFFFFF" }} /> Terminar
                </Button>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}
