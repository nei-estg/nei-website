import { createMentoring, createMentoringRequest, getMentoringList, getMentoringRequestList } from "@src/api/MentoringRoutes"
import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
import { IMentoringRequest } from "@src/interfaces/IMentoringRequest";
import { IMentoring } from "@src/interfaces/IMentoring";
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, ThemeProvider, createTheme } from "@mui/material";
import { ICurricularUnit } from "@src/interfaces/ICurricularUnit";
import { getCurricularUnits } from "@src/api/CourseRoutes";

const defaultTheme = createTheme();

export default function MentoringPage() {
  const [mentoringRequestList, setMentoringRequestList] = useState<IMentoringRequest[]>([]);
  const [mentoringList, setMentoringList] = useState<IMentoring[]>([]);
  const [curricularUnitList, setCurricularUnitList] = useState<ICurricularUnit[]>([]);
  const [selectedCurricularUnit, setSelectedCurricularUnit] = useState<ICurricularUnit>();

  useEffect(() => {
    document.title = "Mentoring - NEI"
    getMentoringRequestList().then((response) => {
      setMentoringRequestList(response)
    }).catch(() => {
      toast.error("Ocorreu um erro ao aceder aos Pedidos de Mentoria! Por favor tenta novamente!", {
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
    getMentoringList().then((response) => {
      setMentoringList(response)
    }).catch(() => {
      toast.error("Ocorreu um erro ao aceder às Mentorias! Por favor tenta novamente!", {
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
    getCurricularUnits().then((response) => {
      setCurricularUnitList(response)
    }).catch(() => {
      toast.error("Ocorreu um erro ao aceder às Unidades Curriculares! Por favor tenta novamente!", {
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
    })
  }, []);

  const handleCreateMentoringRequest = (event: React.FormEvent<HTMLFormElement>) => {
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
      curricularUnit: selectedCurricularUnit
    }
    createMentoringRequest(newMentoringRequest).then(() => {
      toast.success("Pedido de Mentoria criado com sucesso! Fica a aguardar :))", {
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
      setMentoringRequestList([...mentoringRequestList, newMentoringRequest]);
    }).catch(() => {
      toast.error("Ocorreu um erro ao criar o pedido de mentoria! Por favor tenta novamente!", {
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

  const handleCreateMentoring = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newMentoring: IMentoring = {
      requestId: event.currentTarget.requestId.value
    }
    createMentoring(newMentoring).then(() => {
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
        setMentoringList(response)
      })
    }).catch(() => {
      toast.error("Ocorreu um erro ao aceitar a mentoria! Por favor tenta novamente!", {
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

  const handleSelectCurricularUnit = (event: SelectChangeEvent) => {
    setSelectedCurricularUnit(
      curricularUnitList.filter((c) => c.abbreviation === event.target.value)[0]
    );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="xl" sx={{ marginBottom: "60px" }}>
        <h1>Mentoria</h1>
        <h4>Lista de Pedidos de Mentoria</h4>
        {mentoringRequestList.map((mentoringRequest) => (
          <Box
            component="form"
            onSubmit={handleCreateMentoring}
          >
            <TextField
              name="requestId"
              value={mentoringRequest.id}
              sx={{ display: "none" }}
            />
            <p>Pedido - {mentoringRequest.curricularUnit.abbreviation}</p>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              type="submit"
            >
              Aceitar Mentoria
            </Button>
          </Box>
        ))}
        <h4>Lista de Mentorias</h4>
        {mentoringList.map((mentoring) => (
          <p key={mentoring.id}>{mentoring.curricularUnit?.abbreviation} - {mentoring.mentor?.username} - {mentoring.mentee?.username}</p>
        ))}
        <h4>Criar Pedido de Mentoria</h4>
        <Box
          component="form"
          onSubmit={handleCreateMentoringRequest}
        >
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="curricular-unit-label">
              Curricular Unit
            </InputLabel>
            <Select
              labelId="curricular-unit-label"
              id="curricularUnit"
              label="Curricular Unit"
              value={selectedCurricularUnit?.abbreviation}
              onChange={handleSelectCurricularUnit}
            >
              {curricularUnitList.map((unit) => (
                <MenuItem
                  key={unit.abbreviation}
                  value={unit.abbreviation}
                >
                  {unit.abbreviation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            type="submit"
          >
            Criar Pedido de Mentoria
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  )
}