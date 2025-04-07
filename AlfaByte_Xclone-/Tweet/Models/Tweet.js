const { Schema, model } = require('mongoose');

const TweetSchema = Schema({
  title: {
    type: String,
    require: true
  },
  body: {
    type: String,
    require: true 
  }
  ,
  id_User: {
    type: String,
    require: true 
  }
});

module.exports = model('Tweet', TweetSchema);