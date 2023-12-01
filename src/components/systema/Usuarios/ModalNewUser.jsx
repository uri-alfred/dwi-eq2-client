import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";

const endPoint = `${process.env.SERVICE_URL_BASE}/api/usuarios`;

export default function ModalNewUser({ show, handleClose }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apellido, setApellido] = useState(0);

  useEffect(() => {
    limpiar();
  }, [show]);

  const store = async (e) => {
    e.preventDefault();
    if (validate()) {
      await axios
        .post(
          endPoint,
          {
            email: email,
            password: password,
            nombre: nombre,
            apellido: apellido,
          },
          {
            withCredentials: true, // Habilita el envío de cookies con la solicitud
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          toast.success(response.data.message);
          setTimeout(() => {
            handleClose();
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    }
  };

  const validate = () => {
    if (nombre === "") {
      toast.error("El nombre es obligatorio");
      return false;
    } else if (email === "") {
      toast.error("El email es obligatorio");
      return false;
    } else if (password === "") {
      toast.error("La contraseña es obligatoria");
      return false;
    } else if (password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
      return false;
    } else if (nombre === "") {
      toast.error("El nombre es obligatorio");
      return false;
    } else {
      return true;
    }
  };

  const limpiar = () => {
    setEmail("");
    setNombre("");
    setPassword("");
    setApellido("");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear nuevo usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={store}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              className="form-control"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>
          <Button variant="secondary" onClick={handleClose} className="m-2">
            Cerrar
          </Button>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
