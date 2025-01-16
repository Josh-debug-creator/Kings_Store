import axios from "axios";
import React, { useEffect, useState } from "react";
import { currency } from "../App";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  // console.log(list)
  // fetch list
const fetchList = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/product/");
    // console.log(response.data);
    if (response.data.success) {
      setList(response.data.products);
      // console.log(list)
    } else {
      console.error(response.error.message);
    }
  } catch (error) {
    console.error("Error fetching product list:", error.message);
  }
};

useEffect(() => {
  fetchList();
}, [fetchList]);


  // delete product from list
  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/product/${id}`
      );
      if (response.data.success) {
        // Remove the product from the local state
        setList((prevList) => prevList.filter((item) => item._id !== id));
        console.log("Product removed successfully");
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error removing product:", error.message);
    }
  };

  return (
    <div className="container">
      <h2>Product List</h2>
      {/* <div className="d-none d-md-flex gap-5"> */}
      <div className="d-flex justify-content-between align-items-center">
        <b className="me-5 pe-5">Image</b>
        <b className="me-5">Name</b>
        <b className="me-4">Price</b>
        <b className="me-3">Action</b>
      </div>
      {list.map((item, index) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center mb-4"
            key={index}
          >
            <img
              src={Array.isArray(item.image) && item.image[0]}
              className="w-25"
              alt={item.name}
            />

            <p>{item.name}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <button onClick={() => removeProduct(item._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default List;
