import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";

const endPoint = `${process.env.SERVICE_URL_BASE}/api/categories`;

export default function ModalNewMaterial({ show, handleClose }) {
  const [nombre, setNombre] = useState("");

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
            name: nombre,
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
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error al agregar la categoria");
        });
    }
  };

  const validate = () => {
    if (nombre === "") {
      toast.error("El nombre de la categoria es obligatorio");
      return false;
    } else {
      return true;
    }
  };

  const limpiar = () => {
    setNombre("");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear nueva categoria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={store}>
          <div className="mb-3">
            <label className="form-label">Nombre de la categoria</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
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
