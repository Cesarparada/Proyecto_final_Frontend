import React from "react";
import "./Proyectos.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import proyectoService from "../../_services/proyectoService";
import { DataListTable } from "../../components";

export default function Proyectos() {
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isCreador = authState.userInfo.role == "user";
  const isLoggedIn = authState.isLoggedIn;
  const [proyecto, setProyecto] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [formCreateProyectos, setCreateProyectos] = useState(false);

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
  //handler para escuchar cambio en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value, // key: value
    });
  };
  const handleFormCreateProyectos = () => {
    // setFormUpdateCita(true);
    setCreateProyectos(true);
    // setFormDeleteCita(false);
  };

  //Handlers que llaman a la funcion para ejecutar la peticion

  const handleSubmitCreateProyectos = () => {
    createProyectos(authState.userToken, formValues);
  };
  //funcion que llama al servicio crear proyectos
  const createProyectos = async (token, body) => {
    try {
      const response = await proyectoService.createProyectos(token, body);
      
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
      <div className="acordion">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header onClick={handleFormCreateProyectos}>
              Crear Proyecto
            </Accordion.Header>
            <Accordion.Body>
              {formCreateProyectos && (
                <Form onSubmit={handleSubmitCreateProyectos}>
                  <Form.Group>
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
                    Crear Proyecto
                  </Button>
                </Form>
              )}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="0">
            
            {/* <Accordion.Header onClick={handleFormUpdateCita}>
              Modificar Proyecto
            </Accordion.Header>
            <Accordion.Body>
              {formUpdateCita && (
                <Form onSubmit={handleSubmitUpdate}>
                  <Form.Group>
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
            </Accordion.Body> */}
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            {/* <Accordion.Header onClick={handleFormDeleteCita}>
              Eliminar Proyecto
            </Accordion.Header>
            <Accordion.Body>
              {formDeleteCita && (
                <Form onSubmit={handleSubmitDelete}>
                  <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Label>Identificador de cita</Form.Label>
                    <Form.Control
                      type="number"
                      name="idCita"
                      onChange={handleDeleteCita}
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
            </Accordion.Body> */}
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}
