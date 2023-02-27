const mongoose = require('mongoose');

const { Schema } = mongoose;

const roleSchema = new Schema({
  name: {
    type: String,
    index: true,
    required: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  versionKey: false,
});

// roleSchema.virtual('id').get(function () {
//   return this._id.toHexString();
// });

// roleSchema.set('toJSON', {
//   virtuals: true,
// });

module.exports = mongoose.model('Role', roleSchema);
