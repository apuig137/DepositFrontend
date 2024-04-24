import React, { useEffect } from 'react';
import "./Home.css"
import Navigation from '../navigation/Navigation.js';
import AddProductButton from './AddProductButton.js';
import Spinner from '../spinner/Spinner.js';

const Home = ({ products, setProducts, setLogin, setShowAddProductForm, loading, setLoading }) => {

    const getProducts = async () => {
        try {
            setLoading(true);
            const responseProducts = await fetch("https://depositbackend.onrender.com/products")
            const data = await responseProducts.json();
            const productsApi = data.payload
            if (responseProducts.ok) {
                setProducts(productsApi);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const deleteProduct = async (productId) => {
        try {
            const responseDelete = await fetch(`http://localhost:8080/products/${productId}`, {
                method: "DELETE"
            });
            if (responseDelete.ok) {
                const updatedProducts = products.map(product => {
                    if (product._id === productId) {
                        return { ...product, stock: product.stock - 1 };
                    }
                    return product;
                });
                setProducts(updatedProducts);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getProducts();
    }, []);

    if(loading){
        return (
            <div>
                <Spinner/>
            </div>
        )
    }

    return (
        <div>
            <Navigation setLogin={setLogin} title="STOCK" secondButton={<AddProductButton setShowAddProductForm={setShowAddProductForm} loading={loading} setLoading={setLoading} />} />
            
            <div className='card-container'>
                {products.map(product => (
                    <div className="item-card-container">
                        <p className="p-card">Stock: {product.stock}</p>
                        <p className="p-card name">{product.name}</p>
                        <button className="button-card" onClick={() => deleteProduct(product._id)}>X</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;

