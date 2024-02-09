import { Button } from "@mui/material";
import { getCurricularUnits } from "@src/api/CourseRoutes";
import { createMaterial, getMaterialTagList, getMaterialsList } from "@src/api/MaterialsRoutes";
import { ICurricularUnit } from "@src/interfaces/ICurricularUnit";
import { IMaterial } from "@src/interfaces/IMaterial";
import { useEffect, useState } from "react"
import { toast, Bounce } from "react-toastify";


export default function MaterialsPage() {
  const [materialsList, setMaterialsList] = useState<IMaterial[]>([]);
  const [curricularUnits, setCurricularUnits] = useState<ICurricularUnit[]>([]);
  const [materialTagList, setMaterialTagList] = useState<IMaterial[]>([]);

  useEffect(() => {
    document.title = "Materials - NEI"
    getMaterialsList().then((response) => {
      setMaterialsList(response)
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
      setCurricularUnits(response)
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
      setMaterialTagList(response)
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
  }, [])

  const handleCreateMaterial = () => {
    const newMaterial: IMaterial = {
      name: "Material de Exemplo",
      link: "https://www.google.com",
      tags: materialTagList,
      curricularUnit: curricularUnits[0]
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

  return (
    <>
      <h1>MaterialsPage</h1>
      <p>{JSON.stringify(materialsList)}</p>
      <Button onClick={handleCreateMaterial}>Adicionar Material</Button>
    </>
  )
}