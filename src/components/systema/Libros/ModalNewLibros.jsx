import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";

const endPoint = `${process.env.SERVICE_URL_BASE}/api/books`;

export default function ModalNewLibros({ show, handleClose }) {
  const [titulo, setTitulo] = useState("");
  const [anio, setAnio] = useState("");
  const [autor, setAutor] = useState("");
  const [editorial, setEditorial] = useState("");
  const [categoria, setCategoria] = useState("");
  const [selcategoria, setSelcategoria] = useState([]);

  const getCategorias = async () => {
    await axios
      .get(`${process.env.SERVICE_URL_BASE}/api/categories`, {
        withCredentials: true, // Habilita el envío de cookies con la solicitud
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        //  console.log(response.data);
        setSelcategoria(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    limpiar();
    getCategorias();
  }, [show]);

  const store = async (e) => {
    e.preventDefault();
    if (validate()) {
      await axios
        .post(
          endPoint,
          {
            titulo: titulo,
            anio: anio,
            autor: autor,
            editorial: editorial,
            cat: categoria,
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
    if (titulo === "") {
      toast.error("El nombre de la categoria es obligatorio");
      return false;
    } else if(
      anio === "" ||
      autor === "" ||
      editorial === "" ||
      categoria === ""
    ) {
      toast.error("Todos los campos son obligatorios");
      return false;
    }
    else {
      return true;
    }
  }

  const limpiar = () => {
    setTitulo("");
    setAnio("");
    setAutor("");
    setEditorial("");
    setCategoria("");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo titulo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={store}>
          <div className="mb-3">
            <label className="form-label">Titulo</label>
            <input
              type="text"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
            <label className="form-label">Año</label>
            <input
              type="text"
              className="form-control"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
              required
            />
            <label className="form-label">Autor</label>
            <input
              type="text"
              className="form-control"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              required
            />
            <label className="form-label">Editorial</label>
            <input
              type="text"
              className="form-control"
              value={editorial}
              onChange={(e) => setEditorial(e.target.value)}
              required
            />
            <label className="form-label">Categoria</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              <option value="">Seleccione una categoria</option>
              {selcategoria.map((categoria) => (
                <option key={categoria.category_id} value={categoria.category_id}>
                  {categoria.name}
                </option>
              ))}
            </select>
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
