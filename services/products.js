const mongoose = require('mongoose');
const Product = require('../models/products');

module.exports.createProduct = async (name, price, image, type) => {
  const product = new Product({
    name,
    price,
    image: image || '',
    type: type || '',
  });
  const productSaved = await product.save();
  return productSaved;
};

// Return all documents (objects) in the Product collection
// but with pagination
module.exports.getListProducts = async (page, limit) => {
  const startIndex = (page - 1) * limit;
  const products = await Product.find().skip(startIndex).limit(limit);
  return products;
};

// Use the findById method provided by Mongoose
// to search for a product using its id
module.exports.getProductById = async (id) => {
    const product = await Product.findById(id);
    return product;
};

// Update a document in the Product collection
module.exports.updateItem = async (_id, body) => {
  // _id: represents the id of the document to update
  // 2nd p: object with the data to be updated in the document
  // 3rd optional set to true: the updated document should be
  // returned instead of the original oNe
  const product = await Product.findByIdAndUpdate(_id, body, { new: true });
  return product;
};

// Delete a document in the Product collection
module.exports.deleteItem = async (_id) => {
  return await Product.findByIdAndDelete(_id);
};
