import axios from "axios";
import { global } from "../_global.js/global";


const userService = {};

userService.getAllUsers = async (token, page = 1) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (await axios.get(global.BASE_URL + `/usuarios?page=${page}`, config))
    .data;
};

userService.getProfile = async (token) =>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (await axios.get(global.BASE_URL + `/usuarios/get-profile`, config))
    .data;
}


userService.updateProfile = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    nombre: data.nombre,
    apellidos: data.apellidos,
    fecha_de_nacimiento: data.fecha_de_nacimiento,
    password: data.password,
  };

  return (await axios.put(global.BASE_URL + `/usuarios/update-profile`, body, config)).data;
};

export default userService;
