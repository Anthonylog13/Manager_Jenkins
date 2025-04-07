const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  phoneNumber: {
    type: BigInt,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  following: [
    {
      id_user: {
        type: Number, 
        ref: 'User',
        required:false
      }
    },
  ],
  followers: [
    {
      id_user: {
        type: Number,
        ref: 'User',
        required:false
      }
    },
  ],
});

module.exports = model('User', UserSchema);

