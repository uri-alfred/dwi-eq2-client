import React, { useState, useEffect } from "react";
import Menu from "../menu/Menu";
import "../systema.css";
import { AuthRoute } from "../../../Auth/auth";
import axios from "axios";
import { TbCategory2 } from "react-icons/tb";
import ModalNewLibros from "./ModalNewLibros";
import ModalEditLibros from "./ModalEditLibros";
import { ToastContainer, toast } from "react-toastify";

export default function Libros() {
  const [inactive, setInactive] = React.useState(false);
  const [libros, setLibros] = useState([]);
  const endPoint = `${process.env.SERVICE_URL_BASE}/api/books`;

  const [showNuevo, setShowNuevo] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState(0);

  const handleClose = async () => {
    setShowNuevo(false);
    setShowEdit(false);
    await getlibros();
  };

  const handleShowNuevo = () => {
    setShowNuevo(true);
  };

  const handleShowEdit = (id) => {
    setShowEdit(true);
    setId(id);
  };

  useEffect(() => {
    getlibros();
  }, []);

  const getlibros = async () => {
    await axios
      .get(`${endPoint}`, {
        withCredentials: true, // Habilita el envío de cookies con la solicitud
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response.data);
        setLibros(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteLibros = async (id) => {
     // Mostrar una alerta de confirmación antes de eliminar
     const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este libro?");

     if (confirmDelete) {
       try {
         const res = await axios.delete(`${endPoint}/${id}`, {
           withCredentials: true,
         });
         // console.log(res);
         toast.success(res.data.message);
         setTimeout(() => {
          getlibros();
         }, 1000);
       } catch (error) {
         console.error(error);
         toast.error("Error al eliminar el libro");
       }
     }
   };
    

  return (
    <AuthRoute>
      <ToastContainer />
      <Menu
        onCollapse={(inactive) => {
          //console.log(inactive);
          setInactive(inactive);
        }}
      />
      <div className={`conter ${inactive ? "inactive" : ""}`}>
        <div className="d-flex justify-content-between">
          <h1>Libros</h1>
          <button
            className="btn btn-outline-success fs-5 mb-2"
            onClick={handleShowNuevo}
          >
            <TbCategory2 /> Nuevo Libro
          </button>
        </div>

        <div className="divhr"></div>
        <br />

        {libros.length !== 0 ? (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Autor</th>
                  <th scope="col">Editorial</th>
                  <th scope="col">Año</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {libros.map((libro) => (
                  <tr key={libro.id}>
                    <td>{libro.titulo_lib}</td>
                    <td>{libro.autor_lib}</td>
                    <td>{libro.editorial_lib}</td>
                    <td>{libro.anio_lib}</td>
                    <td>{libro.fk_cat}</td>
                    <td>
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => handleShowEdit(libro.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteLibros(libro.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-warning" role="alert">
            No hay datos
          </div>
        )}
      </div>

      <ModalNewLibros show={showNuevo} handleClose={handleClose} />
      <ModalEditLibros
        show={showEdit}
        handleClose={handleClose}
        id_Libro={id}
      />
    </AuthRoute>
  );
}
