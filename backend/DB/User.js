const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255, 
      },
      age: {
        type: Number, 
      },
      dob: {
        type: String, 
      },
      address: {
        type: String, 
      },
    }, {
      timestamps: true 
})

module.exports = mongoose.model('User', userSchema)