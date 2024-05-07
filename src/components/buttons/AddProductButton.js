import React from "react";

const AddProductButton = ({ setShowAddProductForm, setShowExpiredProducts }) => {
    const showAddProductForm = () => {
        setShowExpiredProducts(false)
        setShowAddProductForm(true)
    }

    return (
        <button className='show-add-product nav-button-display' onClick={() => showAddProductForm()}>Add product</button>
    )
}

export default AddProductButton

