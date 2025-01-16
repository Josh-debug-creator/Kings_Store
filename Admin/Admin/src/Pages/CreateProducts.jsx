import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreateProduct = ({token}) => {
  const navigate = useNavigate();

  // State Variables
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // Initialize as null
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [categories, setCategories] = useState([]); // Store categories
  const [errors, setErrors] = useState({}); // Handle form errors

  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Product name is required.";
    if (!price || price <= 0)
      newErrors.price = "Product price must be greater than 0.";
    if (!categoryId) newErrors.categoryId = "Please select a category.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!quantity || quantity <= 0)
      newErrors.quantity = "Quantity must be greater than 0.";
    if (!image) newErrors.image = "Image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if valid
  };

  // Submit Handler
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(image)
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      if (image) formData.append("image1", image);
      formData.append("quantity", quantity);
      formData.append("categoryId", categoryId);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(token)
      console.log("Authorization Header:", config.headers.Authorization);


      const response = await axios.post(
        "http://localhost:3000/api/product/create",
        formData,
        config
      );

      if (response.data.success) {
        console.log("Product created:", response.data.message);
        // Reset form
        setName("");
        setPrice("");
        setDescription("");
        setImage(null);
        setQuantity("");
        setCategoryId("");

        // Navigate or give feedback to the user
        navigate("/products");
      } else {
        console.error("Failed to create product:", response.data.message);
      }
    } catch (err) {
      console.error("Error creating product:", err.message);
    }
  };

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/category/");
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error("Unexpected category data:", response.data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="container createProduct">
      <div className="row border border-gray border-radius w-100 p-4">
        <div className="col-10 mx-auto">
          <h1 className="text-uppercase fw-bold mt-2 text-center">
            Create New Product
          </h1>
        </div>
        <div className="row mx-auto text-center">
          <form
            className="text-center col-md-8 mx-auto"
            onSubmit={onSubmit}
            encType="multipart/form-data"
          >
            {/* Category Selection */}
            <div className="col-12 mt-2 form-group">
              <label htmlFor="categoryId" className="w-100 mb-3">
                <select
                  className="p-2 w-75"
                  id="categoryId"
                  name="categoryId"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))
                  ) : (
                    <option value="">No categories available</option>
                  )}
                </select>
                {errors.categoryId && (
                  <p className="text-danger">{errors.categoryId}</p>
                )}
              </label>
            </div>

            {/* Product Fields */}
            <div className="col-12 mt-2 form-group">
              <input
                className="p-2 w-75"
                placeholder="Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="text-danger">{errors.name}</p>}
            </div>

            <div className="col-12 mt-2 form-group">
              <input
                className="p-2 w-75"
                type="number"
                placeholder="Product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price && <p className="text-danger">{errors.price}</p>}
            </div>

            <div className="col-12 mt-2 form-group">
              <input
                className="p-2 w-75"
                type="file"
                name="image1"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {errors.image && <p className="text-danger">{errors.image}</p>}
            </div>

            <div className="col-12 mt-2 form-group">
              <textarea
                className="p-2 w-75"
                placeholder="Product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <p className="text-danger">{errors.description}</p>
              )}
            </div>

            <div className="col-12 mt-2 form-group">
              <input
                className="p-2 w-75"
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              {errors.quantity && (
                <p className="text-danger">{errors.quantity}</p>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary mt-3 w-75 mx-auto">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateProduct;
