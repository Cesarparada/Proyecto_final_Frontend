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

//servicio para crear lista de tareas

listaService.createListaTarea = async (token, data, idProyecto) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const body = {
        id_contacto: data.contacto,
        titulo: data.titulo,
        descripcion: data.descripcion,

    };
    return (await axios.post(global.BASE_URL + `/tareas/crate-tarea/${idProyecto}`, body, config)).data
};

export default listaService;
