import "./LoginForm.css";
import React, { useState } from 'react';

const LoginForm = ({ setLogin, setSessionId }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {   
        e.preventDefault()

        try {
            const response = await fetch('http://depositbackend.onrender/session/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                try {
                    console.log("Succesful login")
                    setSessionId(data.payload.session)
                    localStorage.setItem('sessionId', data.payload.session); // Almacenar sessionId en el almacenamiento local
                    setLogin(true);
                } catch (error) {
                    console.log(error)
                }
                
            } else {
                console.error('Login failed');
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

