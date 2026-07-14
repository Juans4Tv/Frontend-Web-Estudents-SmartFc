import React, { useEffect, useRef, useState } from "react";
import '../styles/register.scss';
import '../styles/global.scss';
import reglogo from '../assets/logos/regssma.png';
import { getBaseUrl } from '../config';


const Register = () => {

    const form = useRef(null);
    const [schoolReg, setschoolReg] = useState([]);
    const [gradesReg, setgradesReg] = useState([]);
    const [error, setError] = useState(" ");
    const [successR, setSuccessR] = useState(" ");

    const [formReg, setFormReg] = useState({
        nameReg: '',
        lnameReg: '',
        emailReg: '',
        passwordReg: '',
        cpasswordReg: '',
        chosegrade: '',
        choseSchool: '',
        checkedreg: false

    });


    useEffect(() => {
        fetch(`${getBaseUrl()}/loadAllSchools`)
        .then(res => res.json())
        .then(data => {
            setschoolReg(data)
        }).catch(function (error) {
            console.log(error)
        })
    }, [])
    //console.log(schoolReg);

    useEffect(() => {
        fetch(`${getBaseUrl()}/loadAllGrades`)
        .then(res => res.json())
        .then(data => {
            setgradesReg(data)
        }).catch(function (error) {
            console.log(error)
        })
    }, [])

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        if (name === "checkedreg") {
            setFormReg((prevState) => ({
                ...prevState,
                [name]: checked
            }));

        } else {
            //console.log(name);

            setFormReg((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
        /*axios(config)
        .then((res) => {
          if (res.data.res === false) {
            this.setState({
              validForm: false,
              error: "Correo electrónico existente",
            });
          } else {
            this.setState({
              validForm: null,
              error: "",
            });
          }
        })
        .catch((err) => {});
    }*/
    };


    const handleBlur = () => {
        const namereg = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        const lnamereg = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/;
        const emailreg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        const passreg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (formReg.nameReg === '') {
            setFormReg((prevState) => ({
                ...prevState,
                nameRError: 'El nombre es obligatorio'
            }));
        }
        else if (!namereg.test(formReg.nameReg)) {
            setFormReg((prevState) => ({
                ...prevState,
                nameRError: 'Por favor ingrese un nombre válido.'
            }));
        } else {
            setFormReg((prevState => ({
                ...prevState,
                nameRError: ''
            })));
        }
        if (formReg.lnameReg === '') {
            setFormReg((prevState) => ({
                ...prevState,
                lnameRError: 'El apellido es obligatorio'
            }));
        }
        else if (!lnamereg.test(formReg.lnameReg)) {
            setFormReg((prevState) => ({
                ...prevState,
                lnameRError: 'Por favor ingrese un apellido válido.'
            }));
        } else {
            setFormReg((prevState => ({
                ...prevState,
                lnameRError: ''
            })));
        }
        if(formReg.chosegrade === ''){
            setFormReg((prevState) => ({
                ...prevState,
                gradeRError: 'El grado es obligatorio.'
            }));
        }
        else{
            setFormReg((prevState) => ({
                ...prevState,
                gradeRError: ''
            }));
        } 

        if(formReg.choseSchool === ''){
            setFormReg((prevState) => ({
                ...prevState,
                schoolRError: 'El colegio es obligatorio.'
            }));
        }
        else{
            setFormReg((prevState) => ({
                ...prevState,
                schoolRError: ''
            }));
        } 

        if (formReg.emailReg.trim() === '') {
            setFormReg((prevState) => ({
                ...prevState,
                emailRError: 'El correo es obligatorio'
            }));
        }
        else if (!emailreg.test(formReg.emailReg)) {
            setFormReg((prevState) => ({
                ...prevState,
                emailRError: 'Por favor ingrese una dirección de correo electrónico válida.'
            }));
        } else {
            setFormReg((prevState => ({
                ...prevState,
                emailRError: ''
            })));
        }
        if (formReg.passwordReg === '') {
            setFormReg((prevState) => ({
                ...prevState,
                passRError: 'La contraseña es obligatoria'
            }));
        }
        else if (!passreg.test(formReg.passwordReg)) {
            setFormReg((prevState) => ({
                ...prevState,
                passRError: 'Por favor ingrese una contraseña de 8 Caracteres, la menos un número y una letra.'
            }));
        } else {
            setFormReg((prevState => ({
                ...prevState,
                passRError: ''
            })));
        }
        if (formReg.cpasswordReg.trim() !== formReg.passwordReg) {
            setFormReg((prevState => ({
                ...prevState,
                cpasswordRegError: 'Las contraseñas no coinciden'
            })));
        }
        else {
            setFormReg((prevState => ({
                ...prevState,
                cpasswordRegError: ''
            })));
        }
        if (!formReg.checkedreg) {
            setFormReg((prevState) => ({
                ...prevState,
                checkedRegError: 'Debe aceptar los términos y condiciones'
            }));
        }
        else {
            setFormReg((prevState => ({
                ...prevState,
                checkedRegError: ''
            })));
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDatar = new FormData(form.current);
        const data = {
            nameReg: formDatar.get('nameReg'),
            lnameReg: formDatar.get('lnameReg'),
            emailReg: formDatar.get('emailReg'),
            passwordReg: formDatar.get('passwordReg'),
            choseSchool: formDatar.get('choseSchool'),
            chosegrade: formDatar.get('chosegrade')
        }

        try {
            const allStudents = await fetch(`${getBaseUrl()}/loadAllStudent`).then(r => r.json());
            const count = Array.isArray(allStudents) ? allStudents.length : 0;
            const id_estudiante = parseInt('' + data.choseSchool + (count + 1), 10);

            const res = await fetch(`${getBaseUrl()}/createEstudiante`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_estudiante,
                    tipo_usuario: 1,
                    nombre_estudiante: data.nameReg,
                    apellido_estudiante: data.lnameReg,
                    grado_estudiante: data.chosegrade,
                    curso_estudiante: 1,
                    id_colegio: data.choseSchool,
                    nombre_usuario: data.emailReg.toLowerCase(),
                    contrasena: data.passwordReg.toLowerCase(),
                    correo_electronico: data.emailReg.toLowerCase(),
                })
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || 'Error del servidor');
            }
            setSuccessR("Registro exitoso, ahora puedes iniciar sesion");
        } catch (error) {
            setError(error.message);
        }
    };
    const btndisabled = () => {
        if (formReg.nameRError || formReg.lnameRError || formReg.emailRError || formReg.passRError || formReg.cpasswordRegError || formReg.checkedRegError || formReg.schoolRError || formReg.gradeRError) return (true);
        else if (formReg.namereg === "" || formReg.lnameReg === '' || formReg.emailReg === "" || formReg.passwordReg === "" || formReg.cpasswordReg === "" ) return (true);
        else return (false);
    }
    //console.log(formReg);
    return (
        <div className="Bottom">
            <div className="Register-container">
                <img src={reglogo} alt="logo" className="reg-logo" ></img>
                <form action="/" className="form-ref" id="formReg" ref={form} onSubmit={handleSubmit}>
                    <div className="inp-name">

                        <input type="text" placeholder="Nombres" className="inp-nametxt" id="nameReg" name="nameReg"
                            value={formReg.nameReg}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        <label htmlFor="name" className="name-lab" >Nombres</label>
                        {formReg.nameRError && (
                            <div className="error-message">{formReg.nameRError}</div>
                        )}
                    </div>
                    <div className="inp-lname">
                        <input type="text" placeholder="Apellidos" className="inp-lnametxt" name="lnameReg"
                            value={formReg.lnameReg}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        <label htmlFor="apellidos" className="lname-lab" >Apellidos</label>
                        {formReg.lnameRError && (
                            <div className="error-message">{formReg.lnameRError}</div>
                        )}
                    </div>
                    <div className="inp-sch">
                        <label htmlFor="grade" className="sch-lab" >Seleccione su curso:</label>
                        <select className="sch-ch" id="chosegrade" name="chosegrade"
                         value={formReg.chosegrade}
                         onChange={handleChange}
                         onBlur={handleBlur} >
                            <option key="default-grade" value="">Seleccione</option>
                            {gradesReg.map((grade) => (
                                <option key={grade._id} value={grade.id_grado}>
                                    {grade.nombre_grado}
                                </option>
                            ))}
                        </select>
                        {formReg.gradeRError && (
                            <div className="error-message">{formReg.gradeRError}</div>
                        )}
                    </div>
                    <div className="inp-sch">
                        <label htmlFor="school" className="sch-lab" >Seleccione su colegio:</label>
                        <select className="sch-ch" id="choseSchool" name="choseSchool"
                        value={formReg.choseSchool}
                        onChange={handleChange}
                        onBlur={handleBlur} >
                            <option key="default-school" value="">Seleccione</option>
                            {schoolReg.map((school) => (
                                <option key={school._id} value={school.id_colegio}>
                                    {school.nombre_colegio}
                                </option>
                            ))}
                        </select>
                        {formReg.schoolRError && (
                            <div className="error-message">{formReg.schoolRError}</div>
                        )}
                    </div>
                    <div className="inp-emailreg">
                        <input type="email" placeholder="Correo Electrónico" className="inp-emailtxtreg" name="emailReg"
                            value={formReg.emailReg}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        <label htmlFor="email" className="labelreg" >Correo Electrónico</label>
                        {formReg.emailRError && (
                            <div className="error-message">{formReg.emailRError}</div>
                        )}
                    </div>
                    <div className="inp-passreg">
                        <input type="password" placeholder="Contraseña" className="inp-passtxtreg" name="passwordReg"
                            value={formReg.passwordReg}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        <label htmlFor="password" className="labelcxreg">Contraseña</label>
                        {formReg.passRError && (
                            <div className="error-message">{formReg.passRError}</div>
                        )}
                    </div>
                    <div className="inp-cpassreg">
                        <input type="password" placeholder="Confirmar Contraseña" className="inp-cpasstxtreg" name="cpasswordReg"
                            value={formReg.cpasswordReg}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        <label htmlFor="password" className="clabelcxreg">Confirmar contraseña</label>
                        {formReg.cpasswordRegError && (
                            <div className="error-message">{formReg.cpasswordRegError}</div>
                        )}

                    </div>
                    <div>
                        <input type="checkbox" name="checkedreg" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="checkregister" />
                        <label htmlFor="terminos" className="txtchregister">Acepto términos y condiciones</label>
                        {formReg.checkedRegError && (
                            <div className="error-message">{formReg.checkedRegError}</div>
                        )}
                    </div>
                    <button type="submit"
                        className="btnregister"
                        disabled={btndisabled()}
                        onClick={handleSubmit}
                    >

                        Registrarse
                    </button>
                    <div className="error-message">{error}</div>
                    <div className="success-message">{successR}</div>

                </form>
            </div>
        </div >
    );
}

export default Register;