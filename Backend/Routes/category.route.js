// const express = require("express");
import express from 'express'
const router = express.Router();
import {createNewCategory,findAllCategories, findOneCategory, updateOneCategory, deleteOneCategory} from '../Controllers/category.controller.js'
import adminAuth from '../Middleware/authMiddleware.js';


router.post("/create",adminAuth, createNewCategory);
router.get("/", findAllCategories);
router.get("/:id", findOneCategory);
router.put("/:id",adminAuth, updateOneCategory);
router.delete("/:id",adminAuth, deleteOneCategory);


// module.exports = router
export default router