import React from 'react';
import { useState } from 'react';

const Home = ({ setLogin }) => {
    const logout = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://depositbackend.onrender.com/session/logout', {
                method: "DELETE"
            });
            if (response.ok) {
                console.log('Successful logout');
                setLogin(false); // Aquí deberías establecer el estado de inicio de sesión como falso
            } else {
                console.log('Logout failed');
            }
        } catch (error) {
            console.log('Error during logout:', error);
        }
    };

    return (
        <div>
            <h1>HOME</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Home;
