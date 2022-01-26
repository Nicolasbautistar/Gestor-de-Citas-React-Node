import { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import odontologoAxios from "../../../config/axios";
import { CRMContext } from "../../../context/CRMContext";

export function useOdontologosController() {
  const { push } = useHistory()
  const [odontologos, guardarOdontologos] = useState([]);
  const [auth] = useContext(CRMContext);

  useEffect(() => {
    if (auth.token !== "") {
      const consultarAPI = async () => {
        try {
          const odontologosConsulta = await odontologoAxios.get(
            "/api/odontologo",
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          );
          guardarOdontologos(odontologosConsulta.data["odontologos"]);
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

  return { odontologos }
}

