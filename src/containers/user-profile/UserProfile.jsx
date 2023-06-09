
import React, { useEffect, useState } from "react";
import "./UserProfile.scss";
import userService from "../../_services/userService";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { store } from "../../app/store";
import validator from "validator";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
export default function UserProfile() {
  // HOOKS
  const [user, setUser] = useState({});
  const [formValues, setFormValues] = useState({});
  const [modifyProfile, setModifyProfile] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const [validated, setValidated] = useState(false);

  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.userToken) {
      getProfile(authState.userToken);
    } else {
      navigate("/");
    }
  }, []);

  // FUNCTIONS
  const getProfile = async (token) => {
    try {
      const response = await userService.getProfile(token);

      setUser(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async (token, body) => {
    await userService.updateProfile(token, body);
    setModifyProfile(false);
    getProfile(authState.userToken);
  };

  // HANDLERS
  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (formValues.password) {
        if (
          !validator.isByteLength(formValues.password, {
            min: 8,
            max: undefined,
          })
        ) {
          event.preventDefault();
          return setUpdateError(
            "La contraseña debe contener mínimo 8 caracteres"
          );
        } else if (
          validator.isByteLength(formValues.password, {
            min: 8,
            max: undefined,
          })
        ) {
          setUpdateError(null);
        }
      }
      updateProfile(authState.userToken, formValues);
      if (formValues.nombre) {
        store.dispatch(setUser({ name: formValues.nombre }));
      }
    }
    setValidated(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value, //key: value
    });
  };
  const handleChangeProfile = () => {
    setModifyProfile(true);
  };
  
  return (
    <>
      <div className="contenedor-card">
        <div className="card">
          {!modifyProfile && (
            <Card style={{ width: "15rem" }}>
              <div>
                <Card.Img className="card-img" src="/_imagenes/usuario.png" />
              </div>
              <Card.Body>
                <Card.Title>Perfil del Usuario</Card.Title>
              </Card.Body>
              <ListGroup>
                <ListGroup.Item className="items">
                  Nombre: {user.nombre}
                </ListGroup.Item>
                <ListGroup.Item className="items">
                  Apellidos: {user.apellidos}
                </ListGroup.Item>
                <ListGroup.Item className="items">
                  Fecha de Nacimiento: <br /> {user.fecha_de_nacimiento}
                </ListGroup.Item>
                <ListGroup.Item className="items">
                  Email: <br /> {user.email}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          )}
        </div>

        {!modifyProfile && (
          <div>
            <Button
              variant="primary"
              className="btn-modificar"
              onClick={handleChangeProfile}
            >
              Modificar Perfil
            </Button>
          </div>
        )}

        {modifyProfile && (
          <div className="form modify-form">
            <Form
              onSubmit={handleSubmit}
              validated={validated}
              className="padreBtn"
            >
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  className="input"
                  type="text"
                  placeholder="Nombre"
                  name="nombre"
                  value={formValues.nombre}
                  onChange={handleChange}
                />
                <br />
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  className="input"
                  type="text"
                  placeholder="Apellidos"
                  name="apellidos"
                  value={formValues.apellidos}
                  onChange={handleChange}
                />
                <br />
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  className="input"
                  type="date"
                  name="fecha_de_nacimiento"
                  value={formValues.fecha_de_nacimiento}
                  onChange={handleChange}
                />
                <br />
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="input"
                  type="password"
                  placeholder="***********"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </Form.Group>
              {updateError && <p style={{ color: "red" }}>{updateError}</p>}
              <br />
              <Button variant="primary" type="submit">
                Subir Cambios
              </Button>
            </Form>
          </div>
        )}
      </div>
    </>
  );
}
