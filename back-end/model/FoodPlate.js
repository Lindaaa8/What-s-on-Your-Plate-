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
      required:true
    },
    date: {
      type: Array,
      default:[Date.now]
    },
    message:{
      type: String,
      require:false
    }
  });

const foodPlate = mongoose.model('foodPlate', foodSchema);

module.exports = foodPlate;