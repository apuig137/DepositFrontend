import React from "react";

const ShowExpiredProductsButton = ({ setShowAddProductForm, setShowExpiredProducts }) => {
    const showExpiredProducts = () => {
        setShowExpiredProducts(true)
        setShowAddProductForm(false)
    }

    return (
        <button className='show-expired-products nav-button-display' onClick={() => showExpiredProducts()}>Expired products</button>
    )
}

export default ShowExpiredProductsButton

