import userInstance from '../Services/user.service.js'
import validator from 'validator'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import configVariables from '../Config/config.js';
import https from "https";
// import transporter from '../config/email.js';

// create jwt
const createToken = (id) => {
  return jwt.sign(id,configVariables.JWT_SECRET)
}

//  register a user
// @desc     Register user
// @method   POST
// @endpoint /api/users
// @access   Public
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
// @desc     Auth user & get token
// @method   POST
// @endpoint /api/users/login
// @access   Public

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

// @desc     Logout user / clear cookie
// @method   POST
// @endpoint /api/user/logout
// @access   Private
const logoutUser = (req, res) => {
  res.clearCookie('jwt', { httpOnly: true });

  res.status(200).json({ message: 'Logout successful' });
};

// @desc     Get users
// @method   GET
// @endpoint /api/users
// @access   Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userInstance.findAllUsers();
    if (!allUsers || allUsers.length === 0) {
      res.status(404).json("No users found!");
    }
     res.status(200).json(allUsers);
  } catch (err) {
    throw new Error(err);
  }
};

// @desc     Get user
// @method   GET
// @endpoint /api/users/:id
// @access   Private/Admin
const getOneUser = async (req, res) => {
  try {
    const userId = req.params;
    const user = await userInstance.findUserById(userId)
   if (!user) {
     res.status(404).json("No users found!");
    }

    res.status(200).json(user);
  } catch (err) {
    throw new Error(err);
  }
};

// @desc     Update user
// @method   PUT
// @endpoint /api/users/:id
// @access   Private/Admin
const updatedUser = async (req, res) => {
 try{
   const userInfo = req.body;
  const userId = req.params;
  const user = await userInstance.findUserById(userId);
  if (!user) {
    res.status(404).json("user not found");
  }
  const updateUser = await userInstance.updateUser(userId, userInfo);
  res.status(200).json(updateUser);
 }

  catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

// @desc     Delete user
// @method   DELETE
// @endpoint /api/user/:id
// @access   Private/Admin
const deletedUser = async (req, res) => {
  try {
    const userId = req.params;
    // find user
    const user = await userInstance.findUserById(userId)

     if (!user) {
      res.statusCode = 404;
      throw new Error('User not found!');
    }
    
    await userInstance.deleteUser(userId);
    res.status(200).json({success:true, message:"User deleted"});
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

// @desc     Send reset password email
// @method   POST
// @endpoint /api/users/reset-password/request
// @access   Public
const resetPasswordRequest = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userInstance.findUserByEmail({ email });

    if (!user) {
      res.statusCode = 404;
      throw new Error('User not found!');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '15m'
    });
    const passwordResetLink = ` "http://localhost:3000/api/user/reset-password/${user._id}/${token}`;
    console.log(passwordResetLink);
    await transporter.sendMail({
      from: "Kings Store", // sender address
      to: user.email, // list of receivers
      subject: 'Password Reset', // Subject line
      html: `<p>Hi ${user.name},</p>

            <p>We received a password reset request for your account. Click the link below to set a new password:</p>

            <p><a href=${passwordResetLink} target="_blank">${passwordResetLink}</a></p>

            <p>If you didn't request this, you can ignore this email.</p>

            <p>Thanks,<br>
            Kings Store Team</p>` // html body
    });

    res
      .status(200)
      .json({success:true, message: 'Password reset email sent, please check your email.' });
  } catch (error) {
    next(error);
  }
};

// @desc     Reset password
// @method   POST
// @endpoint /api/user/reset-password/reset/:id/:token
// @access   Private
const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { id: userId, token } = req.params;
    const user = await userInstance.findUserById(userId);
    const decodedToken = jwt.verify(token, configVariables.JWT_SECRET);

    if (!decodedToken) {
      res.statusCode = 401;
      throw new Error('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password successfully reset' });
  } catch (error) {
    next(error);
  }
};

export  {
  registerUser,
  loginUser,
  adminLogin,
initializePayment,
  getAllUsers,
resetPasswordRequest
  updatedUser,
  deletedUser,
  resetPassword
};
