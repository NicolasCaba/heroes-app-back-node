const mongoose = require('mongoose');
const { Schema } = mongoose;

const StorageSchema = new Schema(
  {
    url: {
      type: String
    },
    filename: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('storage', StorageSchema);