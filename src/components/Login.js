import React, { useState } from "react";
import FormInput from "./Form/FormInput";
import logo from "../img/electrogp2.png";
import "./css/Login.css";
import { useAuth } from "../Auth/auth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";


export default function Login() {

  const auth = useAuth();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Ej. ejemplo@gmail.com",
      label: "Correo",
      errorMessages: "No es un correo válido",
      required : true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Ej. 123456",
      label: "Contraseña",
      errorMessages: "Este campo es requerido",
      required : true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("Formulario enviado");
    //console.log(values);
    auth.login({email: values.email, password: values.password});
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  if (auth.dataUser.token) {
    return <Navigate to="/sistema" />;
  }

  return (
    <>
    <ToastContainer />
     <div className="App">
      <div className="login__image">
        <img src={logo} alt="login"/>
      </div>
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              values={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
    </>
   
  );
}
