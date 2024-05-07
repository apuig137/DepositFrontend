import React from "react";

const ShowProductsButton = ({ setShowAddProductForm, setShowExpiredProducts }) => {
    const showProducts = () => {
        setShowExpiredProducts(false)
        setShowAddProductForm(false)
    }

    return (
        <button className='show-products nav-button-display' onClick={() => showProducts()}>Show products</button>
    )
}

export default ShowProductsButton

