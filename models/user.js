const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name must be filled"]
  },
  password: {
    type: String,
    required: [true, "Password must be filled"]
  },
  email: {
    type: String,
    required: [true, "Email must be filled"],
    validate: [
      {
        validator: function (value) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        },
        message: 'Invalid email format'
      }
    ]
  },
  file: [{
    type: Schema.Types.ObjectId,
    ref: 'FileUpload'
  }]
})

userSchema.pre('save', function (next) {
  this.password = hashPassword(this.password)
  next()
})

const User = model('User', userSchema)

module.exports = User