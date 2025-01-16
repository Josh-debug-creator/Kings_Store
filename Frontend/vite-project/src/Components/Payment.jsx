import React, { useState } from "react";
import axios from "axios";
// import { usePaystackPayment } from "react-paystack";
import { PaystackButton } from "react-paystack"
import "./Payment.css"


const PaystackPayment = () => {
  const [amount, setAmount] = useState(0);
    const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const publicKey = "YOUR_PAYSTACK_PUBLIC_KEY"; // Replace with your Paystack public key

  // const initializePayment = usePaystackPayment({
  //   reference: new Date().getTime().toString(),
  //   email,
  //   amount: amount * 100, // Convert to kobo
  //   publicKey,
  // });

  // const handlePayment = () => {
  //   initializePayment(
  //     (response) => {
  //       // Success Callback
  //       console.log("Payment Successful", response);
  //       verifyPayment(response.reference);
  //     },
  //     (error) => {
  //       // Error Callback
  //       console.error("Payment Error", error);
  //     }
  //   );
  // };

  // const verifyPayment = async (reference) => {
  //   try {
  //     const response = await axios.get(`/api/paystack/verify/${reference}`);
  //     if (response.data.success) {
  //       alert("Payment Verified Successfully!");
  //     } else {
  //       alert("Payment Verification Failed!");
  //     }
  //   } catch (error) {
  //     console.error("Error Verifying Payment:", error.message);
  //   }
  // };

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! Don't leave :("),
  }

  return (
    // <div>
    //   <h1>Payment Page</h1>
    //   <div>
    //     <div>Payment</div>
    //     <div>Card Details</div>
    //   </div>
    // </div>
    // <div>
    //   <h1>Make Payment</h1>
    //   <input
    //     type="email"
    //     placeholder="Enter your email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <input
    //     type="number"
    //     placeholder="Enter amount"
    //     value={amount}
    //     onChange={(e) => setAmount(e.target.value)}
    //   />
    //   <button onClick={handlePayment}>Pay Now</button>
    // </div>
      <div className="payment_App">
      <div className="container">
        <div className="item">
          <img />
          <div className="item-details">
            <p>Dancing Shoes</p>
            <p>{amount}</p>
          </div>
        </div>
        <div className="checkout-form">
          <form>
            <label>Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email</label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Phone</label>
            <input
              type="text"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </form>
          <PaystackButton {...componentProps} />
        </div>
      </div>
    </div>
  );
};

export default PaystackPayment;




