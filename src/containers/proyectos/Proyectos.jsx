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
  const [idProyecto, setIdProyecto] = useState();
  const isLoggedIn = authState.isLoggedIn;
  const [proyecto, setProyecto] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [formCreateProyectos, setCreateProyectos] = useState(false);
  const [formUpdateProyecto, setFormUpdateProyecto] = useState(false);
  const [formDeleteProyecto, setFormDeleteProyecto] = useState(false);

  useEffect(() => {
    if (isLoggedIn && isCreador) {
      getProyectos(authState.userToken);
    } else {
      navigate("");
    }
  }, []);

  const handleProyectos = (e) => {
    const { dataId } = e.currentTarget.dataset;
    console.log(dataId);
  };

  const handleChangeIdProyecto = (e) => {
    const { value } = e.target;
    setIdProyecto(value);
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
  //handlers que cambian el valor para pintar y ocultar formularios
  const handleFormCreateProyectos = () => {
    setFormUpdateProyecto(false);
    setCreateProyectos(true);
    setFormDeleteProyecto(false);
  };

  const handleFormUpdateProyecto = () => {
    setFormUpdateProyecto(true);
    setCreateProyectos(false);
    setFormDeleteProyecto(false);
  };

  const handleFormDeleteProyecto = () => {
    setCreateProyectos(false);
    setFormUpdateProyecto(false);
    setFormDeleteProyecto(true);
  };

  //Handlers que llaman a las funciones para ejecutar la peticion

  const handleSubmitCreateProyectos = () => {
    createProyectos(authState.userToken, formValues);
  };
  const handleSubmitUpdate = () => {
    updateProyecto(authState.userToken, formValues, idProyecto);
  };

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    deleteProyecto(authState.userToken, idProyecto);
  };
  
  //funciones que llamar al servicio "proyectoService"
  const createProyectos = async (token, body) => {
    try {
      const response = await proyectoService.createProyectos(token, body);
    } catch (error) {
      console.log(error);
    }
  };
  
  const updateProyecto = async (token, data, idProyecto) => {
    try {
      const response = await proyectoService.updateProyecto(
        token,
        data,
        idProyecto
        );
      } catch (error) {
        console.log(error);
      }
    };
    
    const deleteProyecto = async (token, idProyecto) => {
      try {
        const response = await proyectoService.deleteProyecto(token, idProyecto);
        // navigate("/proyectos");
      } catch (error) {
        console.log(error);
    }
  };
  return (
    <>
      Proyectos
      {isCreador && (
        <>
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
                <Accordion.Header onClick={handleFormUpdateProyecto}>
                  Modificar Proyecto
                </Accordion.Header>
                <Accordion.Body>
                  {formUpdateProyecto && (
                    <Form onSubmit={handleSubmitUpdate}>
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
                <Accordion.Header onClick={handleFormDeleteProyecto}>
                  Eliminar Proyecto
                </Accordion.Header>
                <Accordion.Body>
                  {formDeleteProyecto && (
                    <Form onSubmit={handleSubmitDelete}>
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
      )}
    </>
  );
}
