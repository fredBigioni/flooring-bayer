import React, { useState } from 'react'
import apiConfig from '../../config';
import { notification } from 'antd';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Password from '@material-ui/icons/VpnKey';
import Spinner from '@material-ui/icons/Loop';
import Close from '@material-ui/icons/Close';

const Modal = ({ open, isOpen }) => {
    const [userVisibilityToggle, setUserVisibilityToggle] = useState(false);
    const [passwordVisibilityToggle, setPasswordVisibilityToggle] = useState(false);
    const [emailVisibilityToggle, setEmailVisibilityToggle] = useState(false)
    const [loginVisibilityToggle, setLoginVisibilityToggle] = useState(false);
    const [register, setRegister] = useState(false)
    const [usuario, setUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [email, setEmail] = useState('');
    const urlBase = apiConfig.urlBase;
    const urlBack = apiConfig.urlBack;

    const submitForm = async (e) => {
        setLoginVisibilityToggle(true);

        e.preventDefault();
        if (register) {
            handleRegister();
            setRegister(false);
        }
        else {
            handleLogin(e);
        }

        clearStates();
    };

    const clearStates = () => {    
        setUsuario('');
        setContrasenia('');
        setEmail('');
    }

    const userFocus = () => {
        setUserVisibilityToggle(true);
    }

    const userFocusLeave = () => {
        setUserVisibilityToggle(false);
    };

    const passwordFocus = () => {
        setPasswordVisibilityToggle(true);
    }

    const passwordFocusLeave = () => {
        setPasswordVisibilityToggle(false);
    };

    const emailFocus = () => {
        setEmailVisibilityToggle(true);
    }

    const emailFocusLeave = () => {
        setEmailVisibilityToggle(false);
    };


    const handleRegister = async () => {
        try {
            const response = await fetch(urlBack + 'Login/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Username: usuario,
                    PasswordHash: contrasenia,
                    Email: email
                }),
            });

            if (!response.ok) {
                // Manejar error de registro
                openNotificationWithIcon('error', 'No se ha podido registrar.');
                return;
            }

            // Registro exitoso
            const data = await response.json();
            openNotificationWithIcon('success', 'Pendiente de aprobación');

        } catch (error) {
            openNotificationWithIcon('error', 'Se ha producido un error.');
        }
    };

    const openNotificationWithIcon = (type, message) => {
        if (type === "error") {
            notification.error({
                description: message,
            });
        }
        else {
            notification.success({
                description: message,
            });
        }
    };

    const handleLogin = async (e) => {
        try {
            const $this = e.target, $state = $this.querySelector('button > .state');

            $this.classList.add('loading');
            $state.innerHTML = 'Autenticando';

            
            const response = await fetch(urlBack + 'Login/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Username: usuario,
                    PasswordHash: contrasenia,
                }),
            });

            if (!response.ok) {
                if (response.status === 401)
                    openNotificationWithIcon('error', 'Usuario o contraseña incorrecta');

                $state.innerHTML = 'Log in';
                $this.classList.remove('ok', 'loading');

                return;
            }

            // Autenticación exitosa
            const data = await response.json();
            if (data) {
                $this.classList.add('ok');
                $state.innerHTML = 'Bienvenido!';

                $state.innerHTML = 'Log in';
                $this.classList.remove('ok', 'loading');

                openNotificationWithIcon('Success', 'Bienvenido');
                cerrarModal();
            }

        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    };

    const cerrarModal = () => {
        // Cierra el modal
        isOpen(false);
    };

    return (
        <div className="wrapper">
            {/* Modal */}
            {open && (
                <div className="modal-overlay">
                    <div className="modal">
                        <Close onClick={cerrarModal} />
                        <h2>{ register ? 'Registro' : 'Inicio de Sesión' }</h2>
                        <form className="login" onSubmit={submitForm}>
                            <div className={`input-container ${userVisibilityToggle ? 'with-icon' : ''}`}>
                                {userVisibilityToggle && <PermIdentityIcon className="input-icon" />}
                                <input
                                    type="text"
                                    placeholder="Username"
                                    onFocus={userFocus}
                                    onBlur={userFocusLeave}
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                />
                            </div>
                            <div className={`input-container ${passwordVisibilityToggle ? 'with-icon' : ''}`}>
                                {passwordVisibilityToggle && <Password className="input-icon" />}
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onFocus={passwordFocus}
                                    onBlur={passwordFocusLeave}
                                    value={contrasenia}
                                    onChange={(e) => setContrasenia(e.target.value)}
                                />
                            </div>
                            {register && (
                                <div className={`input-container ${emailVisibilityToggle ? 'with-icon' : ''}`}>
                                    {emailVisibilityToggle && <Password className="input-icon" />}
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        onFocus={emailFocus}
                                        onBlur={emailFocusLeave}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            )}
                            <a href="#" onClick={() => setRegister(true)} style={{ visibility: register ? 'hidden' : 'visible' }}>Registrarse</a>
                            <button type='submit'>
                                <div className={`input-container with-icon`}>
                                    <Spinner className="input-icon-submit" />
                                </div>
                                <span className="state">{ register ? 'Sign up' : 'Log in' }</span>
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Modal;
