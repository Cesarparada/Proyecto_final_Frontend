import React from "react";
import "./ListaTarea.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import listaService from "../../_services/listaService";
import { DataListTable } from "../../components";

export default function ListaTarea() {
  //hooks
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isCreador = authState.userInfo.role == "user";
  const isLoggedIn = authState.isLoggedIn;
  const [listas, setListas] = useState([]);

  useEffect(() => {
    if (isLoggedIn && isCreador) {
      getListaTarea(authState.userToken);
    } else {
      navigate("");
    }
  }, []);

  const handleListas = (e) => {
    const { dataId } = e.currentTarget.dataset;
    console.log(dataId);
  };

  const getListaTarea = async (token) => {
    try {
      const response = await listaService.getListaTarea(token);
      const newListaTarea = response.tarea.map((listaTarea) => {
        return listaTarea;
      });
      setListas(newListaTarea);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>ListaTarea</div>
      <DataListTable
        data={listas}
        title="Tu Lista de Tareas"
        headers={["Id Lista", "Titulo", "Descripcion", "Tarea"]}
        attributes={["id", "titulo", "descripcion", "tarea"]}
        onChange={handleListas}
      />
    </>
  );
}
