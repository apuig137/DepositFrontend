import React from "react";

const ShowProductsButton = ({ setShowAddProductForm }) => {
    return (
        <button className='show-products' onClick={() => setShowAddProductForm(false)}>Show products</button>
    )
}

export default ShowProductsButton

