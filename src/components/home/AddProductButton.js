import React from "react";

const AddProductButton = ({ setShowAddProductForm }) => {
    return (
        <button className='show-add-product' onClick={() => setShowAddProductForm(true)}>Add product</button>
    )
}

export default AddProductButton

