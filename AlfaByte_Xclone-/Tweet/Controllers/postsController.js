const {response } = require('express');
const Tweet =require('../../Tweet/Models/Tweet')

const createPost = async (req, res = response) => {
    const { title, body, id_User} = req.body;
  
    try {
     
      let tweet = new Tweet({  title, body, id_User });

      await tweet.save();
  
      res.status(201).json({
        ok: true,
        message: "tweet save",
        user: {
          id_tweet: tweet.id,
          title: tweet.email,
          body: tweet.body,
         id_user: tweet.id_User
        },
      });
    } catch (error) {
      console.log("(ERROR)", error);
      res.status(500).json({
        ok: false,
        error: "SOMETHING WENT WRONG, CHECK YOUR DATA AGAIN",
      });
    }
  };

module.exports = {
    
    createPost,
};