import React, { useEffect } from 'react';
import "./Home.css"
import Navigation from '../navigation/Navigation.js';
import AddProductButton from '../buttons/AddProductButton.js';
import ShowExpiredProductsButton from '../buttons/ShowExpiredProductsButton.js';
import Spinner from '../spinner/Spinner.js';

const Home = ({ products, setProducts, setLogin, setShowAddProductForm, setShowExpiredProducts, loading, setLoading }) => {

    const getProducts = async () => {
        try {
            setLoading(true);
            const responseProducts = await fetch("https://depositbackend.onrender.com/products")
            if (!responseProducts.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await responseProducts.json();
            const nonExpiredProducts = data.payload.filter(product => !product.expirated);
            setProducts(nonExpiredProducts);
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
            await getProducts()
            setLoading(false);
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
            <Navigation setShowAddProductForm={setShowAddProductForm} setShowExpiredProducts={setShowExpiredProducts} setLogin={setLogin} title="STOCK" thirdButton={<ShowExpiredProductsButton setShowAddProductForm={setShowAddProductForm} setShowExpiredProducts={setShowExpiredProducts} />} secondButton={<AddProductButton setShowAddProductForm={setShowAddProductForm} setShowExpiredProducts={setShowExpiredProducts} />} />
            
            <div>
                {products.map((product) => {
                    const dateObject = new Date(product.expiration);
                    const isoDateOnly = dateObject.toISOString().split("T")[0];
                        
                    return (
                        <div className="item-card-container">
                            <p className="p-card stock">Stock: {product.stock}</p>
                            <p className="p-card name">{product.name}</p>
                            <p className="p-card expiration">Expiration: {isoDateOnly}</p>
                            <button className="button-card" onClick={() => deleteProduct(product._id)}>X</button>
                        </div>
                    )
                })} 
            </div>
        </div>
    );
};

export default Home;

