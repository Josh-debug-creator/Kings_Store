import express from 'express'
const router = express.Router();
import categoryRoute from '../Routes/category.route.js'
import productRoute from '../Routes/product.route.js'
import userRoute from '../Routes/user.route.js'

router.use("/api/category", categoryRoute);
router.use("/api/product", productRoute);
router.use("/api/user", userRoute);

// module.exports = router;
export default router
