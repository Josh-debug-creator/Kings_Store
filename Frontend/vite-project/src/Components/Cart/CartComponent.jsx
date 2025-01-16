import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../CartContext.jsx";



const CartComponent = ({name, quantity, price, id}) => {
       const { addToCart, deleteFromCart, cart } = useContext(CartContext);
  return (
<div
                  className="  cart-item d-flex align-items-center justify-content-between"
                  key={id}
                >
                  {/* product details */}
                  <div className="d-flex align-items-start justify-content-start flex-column">
                    {/* product name */}
                    <div className="fw-bold">{name}</div>
                    {/* other product details */}
                    <div className="d-flex align-items-start justify-content-start gap-3 ">
                      <div className="">{quantity}x</div>
                      <div className="">${price}</div>
                      {/* Total Price for Each Product */}
                      <div className="col-3 text-end fw-bold">
                        ${(price * quantity)}
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* delete button */}
                    <button
                      onClick={() => deleteFromCart(id)}
                      className="btn btn-primary mb-3"
                    >
                      Remove
                    </button>
                  </div>
                </div>


    // <div>
    //     {/* <h1>Cart</h1> */}
    //     {cart.length === 0 ? (
    //       <>
    //         <img
    //           src="../public/Images/illustration-empty-cart.svg"
    //           alt="Empty Cart"
    //           className="w-50"
    //         ></img>
    //         <p>Your added items will appear here.</p>
    //       </>
    //     ) : (
    //       <div>
    //         {cart.map((product) => {
    //           console.log(cart);
    //           return (
                
    //           );
    //         })}
    //       </div>
    //     )}
    // </div>
  )
}

export default CartComponent
