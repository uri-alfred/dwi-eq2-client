import React from 'react'
import Menu from './menu/Menu';
import './systema.css';
import { AuthRoute, useAuth } from '../../Auth/auth';

export default function Systema() {

  const [inactive, setInactive] = React.useState(false);
  const auth = useAuth();

  return (
    <AuthRoute>
      <Menu onCollapse={(inactive) => {
        //console.log(inactive);
        setInactive(inactive);
      }}/>
      <div className={`conter ${inactive ? 'inactive' : ''}`}>
        <h1>BiblioUteq</h1>
        <div className="divhr"></div>
        <br />

        <div className="row d-flex justify-content-center">
          <div className="col-md-10">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Bienvedido {auth.dataUser.nombre}</h5>
                <div className="divhr"></div>
                <br />
                <p className="card-text">Informacion de tu cuenta</p>

              <ul className="list-group list-group-flush">
                <li className="list-group-item">Email: {auth.dataUser.email}</li>
                <li className="list-group-item">Nombre: {auth.dataUser.nombre}</li>
                <li className="list-group-item">Apellido: {auth.dataUser.apellido}</li>
              </ul>

              </div>
              <div className="card-footer">
                <small className="text-muted">BiblioUteq</small>
              </div>
            </div>
          </div>
        </div>
            


      </div>

    </AuthRoute>
      
  )
}
