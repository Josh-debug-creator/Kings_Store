import categoryInstance from "../Services/category.service.js";

// create category
// export const createNewCategory = async (req, res) => {
//   try {
//     const { name, description } = req.body;
//     console.log(name, description)
//     // Validate request body
//     if (!name || !description) {
//       console.log('name and description are required')
//       return res
//         .status(400)
//         .json({ success: false, message: "Name and description are required" });
//     }
//     // check if category already exists
//     const exists = await categoryInstance.categoryExists(name);
//     if (exists) {
//       res.status(400).json("Category already exists");
//     }

//     const newCategory = await categoryInstance.createCategory({
//       name,
//       description,
//     });
//     console.log(newCategory);
//     res.status(201).json({ success: true, message: newCategory });
//   } catch (error) {
//     // throw new Error(err);
//      console.error("Error creating category:", error.message);
//      res.status(500).json({ success: false, message: error.message });
//   }
// };

export const createNewCategory = async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    const { name, description } = req.body;
    if (!name || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Name and description are required" });
    }

    // check if category exists
    const cat = await categoryInstance.categoryExists(name)
    if (cat){
      console.log("category exists")
      return res.status(400).json({success:false, message:"Category exists"})
    }
// create category
    const newCategory = await categoryInstance.createCategory({
      name,
      description,
    });
    return res.status(201).json({ success: true, message: newCategory });
  } catch (error) {
    console.error("Error creating category:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


// find all categories

 export const findAllCategories = async (req, res) => {
  try {
    const allCategories = await categoryInstance.findCategory();

    // Log the categories to ensure they're fetched correctly
    // console.log("Fetched categories:", allCategories);

    // Check if no categories are found
    if (!allCategories || allCategories.length === 0) {
      return res.status(404).json({ success: false, message: "No categories found." });
    }

    // Return the categories if found
    // return res.status(200).json({ success: true, categories: allCategories });
    return res.status(200).json(allCategories);
  } catch (err) {
    console.error("Error fetching categories:", err.message);

    // Handle unexpected errors gracefully
    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories. Please try again later.",
      error: err.message,
    });
  }
};


// find one category
export const findOneCategory = async (req, res) => {
  try {
    const categoryId = req.params;
    const oneCategory = await categoryInstance.findOneCategory(categoryId);
    res.status(200).json(oneCategory);
  } catch (err) {
    throw new Error(err);
  }
};

// update one category
export const updateOneCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const data = req.body;
    const category = await categoryInstance.findOneCategory(categoryId);
    if (!category) {
      res.status(400).json("Category not found");
    }
    const updatedCategory = await categoryInstance.updateOneCategory(
      categoryId,
      data
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    throw new Error();
  }
};

// delete one category
export const deleteOneCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await categoryInstance.findOneCategory(categoryId);
    if (!category) {
      res.status(400).json("Category not found");
    }
    const deletedCategory = await categoryInstance.deleteOneCategory(
      categoryId
    );
    res.status(200).json("deleted", deletedCategory);
  } catch (err) {
    throw new Error();
  }
};


