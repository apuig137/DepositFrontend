import React from "react";
import "./Navigation.css"

const Navigation = ({ setLogin, secondButton, thirdButton, title, setShowAddProductForm, setShowExpiredProducts }) => {
    const logout = async (e) => {
        e.preventDefault();
        const storedSessionId = localStorage.getItem('sessionData');
        try {
            const responseLogout = await fetch(`https://depositbackend.onrender.com/session/logout/${storedSessionId}`, {
                method: "DELETE",
                credentials: "include"
            });
            if (responseLogout.ok) {
                setLogin(false);
                localStorage.removeItem('sessionData')
                localStorage.removeItem('expiration')
            } else {
                console.log('Logout failed');
            }
        } catch (error) {
            console.log('Error during logout:', error);
        }
    }

    const showAddProductForm = () => {
        setShowExpiredProducts(false)
        setShowAddProductForm(true)
    }

    const showExpiredProducts = () => {
        setShowExpiredProducts(true)
        setShowAddProductForm(false)
    }

    const showProducts = () => {
        setShowExpiredProducts(false)
        setShowAddProductForm(false)
    }

    return (
        <nav>
            <div className="nav-container">
                <div className="title-container">
                    <a className="title">{title}</a>
                </div>
                <div className="button-container">
                <div className="dropdown-center">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Options
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" onClick={showProducts}>Show products</a></li>
                        <li><a className="dropdown-item" onClick={showAddProductForm}>Add product</a></li>
                        <li><a className="dropdown-item" onClick={showExpiredProducts}>Show expired products</a></li>
                        <li><a className="dropdown-item" onClick={logout}>Logout</a></li>
                    </ul>
                </div>
                    {secondButton}
                    {thirdButton}
                    <button type="button" className="logout-button nav-button-display" onClick={logout}>Logout</button>
                </div>
            </div>
        </nav>
    )
}

export default Navigation

