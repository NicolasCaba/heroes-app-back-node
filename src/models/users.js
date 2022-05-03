const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    id: {
      type: Number,
    },
    usuario: {
      type: String,
    },
    email: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('users', UserSchema);