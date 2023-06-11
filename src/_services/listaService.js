import axios from "axios";
import { global } from "../_global.js/global";

const listaService = {};

//servicio para ver la lista de tareas

listaService.getListaTarea = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (await axios.get(global.BASE_URL + `/tareas/tarea`, config)).data;
};

export default listaService;
