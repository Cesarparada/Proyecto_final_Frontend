import axios from "axios";
import { global } from "../_global.js/global";

//servicio para ver los proyectos

const proyectoService = {};

proyectoService.getProyectos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (await axios.get(global.BASE_URL + `/proyectos/proyecto`, config))
    .data;
};


export default proyectoService;

