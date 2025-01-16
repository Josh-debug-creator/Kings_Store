import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const Order = () => {
  const { cart } = useContext(CartContext);
  const orderTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="order-container container-fluid text-center">
      {cart.length === 0 ? (
    <>
            <img
              src="../../public/Images/illustration-empty-cart.svg"
              alt="Empty Cart"
              className="w-50 mx-auto"
            ></img>
            <p className="text-center">Your cart is empty.</p>
          </>
      ) : (
        <div className="px-2">
        <div className="w-25 mx-auto pt-2">
            <img
            src="../../public/Images/icon-order-confirmed.svg"
            alt="Order Confirmed"
            className="order-confirmation-icon w-25"
          />
          </div>
          <h1 className="fw-bold">Order Confirmed</h1>
          <p>We hope you enjoy your Products!</p>

          {/* Display cart items */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="d-flex row justify-content-between align-items-center mb-3"
            >
              {/* Product Image */}
              <div className="col-3">
                <div className="">
                  <img src={item.image} alt={item.name} className="w-100" />
                </div>
              </div>

              {/* Product Details */}
              {/* <div className="col-6"> */}
              <div className=" col-6 d-flex flex-column justify-content-start align-items-start">
                <p className="fw-bold">{item.name}</p>
                <div className="d-flex justify-content-start gap-3">
                  <div>{item.quantity}x</div>
                  <div>${item.price.toFixed(2)}</div>
                </div>
              </div>
              {/* </div> */}

              {/* Total Price for Each Product */}
              <div className="col-3 text-end fw-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          {/* Order Total */}
          <div className="d-flex align-items-center justify-content-between mt-4 mb-4 pt-4">
            <div className="fw-bold">Order Total</div>
            <div className="fw-bold">${orderTotal.toFixed(2)}</div>
          </div>
          {/* make payment */}
          <button className="btn btn-primary mb-3 col-6">Make Payment</button>
        </div>
      )}
    </div>
  );
};

export default Order;
