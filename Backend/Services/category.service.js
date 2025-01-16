import category from "../Models/category.model.js";
// const category = require("../Models/category.model.js");

class categoryService {
  // create a category
  async createCategory(categoryInfo) {
    const categoryInformation = new category(categoryInfo);
    const createdCategory = await categoryInformation.save();
    return createdCategory;
  }

  // find all categories
  // async findCategory() {
  //   const allCategories = await category.find();
  //   // console.log(allCategories)
  //   return allCategories;
  // }
  async findCategory() {
    try {
      const allCategories = await category.find();
      if (allCategories.length === 0) {
        console.log("No categories found in the database.");
      } else {
        // console.log("Categories fetched successfully:", allCategories);
      }
      return allCategories;
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      throw new Error("Failed to fetch categories");
    }
  }

  // find a category by id
  async findOneCategory(_id) {
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   throw new Error("Invalid ObjectId");
    // }
    const foundCategory = await category.findById(_id);
    return foundCategory;
  }

  // update one Category
  async updateOneCategory(id, newinfo) {
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   throw new Error("Invalid ObjectId");
    // }
    const updatedCategory = await category.findByIdAndUpdate(
      { _id: id },
      newinfo,
      { new: true }
    );
    return updatedCategory;
  }

  // delete category
  async deleteOneCategory(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ObjectId");
    }
    const deletedCategory = await category.findByIdAndDelete({ _id: id });

    return deletedCategory;
  }

  // Check if category exists
  async categoryExists(name) {
    const category = await Category.findOne({ name });
    return !!category; // Returns true if category exists, false otherwise
  }
}

const categoryInstance = new categoryService();
// module.exports = categoryInstance;
export default categoryInstance;
