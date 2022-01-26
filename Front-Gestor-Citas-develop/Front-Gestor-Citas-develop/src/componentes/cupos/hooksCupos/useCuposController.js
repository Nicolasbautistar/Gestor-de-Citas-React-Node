import { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import odontologoAxios from "../../../config/axios";
import { CRMContext } from "../../../context/CRMContext";

export function useCuposController() {
  const { push } = useHistory()
  const [cupos, guardarCupos] = useState([]);
  const [auth] = useContext(CRMContext);

  useEffect(() => {
    if (auth.token !== "") {
      const consultarAPI = async () => {
        try {
          const cuposConsulta = await odontologoAxios.get(
            "/api/cupo",
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          );
          guardarCupos(cuposConsulta.data["cupos"]);
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

  return { cupos }
}

