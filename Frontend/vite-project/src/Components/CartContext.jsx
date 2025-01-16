import { createContext, useState, useEffect } from "react";

// Create Context
export const CartContext = createContext();

// Create Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

useEffect(() => {
  console.log("Cart updated:", cart);
}, [cart]);




const addToCart = (product) => {
  return console.log("Product being added:", product);
  // setCart((prevCart) => {
  //  const existingProduct = prevCart.find((item) => {
//   console.log(`Comparing: ${item?._id || "undefined"} with ${product?._id || "undefined"}`);
//   return item?._id === product?._id;
// });


  //   if (existingProduct) {
  //     return prevCart.map((item) =>
  //       item._id === product._id
  //         ? { ...item, quantity: item.quantity + 1 }
  //         : item
  //     );
  //   } else {
  //     return [...prevCart, { ...product, quantity: 1 }];
  //   }
  // });
};





const removeFromCart = (id) => {
  setCart((prevCart) =>
    prevCart
      .map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0)
  );
};


// delete item
// map through the array and if the id is the same, check if the quantity is greater than 0
  const deleteFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, deleteFromCart }}>
      {children}
    </CartContext.Provider>
  );
};



