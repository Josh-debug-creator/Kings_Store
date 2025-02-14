import React, { useState } from "react"
import { PaystackButton } from "react-paystack"
import "./Payment.css"
import PaystackPop from '@paystack/inline-js'

const Payment = () => {
  const publicKey = "pk_test_24e2a22c4d14766433b8e933eda71e1d3f197138"
  const amount = 1000000
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  // const componentProps = {
  //   email,
  //   amount,
  //   metadata: {
  //     name,
  //     phone,
  //   },
  //   publicKey,
  //   text: "Pay Now",
  //   onSuccess: () =>
  //     alert("Thanks for doing business with us! Come back soon!!"),
  //   onClose: () => alert("Wait! Don't leave :(")
  // };
const payWithPaystack = (e) => {
  e.preventDefault()
  const paystack = new PaystackPop ()
  paystack.newTransaction({
    key: publicKey,
    amount:amount,
    email,
    name,
    phone
  });
  
}

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div className="container col-10 col-md-6 col-lg-4 p-4 bg-white rounded shadow">
        {/* order details */}

        {/* <div className="item"> */}
        <h3 className="text-center mb-4">Make Payment</h3>
        {/* <img /> */}
        {/* order details */}
        {/* <div className="item-details">
            <p>Dancing Shoes</p>
            <p>{amount}</p>
          </div> */}
        {/* </div> */}
        <div className="checkout-form">
          <form onSubmit={payWithPaystack}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                className="form-control"
                id="amount"
                // value={amount}
              />
            </div>
            <div className="form-submit w-100">
              {/* <PaystackButton {...componentProps} /> */}
              <button className="btn submit-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;