import React from "react";
import "./Navigation.css"

const Navigation = ({ setLogin, sessionId, secondButton, title }) => {
    const logout = async (e) => {
        e.preventDefault();
        try {
            const responseLogout = await fetch(`https://depositbackend.onrender/session/logout/${sessionId}`, {
                method: "DELETE",
                credentials: "include"
            });
            if (responseLogout.ok) {
                setLogin(false);
            } else {
                console.log('Logout failed');
            }
        } catch (error) {
            console.log('Error during logout:', error);
        }
    }

    return (
        <nav>
            <div className="nav-container">
                <div className="title-container">
                    <a className="title">{title}</a>
                </div>
                <div className="button-container">
                    {secondButton}
                    <button type="button" className="logout-button" onClick={logout}>Logout</button>
                </div>
            </div>
        </nav>
    )
}

export default Navigation

