import React, { useEffect } from "react";
import "./ExpiredProducts.css"
import Navigation from "../navigation/Navigation.js";
import AddProductButton from "../buttons/AddProductButton.js";
import ShowProductsButton from "../buttons/ShowProductsButton.js";
import Spinner from "../spinner/Spinner.js";

const ExpiredProducts = ({ expiredProducts, setExpiredProducts, setLogin, loading, setLoading, setShowAddProductForm, setShowExpiredProducts }) => {

    const getExpiredProducts = async () => {
        try {
            setLoading(true);
            const responseProducts = await fetch("https://depositbackend.onrender.com/products")
            if (!responseProducts.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await responseProducts.json();
            const expiredProductsData = data.payload.filter(product => product.expirated);
            setExpiredProducts(expiredProductsData);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const deleteProduct = async (productId) => {
        try {
            setLoading(true);
            const responseDelete = await fetch(`https://depositbackend.onrender.com/products/${productId}`, {
                method: "DELETE"
            });
            if (!responseDelete.ok) {
                throw new Error("Failed to delete product");
            }
        } catch (error) {
            console.log(error);
        } finally {
            await getExpiredProducts()
            setLoading(false);
        }
    }

    useEffect(() => {
        getExpiredProducts();
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
            <Navigation setShowAddProductForm={setShowAddProductForm} setShowExpiredProducts={setShowExpiredProducts} setLogin={setLogin} title="EXPIRED PRODUCTS" thirdButton={<ShowProductsButton setShowAddProductForm={setShowAddProductForm} setShowExpiredProducts={setShowExpiredProducts} loading={loading} setLoading={setLoading} />} secondButton={<AddProductButton setShowAddProductForm={setShowAddProductForm} setShowExpiredProducts={setShowExpiredProducts} />} />
            
            <div className='card-container'>
                {expiredProducts.map(product => (
                    <div className="item-card-container">
                        <p className="p-card">Stock: {product.stock}</p>
                        <p className="p-card name">{product.name}</p>
                        <button className="button-card" onClick={() => deleteProduct(product._id)}>X</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExpiredProducts