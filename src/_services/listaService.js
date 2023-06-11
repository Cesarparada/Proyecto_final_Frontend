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
        
        titulo: data.titulo,
        descripcion: data.descripcion,
        tarea: data.tarea,

    };
    return (await axios.post(global.BASE_URL + `/tareas/crate-tarea/${idProyecto}`, body, config)).data
};

// servicio modificar Lista de Tareas
listaService.updateListaTarea = async (token, data, idLista) =>{
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },   
};
const body = {
        
    titulo: data.titulo,
    descripcion: data.descripcion,
    tarea: data.tarea,

};
return (await axios.put(global.BASE_URL + `/tareas/update-tareas/${idLista}`, body, config)).data
};
export default listaService;
