const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    image: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
    // Para que cada vez que se cree un doc no aparezca --v
    versionKey: false,
  },
);

// productSchema.virtual('id').get(function () {
//   return this._id.toHexString();
// });

// productSchema.set('toJSON', {
//   virtuals: true,
// });

module.exports = mongoose.model('Product', productSchema);
