import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductComponent from "./ProductComponent.jsx";
import { CartContext } from "../CartContext.jsx";
import CartComponent from "../Cart/CartComponent.jsx";
import { Link, NavLink } from "react-router-dom";

const products = [
  {
image:  "../public/Images/3D delivery boy on scooter illustration.jpeg", 
    _id: "11",
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
  },
  {
  image:  "../public/Images/3D delivery boy on scooter illustration.jpeg",
    _id: "12",
    name: "Vanilla Bean Crème ",
    category: "Crème Brûlée",
    price: 7.0,
  },
  {
     image:  "../public/Images/3D delivery boy on scooter illustration.jpeg",
    _id: "13",
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
  },
  {
    image:  "../public/Images/3D delivery boy on scooter illustration.jpeg",
     _id: "14",
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
  }
]

const categories = [
  {name:'clothes', _id:'1'},
  {name:'shoes', _id: '2'} ,
  {name:'watches', _id: '3'},
  {name:'phones', _id: '4'}
]


const ProductList = () => {
  // const [products, setProducts] = useState([]); // State for products
  // const [categories, setCategories] = useState([]); // State for categories
  // const [selectedCategoryIds, setSelectedCategoryIds] = useState([]); // Holds the IDs of selected categories
  const { addToCart, deleteFromCart,removeFromCart, cart } = useContext(CartContext);
const orderTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const navigate = useNavigate();
  // Fetch all products
  // const fetchProducts = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/api/product/");
  //     if (response.data.success) {
  //       setProducts(response.data.message);
  //     } else {
  //       console.error("Failed to fetch products:", response.data.message);
  //     }
  //   } catch (err) {
  //     console.error("Error fetching products:", err.message);
  //   }
  // };

  // Fetch all categories
  // const fetchCategories = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/api/category/");
  //     if (Array.isArray(response.data)) {
  //       setCategories(response.data);
  //     } else {
  //       console.error("Unexpected category data:", response.data);
  //     }
  //   } catch (err) {
  //     console.error("Error fetching categories:", err.message);
  //   }
  // };

  // Fetch products by selected categories
  // const fetchProductsByCategory = async (categoryIds) => {
  //   try {
  //      const query = categoryIds.length > 0 ? `?categoryIds=${categoryIds.join(",")}` : "";
  //   const response = await axios.get(`http://localhost:3000/api/product${query}`);
  
  //     if (response.data.success) {
  //       console.log(response.data.message)
  //       setProducts(response.data.message);
  //     } else {
  //       console.error("Failed to fetch products by category:", response.data.message);
  //     }
  //   } catch (err) {
  //     console.error("Error fetching products by category:", err.message);
  //   }
  // };

  // Fetch products and categories on mount
  // useEffect(() => {
  //   fetchProducts();
  //   fetchCategories();
  // }, []);

  // Update products when selected categories change
  // useEffect(() => {
  //   if (selectedCategoryIds.length === 0) {
  //     fetchProducts(); // Fetch all products
  //   } else {
  //     fetchProductsByCategory(selectedCategoryIds); // Fetch filtered products
  //   }
  // }, [selectedCategoryIds]);

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId) // Remove if already selected
        : [...prev, categoryId] // Add if not selected
    );
  };

  const handleConfirmOrder = () => {
  const token = localStorage.getItem("token");
  if (token) {
    // Route to orders page
    navigate("/order");
  } else {
    // Redirect to login page
    navigate("/login");
  }
};


  return (
    <div className="product-list px-2">
      <h1 className="pb-3">PRODUCTS</h1>
      <div className="md-row d-md-flex justify-content-between align-items-start m-2 gap-3">
        {/* Categories Section */}
        <div className="col-md-2  mx-auto">
          <h2 className="fw-bold">Categories</h2>
          <div className="col-4 d-flex align-items-start justify-content-between flex-column">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div
                  key={category._id}
                  className="d-flex justify-content-center align-items-center"
                >
                  <input
                    type="checkbox"
                    id={`category-${category._id}`}
                    // checked={selectedCategoryIds.includes(category._id)}
                    // onChange={() => handleCategoryChange(category._id)}
                  />
                  <label htmlFor={`category-${category._id}`} className="px-2">
                    {category.name}
                  </label>
                </div>
              ))
            ) : (
              <p>No categories available</p>
            )}
          </div>
        </div>

        {/* Products Section */}
        <div className="col-md-6 text-center mx-auto">
          <h2 className="fw-bold">Products</h2>
          <div className="row">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  className="col-12 col-md-6 col-lg-4 mb-4"
                  key={product._id}
                >
                  <ProductComponent
                    image={product.image}
                    name={product.name}
                    category={product.category}
                    price={product.price}
                    id={product._id}
                    // quantity={product.quantity}
                    addToCart={() => addToCart(product)}
                    deleteFromCart={() => removeFromCart(product._id)}
                  />
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>

        {/* Cart Section */}

        <div className="col-md-2  mx-auto mx-2">
          <h2 className="fw-bold text-center">CART</h2>
          {cart.length === 0 ? (
            <div>
              <img
                src="../public/Images/illustration-empty-cart.svg"
                alt="Empty Cart"
                className="w-50"
              />
              <p>Your added items will appear here.</p>
            </div>
          ) : (
            // display the cart
            <div>
              {cart.map((product) => {
                return(
                     <CartComponent
                  key={product._id}
                  name={product.name}
                  quantity={product.quantity}
                  price={product.price.toFixed(2)}
                  id={product._id}
                />
                // console.log(cart)
                )
              })}

              {cart.length > 0 && (
                <>
                  <div className="d-flex align-items-center justify-content-between mt-4 mb-4">
                    <div className="fw-bold">Order Total</div>
                    <div className="fw-bold">${orderTotal.toFixed(2)}</div>
                  </div>
                  {/* <NavLink to="/order"> */}
                    <button
                      className="fw-bold w-100 p-2 btn btn-success border-rounded"
                    onClick={handleConfirmOrder}

                    >
                      Confirm order
                    </button>
                  {/* </NavLink> */}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

// when u click on confirm order, it should check for token before routing to orders page, else rediect to login page