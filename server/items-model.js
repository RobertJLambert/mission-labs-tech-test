const mongoose = require('mongoose')

const itemsSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Items', itemsSchema)