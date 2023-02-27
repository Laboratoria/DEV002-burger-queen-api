//
require('../middleware/auth');
const {
  createOrder, getListOrders, getOrderById, updateItem, deleteItem,
} = require('../services/orders');

const Order = require('../models/orders')

const { getProductById } = require('../services/products');
const { buildLinks } = require('../utils/pagination');

module.exports = {
  // Provide a route that handles an HTTP POST request to create a new product
  createOrder: async (req, res, next) => {
    try {
      const {
        userId, client, products, status,
      } = req.body;
      if (userId && products && products.length !== 0) {
        let message = '';
        await products.forEach(async (item) => {
          const productFound = await getProductById(item.productId);
          if (!productFound) {
            message = `No product was found with the ID ${item.productId}`;
          }
        });
        if (status && !(['pending', 'cancelled', 'delivering', 'delivered'].includes(status))) {
          return res.status(400).json({ message: 'Incorrect status value. Valid options: pending | cancelled | delivering | delivered'});
        }
        if (message.length !== 0) return res.status(404).json({ message });
        const order = await createOrder(userId, client, products);
        return res.json(order);
      }
      return res.status(400).json({ message: 'The specified userId or products could not be found' });
    } catch (error) {
      next(error);
    }
  },
  getOrders: async (req, res, next) => {
    try {
      const count = await Order.count();
      const { page = 1, limit = 10 } = req.query;
      const totalPages = Math.ceil(count / limit);
      const orders = await getListOrders(page, limit);
      if (orders) {
        const link = buildLinks(req.get('host'), 'orders', limit, page, totalPages);
        res.set('Link', link);
        res.locals.link = link;
        return res.json(orders);
      } else {
        res.status(500).json({ message: 'Failed to retrieve orders' });
      }
    } catch (error) {
      next(error);
    }
  },
  getOrderById: async (req, res, next) => {
    try {
      const order = await getOrderById(req.params.orderId);
      if (!order) return res.status(404).json({ message: `Order with ID ${req.params.orderId} could not be found` });
      return res.json(order);
    } catch (error) {
      next(error);
    }
  },

  putOrder: async (req, res, next) => {
    try {
      const order = await getOrderById(req.params.orderId);
      if (!order) return res.status(404).json({ message: `Order with ID ${req.params.orderId} could not be found` });
      const { products, status } = req.body;
      if (Object.keys(req.body).length !== 0) {
        let message = '';
        if (status && !['pending', 'cancelled', 'delivering', 'delivered'].includes(status)) {
          return res.status(400).json({ message: 'Incorrect status value. Valid options: pending | cancelled | delivering | delivered' });
        }
        if (products && products.length !== 0) {
          await products.forEach(async (p) => {
            const productFound = await getProductById(p.productId);
            if (!productFound) {
              message = `Product with ID ${p.productId} could not be found`;
            }
          });
        }
        if (message.length !== 0) return res.status(404).json({ message });
        const orderUpdated = await updateItem(order._id, req.body);
        return res.json(orderUpdated);
      }
      return res.status(400).json({ message: 'Incorrect field/s. Please update a valid option' });
    } catch (error) {
      next(error);
    }
  },
  deleteOrder: async (req, res, next) => {
    try {
      const order = await getOrderById(req.params.orderId);
      if (!order) return res.status(404).json({ message: `Order with ID ${req.params.orderId} could not be found` });
      await deleteItem(order._id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  },
};
