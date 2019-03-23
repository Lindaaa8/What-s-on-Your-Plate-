const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: false
    },
    type: {
      type: String,
      required: true,
    },
    imgURL: {
      type: String,
      default: Date.now
    },
    date: {
      type: Array,
      default:null
    },
    message:{
      type: String,
      require:false
    }
  });

const foodPlate = mongoose.model('foodPlate', foodSchema);

module.exports = foodPlate;