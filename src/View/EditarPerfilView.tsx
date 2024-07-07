import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import '../Css/EditarPerfil.css';
import Header from './HeaderView';
import Footer from './FooterView';
import { useAuth } from '../Javascript/AuthContext';

const EditarPerfilView: React.FC = () => {
    const navigate = useNavigate();
    const { userId, isAuthenticated } = useAuth();
    const [originalData, setOriginalData] = useState({ name: '', email: '', password: '' });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/'); // Redirigir si no está autenticado
            return;
        }

        if (!userId) {
            toast.error('ID de usuario no definido');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://localhost:7271/api/Usuario/${userId}`);
                if (!response.ok) {
                    throw new Error(`Solicitud fallida con el código de estado ${response.status}`);
                }
                const data = await response.json();
                setOriginalData({ name: data.name, email: data.email, password: data.password });
                setName(data.name);
                setEmail(data.email);
            } catch (error) {
                toast.error('Error al obtener los datos del usuario');
            }
        };

        fetchUserData();
    }, [userId, isAuthenticated, navigate]);

    const handleGuardarCambios = async () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            toast.error('Los campos no pueden estar vacíos o contener solo espacios');
            return;
        }

        if (name === originalData.name && email === originalData.email && newPassword === '' && confirmPassword === '') {
            toast.info('No se detectaron cambios');
            return; // No hay cambios, no hacer nada
        }

        if (newPassword !== confirmPassword) {
            toast.error('La nueva contraseña y la confirmación no coinciden');
            return; // Las contraseñas no coinciden
        }

        if (newPassword && newPassword === originalData.password) {
            toast.error('La nueva contraseña no puede ser la misma que la actual');
            return; // La nueva contraseña es igual a la actual
        }

        Swal.fire({
            title: '¿Estás seguro de que quieres guardar los cambios?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, guardar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`https://localhost:7271/api/Usuario/${userId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name,
                            email,
                            password: newPassword || undefined
                        })
                    });
                    if (!response.ok) {
                        throw new Error(`Solicitud fallida con el código de estado ${response.status}`);
                    }
                    toast.success('Perfil actualizado correctamente');
                    navigate(-1);
                } catch (error) {
                    toast.error('Error al actualizar los datos del usuario');
                }
            }
        });
    };

    const handleCancelar = () => {
        Swal.fire({
            title: '¿Estás seguro de que quieres cancelar los cambios?',
            text: "Los datos editados no se guardarán",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(-1); // Navega hacia atrás
            }
        });
    };

    return (
        <>
            <Header />
            <div className="editar-perfil-container-custom">
                <div className="editar-perfil-card-custom">
                    <h2>Editar Perfil</h2>
                    <div className="form-group-custom">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group-custom">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group-custom">
                        <label htmlFor="password">Contraseña Actual</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group-custom">
                        <label htmlFor="new-password">Nueva Contraseña</label>
                        <input
                            type="password"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group-custom">
                        <label htmlFor="confirm-password">Confirmar Nueva Contraseña</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="buttons-custom">
                        <button onClick={handleGuardarCambios} className="guardar-button-custom">Guardar Cambios</button>
                        <button onClick={handleCancelar} className="cancelar-button-custom">Cancelar Cambios</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default EditarPerfilView;
