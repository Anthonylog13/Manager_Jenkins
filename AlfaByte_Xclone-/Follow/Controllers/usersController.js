
const { response } = require('express');
const User = require('../../Auth/Models/User')

const listFollowing = async (req, res = response) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          ok: false,
          error: "Usuario no encontrado!",
        });
      }
        res.status(200).json({
            ok: true,
            following: user.following
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener la lista de following.'
        });
    }
};
const listFollowers = async (req, res= response) =>{
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          ok: false,
          error: "Usuario no encontrado!",
        });
      }
        res.status(200).json({
            ok: true,
            followers: user.followers
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener la lista de followers.'
        });
    }
};
module.exports = {
    
    listFollowers,
    listFollowing,
};
