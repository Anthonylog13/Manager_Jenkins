const { response } = require("express");
const User = require('../../Auth/Models/User');
const bcrypt = require('bcrypt');

const createUser = async (req, res = response) => {
  const { phoneNumber, name, email, password, following, followers, id_user } = req.body;
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let user = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      following,
      followers,
      id_user
    });

    await user.save();

    res.status(201).json({
      ok: true,
      message: "User Registered",
      user: {
        id: user.id,
        email: user.email,
      }
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
  createUser,
};
