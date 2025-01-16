import userInstance from '../Services/user.service.js'
import validator from 'validator'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import configVariables from '../Config/config.js';
import https from "https";

// create jwt
const createToken = (id) => {
  return jwt.sign(id,configVariables.JWT_SECRET)
}
//  register a user
const registerUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    // check if user exists
    const userExists = await userInstance.findUserByEmail({email} );
    if (userExists) {
      res.status(400).json("user already exists");
      console.log(userExists);
    }
    // validate email
    if(!validator.isEmail(email)){
      res.status(400).json("Please, enter a valid email")
    }
    // check length of password
    // if(password.value.length < 6){
    //   res.status(400).json('Please enter strong password')
    // }
  // hashing password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password,salt)
const userDetails = {
  name,
  email,
  phoneNumber,
  password: hashedPassword,
};
    const userInfo = await userInstance.registerUser(userDetails);

    // sign jwt
    const token = await jwt.sign({id: userInfo._id}, configVariables.JWT_SECRET);
    res.status(201).json({success:true,token});
  } catch (err) {
     res.json({success:false,message:message.err});
    throw new Error(err.message);
   
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exists
    const findUser = await userInstance.findUserByEmail( {email} );
    // if user doesn't exist, return
    if(!findUser){
      res.status(404).json({success: false, message:"user does not exist"})
    }
    // compare password
    const isMatch = bcrypt.compare(password, findUser.password);
   if (isMatch){
    const token = createToken(findUser._id)
    res.status(200).json({success:true, message:token})
   }
   else{
    res.status(400).json({success:false, message:'Invalid credentials'})
   }
    res.status(200).json({success:true, message:"user logged in"});
  } catch (err) {
    throw new Error(err);
  }
};
//  admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === configVariables.ADMIN_EMAIL &&
      password === configVariables.ADMIN_PASSWORD
    ) {
      const token = await jwt.sign(
        email + password,
        configVariables.JWT_SECRET
      );
      res.status(200).json({succss:true, token:token});
    } else {
      res.status(400).json({success:false, message:"Invalid credentials"});
    }
  } catch (err) {
    console.log(err)
    throw new Error(err);
  }
};


// get all users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userInstance.findAllUsers();
    res.status(200).json(allUsers);
  } catch (err) {
    throw new Error(err);
  }
};

// get one user - login
// const getOneUser = async (req, res) => {
//   try {
//     const userId = req.params;
//     const user = await userInstance.findUserById(userId);
//     res.status(200).json(user);
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// update user
const updatedUser = async (req, res) => {
  const userInfo = req.body;
  const userId = req.params;
  const user = await userInstance.findUserById(userId);
  if (!user) {
    res.status(404).json("user not found");
  }
  const updateUser = await userInstance.updateUser(userId, userInfo);
  res.status(200).json(updateUser);
};

// delete user
const deletedUser = async (req, res) => {
  try {
    const userId = req.params;
    const user = await userInstance.deleteUser(userId);
    res.status(200).json(user);
  } catch (err) {
    throw new Error(err);
  }
};

// make payment

const initializePayment = {
  acceptPayment: async (req, res) => {
    try {
      // request body from the clients
      const email = req.body.email;
      const amount = req.body.amount;
      // params
      const params = JSON.stringify({
        email: email,
        amount: amount * 100,
      });
      // options
      const options = {
        hostname: "api.paystack.co",
        port: 443,
        path: "/transaction/initialize",
        method: "POST",
        headers: {
          Authorization: configVariables.PAYSTACK_SECRET_KEY, // where you place your secret key copied from your dashboard
          "Content-Type": "application/json",
        },
      };
      // client request to paystack API
      const clientReq = https
        .request(options, (apiRes) => {
          let data = "";
          apiRes.on("data", (chunk) => {
            data += chunk;
          });
          apiRes.on("end", () => {
            console.log(JSON.parse(data));
            return res.status(200).json(data);
          });
        })
        .on("error", (error) => {
          console.error(error);
        });
      clientReq.write(params);
      clientReq.end();
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  },
};

export  {
  registerUser,
  loginUser,
  adminLogin,
initializePayment,
  getAllUsers,

  updatedUser,
  deletedUser,
};
