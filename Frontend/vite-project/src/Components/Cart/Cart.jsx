import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../CartContext.jsx";
import { Link, NavLink } from "react-router-dom";

const Cart = ()=> {
   const { cart } = useContext(CartContext);

const orderTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
const [productQuantity, setProductQuantity]  = useState(0)
const handleProductQuantity = ()=>{
  setProductQuantity((prev) => {
    prev + 1
  })
}

  return (
    <div className="cart">
      {/* return the cart based on order placed */}
      <div>
        <h1>Cart</h1>
        {cart.length === 0 ? (
          <>
            <img
              src="../public/Images/illustration-empty-cart.svg"
              alt="Empty Cart"
              className="w-50"
            ></img>
            <p>Your added items will appear here.</p>
          </>
        ) : (
          <div>
            {cart.map((product) => {
              console.log(cart);
              return (
                <div
                  className="row  cart-item d-flex align-items-center justify-content-between"
                  key={product.id}
                >
                  {/* product details */}
                  <div className="d-flex align-items-start justify-content-start flex-column">
                    {/* product name */}
                    <div className="fw-bold">{product.name}</div>
                    {/* other product details */}
                    <div className="d-flex align-items-start justify-content-start gap-3 ">
                      <div className="">{productQuantity}x</div>
                      <div className="">{product.price.toFixed(2)}</div>
                      {/* Total Price for Each Product */}
                      <div className="col-3 text-end fw-bold">
                        ${(product.price * product.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* delete button */}
                    <button
                      onClick={() => deleteFromCart(product.id)}
                      className="btn btn-primary mb-3 col-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {cart.length > 0 && (
          <>
            <div className="d-flex align-items-center justify-content-between mt-4 mb-4">
              <div>Order Total</div>
              <div>${orderTotal.toFixed(2)}</div>
            </div>
            <NavLink to="/order">
              <button
                className="fw-bold w-100 p-2 btn btn-success border-rounded"
                // onClick={confirmOrder}
              >
                Confirm order
              </button>
            </NavLink>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart

// functionality to ensure cart remains even when page is loaded