const express = require('express');
const {
  listProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');

const router = express.Router();

router.get('/', listProducts);
router.post('/', createProduct);
router.get('/:pid', getProduct);
router.patch('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);

module.exports = router;
