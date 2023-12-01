import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";

const endPoint = `${process.env.REACT_APP_SERVICE_URL_BASE}/api/usuarios`;

export default function ModalEditUser({ show, handleClose, id_user }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [apellido, setApellido] = useState("");

  useEffect(() => {
    if (id_user !== 0) {
      const getUsuarioById = async () => {
        const res = await axios.get(`${endPoint}/${id_user}`, {
          withCredentials: true, // Habilita el envío de cookies con la solicitud
        });
        setNombre(res.data.nombre);
        setEmail(res.data.email);
        setApellido(res.data.apellido);
      };

      getUsuarioById();
    }
  }, [id_user]);

  const edit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await axios
        .put(
          `${endPoint}`,
          {
            id: id_user,
            email: email,
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
          //console.log(response);
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
    } else if (apellido === 0) {
      toast.error("El apellido es obligatorio");
      return false;
    } else {
      return true;
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ediar usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={edit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-contapellido"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-contapellido"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              className="form-contapellido"
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
