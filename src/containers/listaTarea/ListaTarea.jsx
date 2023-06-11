import React from "react";
import "./ListaTarea.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import listaService from "../../_services/listaService";
import { DataListTable } from "../../components";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";

export default function ListaTarea() {
  //hooks
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isCreador = authState.userInfo.role == "user";
  const isLoggedIn = authState.isLoggedIn;
  const [listas, setListas] = useState([]);
  const [idProyecto, setIdProyecto] = useState();
  const [formValues, setFormValues] = useState({});
  const [formCreateTareas, setCreateTareas] = useState(false);
  const [formUpdateTareas, setFormUpdateTareas] = useState(false);
  const [formDeleteTareas, setFormDeleteTareas] = useState(false);

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
  const handleChangeIdProyecto = (e) => {
    const { value } = e.target;
    setIdProyecto(value);
  };

  //handler para escuchar cambio en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value, // key: value
    });
  };

  // funcion que llama al servicio para ver tareas asignada al usuario
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

  const handleFormCreateTareas = () => {
    setFormUpdateTareas(false);
    setCreateTareas(true);
    setFormDeleteTareas(false);
  };

  const handleFormUpdateTareas = () => {
    setFormUpdateTareas(true);
    setCreateTareas(false);
    setFormDeleteTareas(false);
  };

  const handleFormDeleteTareas = () => {
    setCreateTareas(false);
    setFormUpdateTareas(false);
    setFormDeleteTareas(true);
  };

  //Handlers que llaman a las funciones para ejecutar la peticion

  const handleSubmitCreateTareas = () => {
    createListaTarea(authState.userToken, formValues, idProyecto);
  };
  const handleSubmitUpdateTareas = () => {
    updateProyecto(authState.userToken, formValues, idProyecto);
  };

  const handleSubmitDeleteTareas = (e) => {
    // e.preventDefault();
    deleteProyecto(authState.userToken, idProyecto);
  };

  // funcion que para llama al servicio "listaService" para crear, modificar y eliminar tareas

  const createListaTarea = async (token, body, idProyecto) => {
    try {
      const response = await listaService.createListaTarea(
        token,
        body,
        idProyecto
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>ListaTarea</div>
      <div>
        <DataListTable
          data={listas}
          title="Tu Lista de Tareas"
          headers={["Id Lista", "Titulo", "Descripcion", "Tarea"]}
          attributes={["id", "titulo", "descripcion", "tarea"]}
          onChange={handleListas}
        />
      </div>
      <div className="acordion">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header onClick={handleFormCreateTareas}>
              Crear Tarea
            </Accordion.Header>
            <Accordion.Body>
              {formCreateTareas && (
                <Form onSubmit={handleSubmitCreateTareas}>
                  <Form.Group>
                    <Form.Label>Identificador del proyecto</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Proyecto al que le añades tarea"
                      name="idProyecto"
                      onChange={handleChangeIdProyecto}
                    />

                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                      className="input"
                      type="text"
                      name="titulo"
                      value={formValues.titulo}
                      onChange={handleChange}
                    />
                    <br />
                    <Form.Label>Descipcion</Form.Label>
                    <Form.Control
                      className="input"
                      type="text"
                      name="descripcion"
                      value={formValues.descripcion}
                      onChange={handleChange}
                    />
                    <Form.Label>Tarea</Form.Label>
                    <Form.Control
                      className="input"
                      type="text"
                      name="tarea"
                      value={formValues.tarea}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="buttonUpdate"
                  >
                    Crear Tarea
                  </Button>
                </Form>
              )}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="0">
            <Accordion.Header onClick={handleFormUpdateTareas}>
              Modificar Lista de Tarea
            </Accordion.Header>
            <Accordion.Body>
              {formUpdateTareas && (
                <Form onSubmit={handleSubmitUpdateTareas}>
                  <Form.Group>
                    <Form.Label>Identificador de proyecto</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Coloque identificador de Proyecto"
                      name="idProyecto"
                      onChange={handleChangeIdProyecto}
                    />

                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                      className="input"
                      type="text"
                      name="titulo"
                      value={formValues.titulo}
                      onChange={handleChange}
                    />
                    <br />
                    <Form.Label>Descipcion</Form.Label>
                    <Form.Control
                      className="input"
                      type="text"
                      name="descripcion"
                      value={formValues.descripcion}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="buttonUpdate"
                  >
                    Modificar
                  </Button>
                </Form>
              )}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header onClick={handleFormDeleteTareas}>
              Eliminar Proyecto
            </Accordion.Header>
            <Accordion.Body>
              {formDeleteTareas && (
                <Form onSubmit={handleSubmitDeleteTareas}>
                  <Form.Group>
                    <Form.Label>Identificador de Proyecto</Form.Label>
                    <Form.Control
                      type="number"
                      name="idProyecto"
                      onChange={handleChangeIdProyecto}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="buttonUpdate"
                  >
                    Eliminar
                  </Button>
                </Form>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
}
