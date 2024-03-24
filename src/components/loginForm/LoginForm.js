import "./LoginForm.css";
import React, { useState } from 'react';

const LoginForm = ({ setLogin }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('https://depositbackend.onrender.com/session/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }) // Enviar los datos del formulario en formato JSON
            });

            if (response.ok) {
                console.log('Successful login');
                setLogin(true); // Establecer el estado de inicio de sesión como verdadero
                // Aquí puedes redirigir al usuario a otra página o realizar otras acciones después del inicio de sesión exitoso
            } else {
                console.error('Login failed');
                // Aquí puedes mostrar un mensaje de error al usuario
            }
        } catch (error) {
            console.log('Error during login:', error);
        }
    }
    
    return (
        <div className="display-login-form">
            <div className="login-form">
                <h2 className="login-form-items">Login</h2>
                <form className="login-form-items" onSubmit={handleSubmit}>
                    <input
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
                {error && <p>Todos los campos son obligatorios</p>}
            </div>
        </div>
    );
}

export default LoginForm;
