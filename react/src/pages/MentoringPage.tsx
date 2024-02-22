import { createMentoring, createMentoringRequest, getMentoringList, getMentoringRequestList } from "@src/api/MentoringRoutes"
import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
import { IMentoringRequest } from "@src/interfaces/IMentoringRequest";
import { IMentoring } from "@src/interfaces/IMentoring";
import { Button } from "@mui/material";
import { ICurricularUnit } from "@src/interfaces/ICurricularUnit";
import { getCurricularUnits } from "@src/api/CourseRoutes";
import { ICourse } from "@src/interfaces/ICourse";

export default function MentoringPage() {
  const [mentoringRequestList, setMentoringRequestList] = useState<IMentoringRequest[]>([]);
  const [mentoringList, setMentoringList] = useState<IMentoring[]>([]);
  const [curricularUnitList, setCurricularUnitList] = useState<ICurricularUnit[]>([]);

  useEffect(() => {
    document.title = "Mentoring - NEI"
    //TODO: Implement Pagination
    getMentoringRequestList().then((response) => {
      setMentoringRequestList(response.results)
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
      setMentoringList(response.results)
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
      setCurricularUnitList(response.results)
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

  const handleCreateMentoringRequest = () => {
    const newMentoringRequest: IMentoringRequest = {
      curricularUnit: {
        id: 1,
        name: "MÉTODOS E TÉCNICAS DE SUPORTE AO DESENVOLVIMENTO DE SOFTWARE",
        abbreviation: "MTSDS",
        year: 1,
        course: [
          {
            id: 1,
            name: "Mestrado em Engenharia Informática",
            abbreviation: "MEI",
          } as ICourse
        ]
      },
      mentee: {
        id: 1,
        username: "joaop",
      }
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

  const handleCreateMentoring = () => {
    const newMentoring: IMentoring = {
      curricularUnit: {
        abbreviation: "ISC",
      },
      mentor: {
        username: "joaop",
      },
      mentee: {
        username: "joaop",
      }
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
  
  return (
    <div>
      <h1>Mentoring (ainda nao funciona)</h1>
      <p>Mentoring Request List</p>
      <p>{JSON.stringify(mentoringRequestList)}</p>
      <p>Mentoring List</p>
      <p>{JSON.stringify(mentoringList)}</p>
      <Button onClick={handleCreateMentoringRequest}>Test Button For Mentoring Request</Button>
      <Button onClick={handleCreateMentoring}>Test Button For Mentoring</Button>
    </div>
  )
}