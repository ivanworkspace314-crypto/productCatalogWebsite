const Product = require('../models/product');

async function listProducts(req, res, next) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
}

async function createProduct(req, res, next) {
  try {
    const { productName, price, imageURL } = req.body;
    const product = new Product({ productName, price, imageURL });
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
}

async function getProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.pid);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { productName, price, imageURL } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.pid,
      { productName, price, imageURL },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.pid);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
