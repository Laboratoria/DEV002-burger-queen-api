const mongoose = require('mongoose');
const Order = require('../models/orders');
const User = require('../models/users')

// Create a new document from the Order collection in the MongoDB database
module.exports.createOrder = async (userId, client, products) => {
  const productsArray = products.map(doc => ({
    // qty: doc.qty, productId: doc.productId
    qty: doc.qty, productId: mongoose.Types.ObjectId(doc.productId)
  }));
  // userId =  await User.findById(userId);
  const order = new Order({
    userId,
    client: client || '',
    products: productsArray,
  });
  // Save the order object in the MDB database
  await order.save();
  return order.populate('products.productId');
};

// Get a list of orders sorted by processing date
module.exports.getListOrders = async (page, limit) => {
  // Sort results by descending order
  const orderByDateProcessed = { dateProcessed: 'desc' };
  const orders = await Order.find({})
    .sort(orderByDateProcessed)
    .populate('products.productId')
    // Limit the number of results and paginate the results
    .skip((page - 1) * limit)
    .limit(limit);
  return orders;
};

// Retrieve an order by its id from the MongoDB database
module.exports.getOrderById = async (id) => {
  // Check if id is a valid ObjectId
  if (mongoose.Types.ObjectId.isValid(id)) {
    // Find the order with the matching id
    const order = await Order.findById(id)
      .populate('products.productId');
    return order;
  }
  // If the provided id is not a valid ObjectId, nothing is returned
};

// Update a document from the Order collection identified by its _id
module.exports.updateItem = async (_id, body) => {
  const updatedOrder = await Order.findByIdAndUpdate(_id, body, { new: true })
    .populate('products.productId');
  return updatedOrder;
};

// Remove a document from the Order collection identified by its _id
module.exports.deleteItem = async (_id) => {
  const removedItem = await Order.deleteOne({ _id });
  // Return number of documents that have been removed from the collection
  return removedItem.deletedCount;
};
