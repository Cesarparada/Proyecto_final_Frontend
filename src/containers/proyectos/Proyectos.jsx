import React from "react";
import "./Proyectos.scss";
import { CardProyecto } from "../../components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import proyectoService from "../../_services/proyectoService";
import { DataListTable } from "../../components";

export default function Proyectos() {
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isUsuario = authState.userInfo.role == "user";
  const isLoggedIn = authState.isLoggedIn;
  const [proyecto, setProyecto] = useState([]);

  useEffect(() => {
    getProyectos(authState.userToken);
  }, []);

  const handleProyectos = (e) => {
    const { dataId } = e.currentTarget.dataset;
    console.log(dataId);
  };

  //funcion que llama al servicio citas paciente
  const getProyectos = async (token) => {
    try {
      const response = await proyectoService.getProyectos(token);
      const newProyecto = response.proyecto.map((proyecto) => {
        proyecto.id_proyecto = proyecto.Proyecto.id;
        proyecto.title = proyecto.Proyecto.titulo;
        proyecto.description = proyecto.Proyecto.descripcion;
        return proyecto;
      });

      setProyecto(newProyecto);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Proyectos
      <div>
      

        <DataListTable
          data={proyecto}
          title="Tus proyectos"
          headers={["Id Proyecto", "Titulo", "Descripción"]}
          attributes={["id_proyecto", "title", "description"]}
          onChange={handleProyectos}
        />
      </div>
    </div>
  );
}
