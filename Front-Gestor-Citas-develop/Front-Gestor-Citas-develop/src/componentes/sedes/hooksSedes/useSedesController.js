import { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import odontologoAxios from "../../../config/axios";
import { CRMContext } from "../../../context/CRMContext";

export function useSedesController() {
  const { push } = useHistory()
  const [sedes, guardarSedes] = useState([]);
  const [auth] = useContext(CRMContext);

  useEffect(() => {
    if (auth.token !== "") {
      const consultarAPI = async () => {
        try {
          const sedesConsulta = await odontologoAxios.get(
            "/api/sede",
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          );
          guardarSedes(sedesConsulta.data["sedes"]);
        } catch (error) {
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

  return { sedes }
}

