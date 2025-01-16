import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateCategories({ token }) {
  const navigate = useNavigate();

  // State Variables
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Handle Submit
  const onSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    // console.log("Retrieved token:", token);

    if (!token) {
      console.error("Token is missing. Please log in again.");
      return;
    }
    // Basic Validation
    if (!name.trim() || !description.trim()) {
      console.error("Both name and description are required.");

      return;
    }
    try {
      //  const formData = new FormData();
      //   formData.append("name", name.trim());
      //   formData.append("description", description.trim());
      //   console.log(formData)
      //   console.log(name, description)

      const data = { name: name.trim(), description: description.trim() };
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // const config = {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     Authorization: `Bearer ${token}`,
      //   },
      // };

      // console.log("Authorization Header:", config.headers.Authorization);

      const response = await axios.post(
        "http://localhost:3000/api/category/create",
        data,
        config
      );

      if (response.data.success) {
        console.log("Category created:", response.data.message);
        // Reset form
        setName("");
        setDescription("");
        // Navigate or provide feedback
        navigate("/list");
      } else {
        console.error("Failed to create category:", response.data.message);
      }
    } catch (err) {
      console.error("Error creating category:", err.message);
    }
  };

  return (
    <section className="container createPage">
      <div className="row border border-gray border-radius w-100 p-4">
        <div className="col-10 mx-auto">
          <h1 className="text-uppercase fw-bold mt-2 text-center">
            Create new Category
          </h1>
        </div>
        <div className="row mx-auto text-center">
          <form
            className="text-center col-md-8 mx-auto"
            encType="multipart/form-data"
            onSubmit={onSubmit}
          >
            <div className="col-12 mt-2 form-group">
              <label htmlFor="name" className="w-100 mb-3">
                <input
                  className="p-2 w-75"
                  placeholder="Category name"
                  // name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>

            <div className="col-12 mt-2 form-group">
              <label htmlFor="description" className="w-100 mb-3">
                <input
                  className="p-2 w-75"
                  placeholder="Category description"
                  type="text"
                  // name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </div>

            <button className="btn btn-primary mt-3 w-75 mx-auto">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateCategories;
