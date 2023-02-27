const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    // roles: {
    //   admin: {
    //     type: Boolean,
    //   }
    // }
    roles: {
      ref: 'Role',
      type: Schema.Types.ObjectId,
      required: false,
    },
  },
  { versionKey: false },
);

// userSchema.methods.encryptPassword = async (password) => {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     return await bcrypt.hash(password, salt);
//   } catch (err) {
//     console.log('An error ocurred:' + err);
//   }
// };

// userSchema.methods.comparePassword = async function comparePassword(password) {
//   try {
//     return await bcrypt.compare(password, this.password);
//   } catch (err) {
//     console.log('Ha surgido un error: ' + err);
//   };
// };

// userSchema.virtual('id').get(function () {
//   return this._id.toHexString();
// });

// userSchema.set('toJSON', {
//   virtuals: true,
// });

module.exports = mongoose.model('User', userSchema);
