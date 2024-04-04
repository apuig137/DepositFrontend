import React, { useState } from "react";
import "./AddProductForm.css"
import Navigation from "../navigation/Navigation.js";
import ShowProductsButton from "./ShowProductsButton.js";
import Swal from 'sweetalert2';

const AddProductForm = ({ setShowAddProductForm, sessionId, setLogin }) => {
    const [name, setName] = useState("")
    const [expiration, setExpiration] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [batch, setBatch] = useState("")

    const resetForm = () => {
        setName("");
        setExpiration("");
        setPrice("");
        setQuantity("");
        setBatch("");
    };

    const addProduct = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://depositbackend.onrender/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, expiration, price, quantity, batch })
            });
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Product added successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
                resetForm();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'All fields must be valid',
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Navigation setLogin={setLogin} sessionId={sessionId} title="ADD PRODUCT" secondButton={<ShowProductsButton setShowAddProductForm={setShowAddProductForm} />} />
            <div className="add-product-container">
                <div className="add-product-form">
                    <form className="login-form-items" onSubmit={addProduct}>
                        <input
                            type="text" 
                            placeholder="Product name" 
                            value={name} 
                            onChange={e => setName(e.target.value)}
                        />
                        <input 
                            type="number" 
                            placeholder="Price" 
                            value={price} 
                            onChange={e => setPrice(e.target.value)}
                        />
                        <input 
                            type="date" 
                            placeholder="Expiration" 
                            value={expiration} 
                            onChange={e => setExpiration(e.target.value)}
                        />
                        <input 
                            type="number" 
                            placeholder="Quantity" 
                            value={quantity} 
                            onChange={e => setQuantity(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Batch" 
                            value={batch} 
                            onChange={e => setBatch(e.target.value)}
                        />
                        <button type="submit">Add product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProductForm

