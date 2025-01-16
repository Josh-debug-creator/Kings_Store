import productInstance from "../Services/product.service.js";
import categoryInstance from "../Services/category.service.js";
import uploadFile from "../Utilities/upload.utils.js";

// Create a product

// export const createProduct = async (req, res) => {
//   try {
//     const { name, description, price, categoryId, quantity } = req.body;

//     // Debugging request body
//     console.log("Request body:", req.body);

//     // Validate images
//     console.log("Files:", req.files);
//     const image1 = req.files?.image1?.[0];
//     const images = [image1].filter((item) => item !== undefined);

//     if (images.length === 0) {
//       return res.status(400).json({ error: "At least one image is required." });
//     }

//     // Upload images to Cloudinary
//     const imagesUrl = await Promise.all(
//       images.map(async (item) => {
//         console.log("Uploading file:", item.path);
//         const result = await uploadFile(item.path, {
//           resource_type: "image",
//         });

//         console.log("Secure URL:", result);
//         if (!result) {
//           throw new Error("Image upload failed.");
//         }

//         return result.secure_url;
//       })
//     );

//     // Check if category exists
//     console.log("Category ID:", categoryId);
//     const category = await categoryInstance.findOneCategory(categoryId);
//     console.log("Category:", category);

//     if (!category) {
//       return res.status(404).json({ error: "Category not found." });
//     }

//     // Create product details
//     // const productDetails = {
//     //   name,
//     //   description,
//     //   price,
//     //   categoryId: category._id,
//     //   images: imagesUrl,
//     //   quantity,
//     // };
//     // console.log("Product details:", productDetails);

//     // Save product
//     const newProduct = await productInstance.createProduct({
//       name,
//       description,
//       price,
//       categoryId: category._id,
//       image: imagesUrl,
//       quantity,
//   });
//     console.log("New product:", newProduct);

//     res.status(201).json({ success: true, product: newProduct });
//   } catch (error) {
//     console.error("Error creating product:", error.message);
//     res.status(500).json({
//       error: "An error occurred while creating the product.",
//       details: error.message,
//     });
//   }
// };


// Create a product

// export const createProduct = async (req, res) => {
//   try {
//     const { name, description, price, categoryId, quantity } = req.body;

//     // Debugging request body
//     console.log("Request body:", req.body);

//     // Validate images
//     if (!req.files || !req.files.image1 || !req.files.image) {
//       console.log("At least one image is required." )
//       return res.status(400).json({ error: "At least one image is required." });
//     }

//     const image1 = req.files.image1[0]; // Assumes multer handles file upload
//     console.log("Uploaded file:", image1);

//     // Upload image to Cloudinary
//     console.log("Uploading image to Cloudinary...");
//     const uploadResult = await uploadFile(image1.path, {
//       resource_type: "image",
//     });

//     if (!uploadResult || !uploadResult.secure_url) {
//       throw new Error("Image upload to Cloudinary failed.");
//     }

//     const imageUrl = uploadResult.secure_url; // Cloudinary URL
//     console.log("Image uploaded to Cloudinary:", imageUrl);

//     // Check if category exists
//     console.log("Validating category ID:", categoryId);
//     const category = await categoryInstance.findOneCategory(categoryId);

//     if (!category) {
//       return res.status(404).json({ error: "Category not found." });
//     }

//     // Create product details
//     const productDetails = {
//       name,
//       description,
//       price: parseFloat(price), // Ensure price is a number
//       categoryId: category._id,
//       image: imageUrl, // Save Cloudinary URL
//       quantity: parseInt(quantity, 10), // Ensure quantity is an integer
//     };
//     console.log("Product details to save:", productDetails);

//     // Save product
//     const newProduct = await productInstance.createProduct(productDetails);
//     console.log("New product created:", newProduct);

//     res.status(201).json({ success: true, product: newProduct });
//   } catch (error) {
//     console.error("Error creating product:", error.message);
//     res.status(500).json({
//       error: "An error occurred while creating the product.",
//       details: error.message,
//     });
//   }
// };

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId, quantity } = req.body;

    // Validate the file
    if (!req.files || !req.files.image1) {
      return res.status(400).json({ error: "Image file is required." });
    }

    const imageFile = req.files.image1[0];

    // Upload to Cloudinary
    const uploadResult = await uploadFile(imageFile.path, {
      resource_type: "image",
    });

    if (!uploadResult || !uploadResult.secure_url) {
      throw new Error("Image upload failed.");
    }

    const imageUrl = uploadResult.secure_url;

    // Validate category
    const category = await categoryInstance.findOneCategory(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    // Create product
    const newProduct = await productInstance.createProduct({
      name,
      description,
      price: parseFloat(price),
      categoryId: category._id,
      image: imageUrl,
      quantity: parseInt(quantity, 10),
    });

    res.status(201).json({ success: true, message: newProduct });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Find all products
export const findAllProducts = async (req, res) => {
  try {
    const products = await productInstance.findProduct();
    // console.log(products)
    res.status(200).json({success: true, message: products});
  } catch (error) {
    console.error("Error finding products:", error);
    res
      .status(500)
      .json({ success: true, message: "An error occurred while fetching products." });
  }
};

// Find one product
export const findOneProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productInstance.findOneProduct(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error finding product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the product." });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;

    const product = await productInstance.findOneProduct(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    const updatedProduct = await productInstance.updateOneProduct(
      productId,
      data
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the product." });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await productInstance.deleteOneProduct(productId);
    res.status(200).json({ message: `Product with ID ${productId} deleted.` });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the product." });
  }
};


// find product by id
 export const findProductById = async (req, res) => {
  try {
    const { categoryId } = req.query;
  if (!categoryId) {
    return res.status(400).json({success:false, error: "Product ID is required" });
  }
    // Fetch products based on the categoryId
    const query = categoryId ? { categoryId: categoryId } : {};
    const products = await productInstance.findOneProduct(categoryId)
   

    res.status(200).json({success: true, message:products});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};






// router.get("/", async (req, res) => {
//   try {
//     // Extract categoryIds from the query string
//     const { categoryIds } = req.query;

//     // Initialize query object
//     let query = {};

//     // If categoryIds exist in the query, filter by them
//     if (categoryIds) {
//       const categoryIdArray = categoryIds.split(","); // Split the comma-separated string into an array
//       query.categoryId = { $in: categoryIdArray }; // Use MongoDB's $in operator to filter
//     }

//     // Fetch products based on the query
//     const products = await Product.find(query);

//     // Respond with success and products
//     res.status(200).json({
//       success: true,
//       message: products,
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching products",
//     });
//   }
// });

