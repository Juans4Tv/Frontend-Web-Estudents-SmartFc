import React, { Component, useState } from 'react';

import logo from '../assets/logos/logoSinFondo.png';
import txtlogo from '../assets/logos/smartFCLogo.png';
import '../styles/login.scss'

const Login = () => {
    return (
        <div className="login">
            <div className="form-container">
                <img src={logo} alt="logo" className="logo" ></img>
                <img src={txtlogo} alt="logo" className="logotxt" />

                <h1 className="title">Crear Nueva contraseña </h1>
                <p className="subtitle">Introduzca una nueva contraseña para su cuenta</p>

                <form action="/" className="form">
                    <label for="password" className="label">Password</label>
                    <input type="password" id="passwordx" placeholder="*********" className="input input-password" />

                    <label for="new-password" className="label">Password</label>
                    <input type="passwordx" id="new-password" placeholder="*********" className="input input-password" />

                    <input type="submit" value="Confirm" className="primary-button login-button" />
                </form>
            </div>
        </div>
    );
}

export default Login;

