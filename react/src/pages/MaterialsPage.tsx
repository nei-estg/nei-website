import {
  Button,
  Modal,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid, GridColDef} from "@mui/x-data-grid";
import { getCurricularUnits } from "@src/api/CourseRoutes";
import { createMaterial, getMaterialTagList, getMaterialsList } from "@src/api/MaterialsRoutes";
import { ICourse } from "@src/interfaces/ICourse";
import { ICurricularUnit } from "@src/interfaces/ICurricularUnit";
import { IMaterial } from "@src/interfaces/IMaterial";
import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";

const defaultTheme = createTheme();

export default function MaterialsPage() {
  const [materialsList, setMaterialsList] = useState<IMaterial[]>([]);
  const [curricularUnits, setCurricularUnits] = useState<ICurricularUnit[]>([]);
  const [materialTagList, setMaterialTagList] = useState<IMaterial[]>([]);
  
  const [openCreateMaterialModal, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleCloseCreateMaterialModal = () => setOpen(false);

  const handleCreateMaterialModal = async () => {
    const file = new File(["your_base64_encoded_data"], "filename.txt", { type: "text/plain" });
    const newMaterial: IMaterial = {
      name: "Material de Exemplo",
      link: "https://www.google.com",
      tags: materialTagList,
      file: btoa(await file.text()),
      curricularUnit: curricularUnits.filter((curricularUnit) => curricularUnit.abbreviation === "ISC")[0],
    }

      createMaterial(newMaterial).then(() => {
        toast.success("Material adicionado com sucesso! Após aprovado o mesmo ficará visível! :)", {
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
        handleCloseCreateMaterialModal();
      }).catch(() => {
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
    }

  useEffect(() => {
    document.title = "Materials - NEI";
    getMaterialsList().then((response) => {
      setMaterialsList(response);
    }).catch(() => {
      toast.error("Ocorreu um erro ao aceder aos Materiais! Por favor tenta novamente!", {
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
      setCurricularUnits(response);
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
    });

    getMaterialTagList().then((response) => {
      setMaterialTagList(response);
    }).catch(() => {
      toast.error("Ocorreu um erro ao aceder às Tags de Materiais! Por favor tenta novamente!", {
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
  }, []);

  const columns: GridColDef[] = [
    {
      field: "course",
      headerName: "Course",
      width: 200,
      valueGetter: (params) => {
        return params.row.curricularUnit.course.map((course: ICourse) => course.abbreviation).join(", ");
      },
    },
    {
      field: "curricularUnit",
      headerName: "Curricular Unit",
      width: 200,
      valueGetter: (params) => {
        return params.row.curricularUnit.abbreviation;
      },
    },
    {
      field: "year",
      headerName: "Year",
      width: 200,
      valueGetter: (params) => {
        return params.row.curricularUnit.year;
      }
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 200,
      valueGetter: (params) => {
        return params.row.tags.map((tag: IMaterial) => tag.name).join(", ");
      }
    },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "link",
      headerName: "Link",
      width: 150,
      valueGetter: (params) => {
        return params.row.link ? "✅" : "❌";
      }
    },
    {
      field: "file",
      headerName: "File",
      width: 150,
      valueGetter: (params) => {
        return params.row.file ? "✅" : "❌";
      }
    },
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="xl" sx={{ marginBottom: '60px' }}>

      <Typography variant="h4"
          sx={{
            color: '#1E2022',
            display: 'flex',
            fontWeight: 700,
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '30px',
            marginBottom: '15px',
          }}
        >Materiais de Unidades Curriculares</Typography>

      <Modal open={openCreateMaterialModal} onClose={handleCloseCreateMaterialModal}>
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
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Adicionar Material
          </Typography>
          <InputLabel id="curricular-unit-label">Curricular Unit</InputLabel>
          <Select
            labelId="curricular-unit-label"
            id="curricular-unit"
            label="Curricular Unit"
          >
            {curricularUnits.map((unit) => (
              <MenuItem value={unit.abbreviation} key={unit.id}>
                {unit.abbreviation}
              </MenuItem>
            ))}
          </Select>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="link"
            label="Link (optional)"
            name="link"
            autoComplete="link"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="file"
            label="File (optional)"
            name="file"
            autoComplete="file"
            type="file"
          />
          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Adicionar
          </Button>
        </Box>
      </Modal>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={materialsList}
          columns={columns}
          pageSizeOptions={[20, 100]}
          onRowDoubleClick={(row) => {
            console.log(row.row);
            if (row.row.file !== null) {
              window.open(row.row.file);
            }
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