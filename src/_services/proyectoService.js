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

//servicio crear proyectos
proyectoService.createProyectos = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    titulo: data.titulo,
    descripcion: data.descripcion,
  };
  return (
    await axios.post(
      global.BASE_URL + `/proyectos/create-proyecto`,
      body,
      config
    )
  ).data;
};



export default proyectoService;
