import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.scss';
import '../styles/global.scss';
import logo from '../assets/logos/Logo-in.png';
import donwload from '../assets/logos/call.png';
import { setServerIP, getServerIP, testConnection } from '../config';

const Login = () => {
    const form = useRef(null);
    const navigate = useNavigate();
    const [error, setError] = useState(" ");
    const [ipInput, setIpInput] = useState(getServerIP() || '45.231.184.246');
    const [ipStatus, setIpStatus] = useState(getServerIP() ? 'saved' : 'none');
    const [ipMessage, setIpMessage] = useState('');
    const [testingIp, setTestingIp] = useState(false);

    const [formLogin, setFormLogin] = useState({
        usename: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormLogin((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleIpChange = (event) => {
        setIpInput(event.target.value);
        setIpStatus('none');
        setIpMessage('');
        setError(' ');
    };

    const handleTestIp = async () => {
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (!ipRegex.test(ipInput)) {
            setIpStatus('error');
            setIpMessage('Formato de IP inválido. Ejemplo: 192.168.1.1');
            console.error('[Login] Formo de IP inválido:', ipInput);
            return;
        }
        setTestingIp(true);
        setIpStatus('testing');
        setIpMessage('Probando conexión...');
        console.log(`[Login] Probando conexión con ${ipInput}:3000...`);
        const result = await testConnection(ipInput);
        setTestingIp(false);
        if (result.ok) {
            setIpStatus('ok');
            setIpMessage('Conexión exitosa. IP guardada.');
            setServerIP(ipInput);
            setError(' ');
            console.log(`[Login] IP ${ipInput} guardada correctamente.`);
        } else {
            setIpStatus('error');
            setIpMessage(result.message);
            console.error(`[Login] Fallo al conectar con ${ipInput}:3000:`, result.message);
        }
    };

    const handleBlur = () => {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (formLogin.usename === '') {
            setFormLogin((prevState) => ({
                ...prevState,
                emailError: 'El correo electrónico es obligatorio'
            }));
        }
        else if (!emailRegex.test(formLogin.usename)) {
            setFormLogin((prevState) => ({
                ...prevState,
                emailError: 'Por favor ingrese una dirección de correo electrónico válida.'
            }));
        }
        else {
            setFormLogin((prevState => ({
                ...prevState,
                emailError: ''
            })));
        }
        if (formLogin.password === '') {
            setFormLogin((prevState) => ({
                ...prevState,
                passError: 'La contraseña es obligatoria'
            }));
        }
        else {
            setFormLogin((prevState => ({
                ...prevState,
                passError: ''
            })));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!getServerIP()) {
            setError('Primero debes configurar y guardar la IP del servidor.');
            console.error('[Login] Intento de login sin IP configurada.');
            return;
        }
        const formData = new FormData(form.current);
        const data = {
            usename: formData.get('usename'),
            password: formData.get('password')
        };
        console.log(`[Login] Intentando login con usuario: ${data.usename}`);
        fetch(`${require('../config').getBaseUrl()}/loginEstudiante`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                correo_electronico: data.usename,
                contrasena: data.password
            })
        }).then(async (response) => {
            if (!response.ok) {
                const text = await response.text();
                console.error(`[Login] Error ${response.status}:`, text);
                throw new Error(text);
            }
            return response.json();
        }).then(function (data) {
            localStorage.setItem("login", JSON.stringify(data));
            console.log('[Login] Login exitoso, recargando página...');
            window.location.reload();
        }).catch(function (error) {
            setError(error.message || 'No se pudo conectar al servidor');
            console.error('[Login] Fallo en login:', error.message);
        });
    };
    const btnlogindisabled = () => {
        if (formLogin.emailError || formLogin.passError) return (true);
        else if (formLogin.usename === "" || formLogin.password === "") return (true);
        else return (false);
    }
    return (
        <div className="Bottom">
            <div className="Login-container">
                <img src={logo} alt="logo" className="logo-login" ></img>

                <div className="ip-config-section">
                    <label className="ip-label">IP del Servidor:</label>
                    <div className="ip-input-row">
                        <input
                            type="text"
                            placeholder="Ej: 192.168.1.100"
                            value={ipInput}
                            onChange={handleIpChange}
                            className="inp-ip"
                        />
                        <button
                            type="button"
                            className="btn-ip-test"
                            onClick={handleTestIp}
                            disabled={testingIp || !ipInput}
                        >
                            {testingIp ? 'Probando...' : 'Probar'}
                        </button>
                    </div>
                    {ipStatus === 'ok' && (
                        <div className="ip-status ok">✓ {ipMessage}</div>
                    )}
                    {ipStatus === 'error' && (
                        <div className="ip-status error">✗ {ipMessage}</div>
                    )}
                    {ipStatus === 'testing' && (
                        <div className="ip-status testing">● {ipMessage}</div>
                    )}
                    {ipStatus === 'saved' && (
                        <div className="ip-status ok">✓ IP configurada: {ipInput}</div>
                    )}
                </div>

                <form ref={form} id="formLogin" name="formLogin" className="form-login" onSubmit={handleSubmit} >
                    <div className="inp-email">
                        <input type="email" id="usename" name="usename" value={formLogin.usename} onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Correo Electrónico" className="inp-emailtxt" />
                        <label htmlFor="email" className="labele" >Correo Electrónico</label>
                        {formLogin.emailError && (
                            <div className="error-message">{formLogin.emailError}</div>
                        )}
                    </div>
                    <div className="inp-passw">
                        <input type="password" id="password" name="password" value={formLogin.password} onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Contraseña" className="inp-passtxt" />
                        <label htmlFor="password" className="labelcx">Contraseña</label>
                        {formLogin.passError && (
                            <div className="error-message">{formLogin.passError}</div>
                        )}
                    </div>
                    <button type="submit"
                        className="btnlogin"
                        disabled={btnlogindisabled() || !getServerIP()}
                        onClick={handleSubmit}
                    >
                        Iniciar sesión
                    </button>

                </form>
                <button onClick={() => navigate("/guest")}
                    className="btnlogin"
                >
                    Iniciar como Invitado
                </button>
                <div className="error-message">{error}</div>
                <div className="txtcuenta">
                    ¿No tienes cuenta? <a name="linkRegister" className="txtreg" href="/register" onClick={(e) => { if (!getServerIP()) { e.preventDefault(); setError('⚠️ Primero configura y guarda la IP del servidor antes de registrarte.'); } }}>Regístrate</a>
                </div>
                <div className="endlogin">
                    <img src={donwload} className="imapp" alt="App Movil" />
                    <label className="imapptx" >Descarga la app Móvil</label>
                </div>
            </div>
        </div >
    );
}

export default Login;
