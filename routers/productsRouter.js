const express = require('express');

const {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  getSingleProduct,
} = require('../controllers/productController');
const router = express.Router();

router.route('/').get(getAllProducts).post(createProduct);
router
  .route('/:productId')
  .get(getSingleProduct)
  .put(updateProduct)
  .put(deleteProduct);

module.exports = router;
