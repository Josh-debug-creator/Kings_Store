// import product from "../Models/product.model";
// const product = require('../Models/product.model')
import product from '../Models/product.model.js'

class productService {
  // create a product
  async createProduct(productInfo) {
    const productInformation = new product(productInfo);
    const createdProduct = await productInformation.save();
    return createdProduct;
  }
  // find all products
  async findProduct() {
    const allProducts = await product.find().populate("categoryId");
    return allProducts;
  }
  // find a product by id
  async findOneProduct(id) {
    const foundProduct = await product.find(id);
    return foundProduct;
  }
  // update one product
  async updateOneProduct(id, newinfo) {
    const updatedProduct = await product.findOneAndUpdate({_id:id}, newinfo, {new: true});
    return updatedProduct;
  }

  // delete product
async deleteOneProduct () {
  const deletedProduct = await product.findOneAndDelete({_id:id})
  return deletedProduct;
}
}

const productInstance = new productService()
// module.exports = productInstance
export default productInstance