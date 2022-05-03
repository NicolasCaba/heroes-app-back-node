const mongoose = require('mongoose');
const { Schema } = mongoose;

const HeroesSchema = new Schema(
  {
    id: {
      type: String
    },
    superhero: {
      type: String
    },
    publisher: {
      type: String
    },
    alter_ego: {
      type: String
    },
    first_appearance: {
      type: String
    },
    characters: {
      type: String
    },
    image_id: {
      type: mongoose.Types.ObjectId
    }
  },
  {
    timestamps: true
  }
)

HeroesSchema.statics.findAllData = function () {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: 'storages',
        localField: 'image_id',
        foreignField: '_id',
        as: 'image',
      },
    },
    {
      $unwind: '$image'
    }
  ]);
  return joinData;
}

HeroesSchema.statics.findAllDataByName = function (nameRegEx) {
  const joinData = this.aggregate([
    {
      $match: {
        superhero: { $regex: nameRegEx, $options: 'i' }
      }
    },
    {
      $lookup: {
        from: 'storages',
        localField: 'image_id',
        foreignField: '_id',
        as: 'image',
      },
    },
    {
      $unwind: '$image'
    }
  ]);
  return joinData;
}

HeroesSchema.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(id)
      },
    },
    {
      $lookup: {
        from: 'storages',
        localField: 'image_id',
        foreignField: '_id',
        as: 'image',
      },
    },
    {
      $unwind: '$image'
    },
  ]);
  return joinData;
}

HeroesSchema.statics.findOneDataByName = function (name) {
  const joinData = this.aggregate([
    {
      $match: {
        id: name
      },
    },
    {
      $lookup: {
        from: 'storages',
        localField: 'image_id',
        foreignField: '_id',
        as: 'image',
      },
    },
    {
      $unwind: '$image'
    },
  ]);
  return joinData;
}

module.exports = mongoose.model('heroes', HeroesSchema);