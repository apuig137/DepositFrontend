import "./LoginForm.css";
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Spinner from "../spinner/Spinner.js";

const LoginForm = ({ setLogin, loading, setLoading }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {   
        e.preventDefault()

        try {
            setLoading(true);
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
                    const expirationTime = new Date(Date.now() + (1 * 60 * 60 * 1000));
                    localStorage.setItem('expiration', expirationTime);
                    localStorage.setItem('sessionData', data.payload.session);
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
        } finally {
            setLoading(false);
        }
    }

    if(loading) {
        return (
            <div>
                <Spinner/>
            </div>
        )
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

