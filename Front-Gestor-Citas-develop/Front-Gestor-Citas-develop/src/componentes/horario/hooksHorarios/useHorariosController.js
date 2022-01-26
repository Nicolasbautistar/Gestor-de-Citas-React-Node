import { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import odontologoAxios from "../../../config/axios";
import { CRMContext } from "../../../context/CRMContext";

export function useHorariosController() {
  const { push } = useHistory()
  const [horarios, guardarHorarios] = useState([]);
  const [auth] = useContext(CRMContext);

  useEffect(() => {
    if (auth.token !== "") {
      const consultarAPI = async () => {
        try {
          const horariosConsulta = await odontologoAxios.get(
            "/api/horario",
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          );
          console.log(horariosConsulta.data)
          guardarHorarios(horariosConsulta.data["horario"]);
        } catch (error) {
          console.log("Error",error)
          if ((error.response.status = 500)) {
            push("/iniciar-sesion");
          }
        }
      };
      consultarAPI();
    } else {
      push("/iniciar-sesion");
    }
  }, []);

  if (!auth.auth) {
    push("/iniciar-sesion");
  }

  return { horarios }
}

