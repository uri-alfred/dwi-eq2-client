import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";

const endPoint = `${process.env.REACT_APP_SERVICE_URL_BASE}/api/books`;

export default function ModalEditLibros({ show, handleClose, id_Libro }) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [editorial, setEditorial] = useState("");
  const [categoria, setCategoria] = useState("");
  const [anio, setAnio] = useState(null);
  const [selcategoria, setSelcategoria] = useState([]);

  const getCategorias = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVICE_URL_BASE}/api/categories`, {
        withCredentials: true, // Habilita el envío de cookies con la solicitud
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
          console.log(response.data);
        setSelcategoria(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    console.log(id_Libro)
    if (id_Libro !== 0) {
      const getLibroById = async () => {
        const res = await axios.get(`${endPoint}/${id_Libro}`, {
          withCredentials: true, // Habilita el envío de cookies con la solicitud
        });
        console.log(res.data)
        await setTitulo(res.data.titulo_lib);
        await setAutor(res.data.autor_lib);
        await setEditorial(res.data.editorial_lib);
        await setAnio(res.data.anio_lib);
        await setCategoria(res.data.fk_cat);
      };
      getLibroById();
      getCategorias();
    }
  }, [id_Libro]);

  const edit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await axios
        .put(
          `${endPoint}`,
          {
            id: id_Libro,
            titulo: titulo,
            anio: anio,
            autor: autor,
            editorial: editorial,
            cat: categoria
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
    if (titulo === "") {
      toast.error("El titulo es obligatorio");
      return false;
    } else if (
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
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ediar categoria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={edit}>
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
              type="number"
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
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              <option value="">Seleccione una categoria</option>
              {selcategoria.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.name}
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
