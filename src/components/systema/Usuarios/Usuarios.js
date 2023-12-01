import React, { useState, useEffect } from "react";
import Menu from "../menu/Menu";
import "../systema.css";
import { AuthRoute } from "../../../Auth/auth";
import axios from "axios";
import { AiOutlineUserAdd } from "react-icons/ai";
import ModalNewUser from "./ModalNewUser";
import ModalEditUser from "./ModalEditUser";
import { ToastContainer, toast } from "react-toastify";

export default function Usuarios() {
  const [inactive, setInactive] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  const endPoint = `${process.env.SERVICE_URL_BASE}/api/`;

  const [showNuevo, setShowNuevo] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState(0);

  const handleClose = async () => {
    setShowNuevo(false);
    await setShowEdit(false);
    await getUsuarios();
  };

  const handleShowNuevo = () => {
    setShowNuevo(true);
  };

  const handleShowEdit = (id) => {
    setShowEdit(true);
    setId(id);
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  const getUsuarios = async () => {
    const res = await axios.get(`${endPoint}usuarios`, {
      withCredentials: true, // Habilita el envío de cookies con la solicitud
      headers: {
        "Content-Type": "application/json",
      },
    });
    setUsuarios(res.data);
  };

  const deleteUsuario = async (id) => {
    // Mostrar una alerta de confirmación antes de eliminar
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");

    if (confirmDelete) {
      try {
        const res = await axios.delete(`${endPoint}usuarios/${id}`, {
          withCredentials: true,
        });
        // console.log(res);
        toast.success(res.data.message);
        setTimeout(() => {
          getUsuarios();
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
          <h1>Usuarios</h1>
          <button
            className="btn btn-outline-success fs-5 mb-2"
            onClick={handleShowNuevo}
          >
            <AiOutlineUserAdd /> Nuevo usuario
          </button>
        </div>

        <div className="divhr"></div>
        <br />
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.user_id}>
                <td>{usuario.email}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>
                  {usuario.user_id !== 1 && (
                    <button
                      className="btn btn-outline-danger me-2"
                      onClick={() => deleteUsuario(usuario.user_id)}
                    >
                      Eliminar
                    </button>
                  )}
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => handleShowEdit(usuario.user_id)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalNewUser show={showNuevo} handleClose={handleClose} />
      <ModalEditUser show={showEdit} handleClose={handleClose} id_user={id} />
    </AuthRoute>
  );
}
