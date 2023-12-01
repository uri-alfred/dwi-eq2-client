import React, { useState, useEffect } from "react";
import Menu from "../menu/Menu";
import "../systema.css";
import { AuthRoute } from "../../../Auth/auth";
import axios from "axios";
import { TbCategory2 } from "react-icons/tb";
import ModalNewMaterial from "./ModalNewMaterial";
import ModalEditMaterial from "./ModalEditMaterial";
import { ToastContainer, toast } from "react-toastify";

export default function Categorias() {
  const [inactive, setInactive] = React.useState(false);
  const [categorias, setCategorias] = useState([]);
  const endPoint = `${process.env.SERVICE_URL_BASE}/api/categories`;

  const [showNuevo, setShowNuevo] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState(0);

  const handleClose = async () => {
    setShowNuevo(false);
    setShowEdit(false);
    await getcategorias();
  };

  const handleShowNuevo = () => {
    setShowNuevo(true);
  };

  const handleShowEdit = (id) => {
    setShowEdit(true);
    setId(id);
  };

  useEffect(() => {
    getcategorias();
  }, []);

  const getcategorias = async () => {
    await axios
      .get(`${endPoint}`, {
        withCredentials: true, // Habilita el envío de cookies con la solicitud
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response.data);
        setCategorias(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteMaterial = async (id) => {
     // Mostrar una alerta de confirmación antes de eliminar
     const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");

     if (confirmDelete) {
       try {
         const res = await axios.delete(`${endPoint}/${id}`, {
           withCredentials: true,
         });
         // console.log(res);
         toast.success(res.data.message);
         setTimeout(() => {
          getcategorias();
         }, 1000);
       } catch (error) {
         console.error(error);
         toast.error("Error al eliminar el usuario");
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
          <h1>Categorias</h1>
          <button
            className="btn btn-outline-success fs-5 mb-2"
            onClick={handleShowNuevo}
          >
            <TbCategory2 /> Nueva Categoria
          </button>
        </div>

        <div className="divhr"></div>
        <br />

        {categorias.length !== 0 ? (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((categoria) => (
                  <tr key={categoria.category_id}>
                    <td>{categoria.name}</td>
                    <td>
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => handleShowEdit(categoria.category_id)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteMaterial(categoria.category_id)}
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

      <ModalNewMaterial show={showNuevo} handleClose={handleClose} />
      <ModalEditMaterial
        show={showEdit}
        handleClose={handleClose}
        id_material={id}
      />
    </AuthRoute>
  );
}
