import "./LoginForm.css";
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const LoginForm = ({ setLogin, setSessionId }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {   
        e.preventDefault()

        try { 
            const response = await fetch('https://depositbackend.onrender.com/session/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.status === 401) {
                console.error('Unauthorized');
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid credentials',
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }

            const data = await response.json();

            if (response.ok) {
                try {
                    setSessionId(data.payload.session)
                    const expirationTime = new Date(Date.now() + (1 * 60 * 60 * 1000));
                    const sessionData = {
                        session: data.payload.session,
                        expiresAt: expirationTime.getTime()
                    };
                    localStorage.setItem('sessionData', JSON.stringify(sessionData));
                    setLogin(true);
                } catch (error) {
                    console.log(error)
                }
                
            } else {
                console.error('Login failed');
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid credentials',
                    showConfirmButton: false,
                    timer: 1500
                });
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
            </div>
        </div>
    );
}

export default LoginForm;

