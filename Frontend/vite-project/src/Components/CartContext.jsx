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
  // return console.log("Product being added:", product);
  setCart((prevCart) => {
   const existingProduct = prevCart.find((item) => {
  console.log(`Comparing: ${item?.id || "undefined"} with ${product?.id || "undefined"}`);
  return item?.id === product?.id;
});


    if (existingProduct) {
      return prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      return [...prevCart, { ...product, quantity: 1 }];
    }
  });
};





const removeFromCart = (id) => {
  setCart((prevCart) =>
    prevCart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0)
  );
};


// delete item

 const deleteFromCart = (id) => {
  console.log("Deleting product with id:", id);
  setCart((prevCart) => {
    const updatedCart = prevCart.filter((item) => item.id !== id);
    console.log("Updated Cart:", updatedCart);
    return updatedCart;
  });
};


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, deleteFromCart }}>
      {children}
    </CartContext.Provider>
  );
};



