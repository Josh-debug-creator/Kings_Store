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
  resetPassword
  resetPasswordRequest
} from "../Controllers/user.controller.js";

import adminAuth from "../Middleware/adminAuth.js";
const validator = {
  checkLogin: [
    body('email').trim().notEmpty().withMessage('Email is Required').bail().isEmail().withMessage("Please enter a valid email address"),
    body('password').trim().isString().notEmpty().withMessage('Password is Empty')
  ],
  checkNewUser: [
    body('email').trim().notEmpty().withMessage('Email is Required').bail().isEmail().withMessage("Please enter a valid email address"),
    body('password').trim().isString().notEmpty().withMessage('Password is Empty').bail()
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').trim().notEmpty().withMessage('Name is Required').escape()
  ],
  checkGetUserById: [
    param('id').exists().withMessage('Id is required').isMongoId().withMessage('Invalid Id')
  ],
  checkUpdateUser: [
    body('email').trim().notEmpty().withMessage('Email is Required').bail().isEmail().withMessage("Please enter a valid email address"),
    body('name').trim().notEmpty().withMessage('Name is Required').escape(),
    body('isAdmin').isBoolean().withMessage('isAdmin value should be true/false'),
    param('id').exists().withMessage('Id is required').isMongoId().withMessage('Invalid Id')
  ],
  resetPasswordRequest: [
    body('email').trim().notEmpty().withMessage('Email is Required').bail().isEmail().withMessage("Please enter a valid email address")
  ],
  resetPassword: [
    body('password').trim().notEmpty().withMessage('Password is Required').escape().bail()
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    param('id').exists().withMessage('Id is required').isMongoId().withMessage('Invalid Id'),
    param('token').trim().notEmpty().withMessage('Token is Required')
  ]
}

router.post("/register", registerUser);

router.post("/login",validator.checkLogin, loginUser);

router.post('/logout', protect, logoutUser);

router.post("/payment", initializePayment);

// admin only
router.post("/admin", adminLogin);

// admin only - verify if admin first
router.get("/users", getAllUsers);

router.post("/reset-password/request",validator.resetPasswordRequest, resetPasswordRequest);

router.post("reset-password/reset/:id/:token",validator.resetPassword, resetPassword);

// admin only - verify if admin first
router.put("/:id",validator.checkUpdateUser, updatedUser);

// admin only - verify if admin first
router.delete("/:id",validator.checkGetUserById, deletedUser);


export default router;
