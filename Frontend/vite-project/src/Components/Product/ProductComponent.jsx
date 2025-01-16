import "./ProductComponent.css"
import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../CartContext.jsx";

function ProductComponent({
  image,
  name,
  category,
  price,
  _id,
  quantity = 0, // Default to 0 if quantity is not provided
}) {
  const { addToCart, removeFromCart, cart } = useContext(CartContext);

  return (
    <div className="card p-3">
      <img src={image} alt={name} className="image w-100" />
      <div className="Add-to-cart btn-group w-auto">
        <div className="cart-btn py-2 m-auto w-100 my-2">
          <img
            src="../public/Images/icon-add-to-cart.svg"
            alt="icon-add-to-cart"
            className="cart-img px-1 w-25"
          ></img>
          <div className="m-auto fw-medium w-100">Add to cart</div>
        </div>
        <div className="px-1">
          <div className="quality-controller">
            <button
              className="plus-cart btn btn-secondary"
               onClick={() => addToCart({ name, image, price, _id: id, quantity: 1 })}
            >
              +
            </button>
            <div className="cart-no">{quantity}</div>
            <button
              className="minus-cart btn btn-secondary"
              onClick={() => removeFromCart(id)}
            >
              -
            </button>
          </div>
        </div>
      </div>
      <div className="cart_details">
        <div>{category}</div>
        <div className="fw-bold">{name}</div>
        <div className="text-body-primary">${price.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default ProductComponent;


// check if category exists before creating category