// import multer from 'multer'

// const storage = multer.diskStorage({
//     filename:function(req, file, callback){
//         callback(null, file.originalname)
//     }
// })

// const upload = multer({storage})

// export default upload 


// import multer from "multer";

// Define storage configuration
// const storage = multer.diskStorage({
// //   destination: function (req, file, callback) {
// //     callback(null, "./Admin/Admin/public/Images"); // Directory to save the files
// //   },
// //   filename: function (req, file, callback) {
// //     const uniqueName = `${Date.now()}-${file.originalname}`;
// //     callback(null, uniqueName); // Save file with a unique name
// //   },


// });


// const storage = multer.diskStorage({
//     filename:function(req, file, callback){
//         callback(null, file.originalname)
//     }
// })

// File filter to accept only images
// const fileFilter = (req, file, callback) => {
//   const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
//   if (allowedMimeTypes.includes(file.mimetype)) {
//     callback(null, true);
//   } else {
//     callback(new Error("Invalid file type. Only images are allowed."), false);
//   }
// };

// Configure Multer
// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB max file size
//   },
 
// });

// export default upload;


import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Temporary storage before Cloudinary upload
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

 const uploadMiddleware = upload.fields([
  { name: "image1", maxCount: 1 },
]);

export default uploadMiddleware;
