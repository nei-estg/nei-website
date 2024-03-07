import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getCourses } from "@src/api/CourseRoutes";
import {
  createMaterial,
  getMaterialTagList,
  getMaterialsList,
} from "@src/api/MaterialsRoutes";
import { isLoggedIn } from "@src/api/utils/LoginStatus";
import { ICourse } from "@src/interfaces/ICourse";
import { ICurricularUnit } from "@src/interfaces/ICurricularUnit";
import { IMaterial } from "@src/interfaces/IMaterial";
import { IMaterialTag } from "@src/interfaces/IMaterialTag";
import routes from "@src/router/Routes";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

const defaultTheme = createTheme();

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

export default function MaterialsPage() {
  const [materialsList, setMaterialsList] = useState<IMaterial[]>([]);
  const [curricularUnits, setCurricularUnits] = useState<ICurricularUnit[]>([]);
  const [coursesData, setCoursesData] = useState<ICourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<ICourse>();
  const [selectedCurricularUnit, setSelectedCurricularUnit] = useState(
    {} as ICurricularUnit
  );
  const [materialTagList, setMaterialTagList] = useState<IMaterialTag[]>([]);
  const [selectedMaterialTag, setSelectedMaterialTag] = useState<string[]>([]);

  const [openCreateMaterialModal, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleCloseCreateMaterialModal = () => setOpen(false);

  const handleCreateMaterialModal = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    //check if course and curricular unit was selected
    if (!selectedCourse || !selectedCurricularUnit) {
      toast.error("Por favor selecione um Curso e uma Unidade Curricular!", {
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

    //check if material tag was selected
    if (selectedMaterialTag.length === 0) {
      toast.error("Por favor selecione pelo menos uma Tag para o Material!", {
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

    const newMaterial: IMaterial = {
      name: event.currentTarget.fileName.value,
      link: event.currentTarget.link.value,
      tags: materialTagList.filter((tag) =>
        selectedMaterialTag.includes(tag.name)
      ),
      curricularUnit: selectedCurricularUnit,
    };

    createMaterial(newMaterial)
      .then((result) => {
        toast.success(
          "Material adicionado com sucesso! Após aprovado o mesmo ficará visível para todos! :)",
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
        handleCloseCreateMaterialModal();
        setMaterialsList([...materialsList, result]);
      })
      .catch(() => {
        toast.error("Ocorreu um erro ao tentar criar o material :(", {
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
  };

  useEffect(() => {
    document.title = routes.materialspage.name;
    getMaterialsList()
      .then((response) => {
        setMaterialsList(response);
      })
      .catch(() => {
        toast.error(
          "Ocorreu um erro ao aceder aos Materiais! Por favor tenta novamente!",
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

    getMaterialTagList()
      .then((response) => {
        setMaterialTagList(response);
      })
      .catch(() => {
        toast.error(
          "Ocorreu um erro ao aceder às Tags de Materiais! Por favor tenta novamente!",
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

  const columns: GridColDef[] = [
    {
      field: "course",
      headerName: "Curso",
      width: 200,
      valueGetter: (params) => {
        return params.row.curricularUnit.course
          .map((course: ICourse) => course.abbreviation)
          .join(", ");
      },
    },
    {
      field: "curricularUnit",
      headerName: "Unidade Curricular",
      width: 200,
      valueGetter: (params) => {
        return params.row.curricularUnit.abbreviation;
      },
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 200,
      valueGetter: (params) => {
        return params.row.tags.map((tag: IMaterial) => tag.name).join(", ");
      },
    },
    { field: "name", headerName: "Nome", width: 200 },
    {
      field: "link",
      headerName: "Link",
      width: 150,
      valueGetter: (params) => {
        return params.row.link;
      },
    }
  ];

  const handleSelectCourse = (event: SelectChangeEvent) => {
    setSelectedCourse(
      coursesData.filter((c) => c.abbreviation === event.target.value)[0]
    );
    setCurricularUnits(
      coursesData.filter((c) => c.abbreviation === event.target.value)[0]
        .curricularUnits
    );
  };

  const handleSelectCurricularUnit = (event: SelectChangeEvent) => {
    setSelectedCurricularUnit(
      curricularUnits.filter((c) => c.abbreviation === event.target.value)[0]
    );
  };

  const handleChangeMaterialTag = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setSelectedMaterialTag(
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="xl" sx={{ marginBottom: "60px" }}>
        <Alert severity="info" sx={{ marginTop: "30px", marginBottom: "30px" }}>
          Podes ver materiais adicionados pela comunidade e verificados pelo
          NEI. E tu, com a tua sessão iniciada, podes adicionar também.
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
          Materiais de Unidades Curriculares
        </Typography>

        <Modal
          open={openCreateMaterialModal}
          onClose={handleCloseCreateMaterialModal}
        >
          <Box
            component="form"
            onSubmit={handleCreateMaterialModal}
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
            <h1>Adicionar Material</h1>
            {!isLoggedIn() ? (
              <h2>Para adicionar um material é necessário iniciar sessão!</h2>
            ) : (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fileName"
                  label="Name"
                  name="fileName"
                  autoComplete="fileName"
                  autoFocus
                />
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="course-label">Curso</InputLabel>
                  <Select
                    labelId="course-label"
                    id="course"
                    label="Curso"
                    value={selectedCourse?.abbreviation ?? ""}
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
                    disabled={!selectedCourse}
                  >
                    {selectedCourse?.curricularUnits?.map((unit) => (
                      <MenuItem
                        key={unit.abbreviation}
                        value={unit.abbreviation}
                      >
                        {unit.abbreviation}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="material-tags-label">
                    Material Tags
                  </InputLabel>
                  <Select
                    labelId="material-tags-label"
                    id="material-tags"
                    multiple
                    required
                    value={selectedMaterialTag} //? Ignore this error
                    onChange={handleChangeMaterialTag}
                    input={<OutlinedInput label="Material Tag" />}
                    renderValue={(selected) => selected + " "}
                    MenuProps={MenuProps}
                  >
                    {materialTagList.map((materialTag) => (
                      <MenuItem key={materialTag.name} value={materialTag.name}>
                        <Checkbox
                          checked={
                            selectedMaterialTag.indexOf(
                              String(materialTag.name)
                            ) > -1
                          }
                        />
                        <ListItemText primary={materialTag.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  margin="normal"
                  fullWidth
                  id="link"
                  label="Link"
                  name="link"
                  type="url"
                  autoComplete="link"
                  required
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Adicionar
                </Button>
              </>
            )}
          </Box>
        </Modal>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={materialsList}
            columns={columns}
            pageSizeOptions={[20, 100]}
            onRowDoubleClick={(row) => {
              if (row.row.link !== null) {
                window.open(row.row.link);
              }
            }}
          />
        </div>
        <Button onClick={handleOpen}>Adicionar Material</Button>
      </Container>
    </ThemeProvider>
  );
}
