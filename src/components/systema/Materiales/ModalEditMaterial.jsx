import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";

const endPoint = `${process.env.SERVICE_URL_BASE}/api/categories`;

export default function ModalEditMaterial({ show, handleClose, id_material }) {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (id_material !== 0) {
      const getMaterialById = async () => {
        const res = await axios.get(`${endPoint}/${id_material}`, {
          withCredentials: true, // Habilita el envío de cookies con la solicitud
        });
        setNombre(res.data.name);
      };
      getMaterialById();
    }
  }, [id_material]);

  const edit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await axios
        .put(
          `${endPoint}/${id_material}`,
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
    } else {
      return true;
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ediar categoria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={edit}>
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
