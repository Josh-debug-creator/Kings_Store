// const express = require("express");
import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  adminLogin,
  getAllUsers,
  // getOneUser,
  updatedUser,
  deletedUser,
  initializePayment,
} from "../Controllers/user.controller.js";

import adminAuth from "../Middleware/adminAuth.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/payment", initializePayment);
router.post("/admin", adminLogin);
router.get("/", getAllUsers);

router.put("/:id", updatedUser);
router.delete("/:id", deletedUser);


export default router;
