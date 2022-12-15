const { response } = require('express');

const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {
  const {email, password} = req.body;

  try {
    // Verify if email exists
    const user = await User.findOne({ email: email});

    if (!user) {
      return res.status(400).json({
        msg: 'Usuario / Contraseña no son correctos - email'
      });
    };

    // Verify if user still active (status: true)
    if (!user.status) {
      return res.status(400).json({
        msg: 'Usuario / Contraseña no son correctos - status: false'
      });
    };

    // Verify password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Contraseña no son correctos - password'
      });
    };

    // Generate JWT
    const token = await generateJWT(user.id);
    
    res.json({
      user,
      token
    });

  } catch(err) {
    console.log(err);
    return res.status(500).json({
      msg: 'Algo salió mal'
    });
  };

};


module.exports = {
  login
};