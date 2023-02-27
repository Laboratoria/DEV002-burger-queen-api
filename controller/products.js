//
const {
  createProduct,
  getListProducts,
  getProductById,
  updateItem,
  deleteItem,
} = require('../services/products');
require('../middleware/auth');
const Product = require('../models/products');
const { buildLinks } = require('../utils/pagination');

module.exports = {
  createProduct: async (req, res, next) => {
    try {
      const {
        name, price, image, type,
      } = req.body;
      if (!name || !price) return res.status(400).json({ message: 'Neither name nor price was provided' });
      if (price && typeof price !== 'number') return res.status(400).json({ message: 'The price provided is not in a numeric format. Please enter a valid value' });
      const product = await createProduct(name, price, image, type);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  },
  getProducts: async (req, res, next) => {
    try {
      // Get total documents in the Products colllection
      const count = await Product.count();
      const { page = 1, limit = 10 } = req.query;
      // host: is the domain name of the server.
      const totalPages = Math.ceil(count / limit);
      const products = await getListProducts(page, limit);
      const link = buildLinks(req.get('host'), 'products', limit, page, totalPages);
      res.set('Link', link);
      res.locals.link = link;
      return res.json(products);
    } catch (error) {
      next(error);
    }
  },
  getProductById: async (req, res, next) => {
    try {
      const product = await getProductById(req.params.productId);
      if (!product) return res.status(404).json({ message: `Product with ID ${req.params.productId} could not be found` });
      return res.json(product);
    } catch (error) {
      next(error);
    }
  },
  putProduct: async (req, res, next) => {
    try {
      const product = await getProductById(req.params.productId);
      if (!product) return res.status(404).json({ message: `Product with ID ${req.params.productId} could not be found` });
      const {
        name, price, image, type,
      } = req.body;
      if (name || price || image || type) {
        if (price && typeof price !== 'number') return res.status(400).json({ message: 'The price provided is not in a numeric format. Please enter a valid value' });
        const productUpdated = await updateItem(product._id, req.body);
        return res.json(productUpdated);
      }
      return res.status(400).json({ message: 'Incorrect field/s. Please update a valid option' });
    } catch (error) {
      next(error);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const product = await getProductById(req.params.productId);
      if (!product) return res.status(404).json({ message: `Product with ID ${req.params.productId} could not be found` });
      await deleteItem(product._id);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  },
};
