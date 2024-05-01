import React, { useState } from "react";
import "./AddProductForm.css"
import Navigation from "../navigation/Navigation.js";
import ShowProductsButton from "./ShowProductsButton.js";
import Swal from 'sweetalert2';
import Spinner from "../spinner/Spinner.js";

const AddProductForm = ({ setShowAddProductForm, setLogin, loading, setLoading }) => {
    const [name, setName] = useState("")
    const [expiration, setExpiration] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")

    const resetForm = () => {
        setName("");
        setExpiration("");
        setPrice("");
        setQuantity("");
    };

    const addProduct = async (e) => {
        e.preventDefault()
        try {
            setLoading(true);
            const response = await fetch('https://depositbackend.onrender.com/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, expiration, price, quantity })
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
                let errorMessage = "An unknown error occurred";
                if(response.status === 400) {
                    errorMessage = "All fields are required"
                }
                if(response.status === 401) {
                    errorMessage = "Price and quantity must be numbers"
                }
                if (response.status === 402) {
                    errorMessage = "Quantity and price must be positive"
                }
                if (response.status === 403) {
                    errorMessage = "The product is expired"
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    if(loading){
        return (
            <div>
                <Spinner/>
            </div>
        )
    }

    return (
        <div>
            <Navigation setLogin={setLogin} title="ADD PRODUCT" secondButton={<ShowProductsButton setShowAddProductForm={setShowAddProductForm} loading={loading} setLoading={setLoading} />} />
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
                        <button type="submit">Add product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProductForm

