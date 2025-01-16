// const express = require("express");
import express from 'express'
const router = express.Router();
import {createProduct, findAllProducts, findOneProduct,updateProduct,deleteProduct} from  '../Controllers/product.controller.js'
import adminAuth from '../Middleware/adminAuth.js'
import upload from '../Middleware/multer.js';

router.post(
  "/create",
  adminAuth,
  upload,
  createProduct
);
router.get("/", findAllProducts);
router.get("/:id", findOneProduct);
router.put("/:id",adminAuth, updateProduct);
router.delete("/:id",adminAuth, deleteProduct);

// module.exports = router
export default router