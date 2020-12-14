const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');


exports.index = async (req, res) => {
  let users = await User.find({});
  try {
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { email, password } = req.body;
  try {
    //primero busco si existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe!!' });
    }
    //creo
    //
    let userData = req.body;
    delete userData.passwordConfirmation;
    user = new User(userData);
    //Hacer el hash de la contraseña
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);


    //guardar en la db
    await user.save();
    res.json({ msg: 'Usuario creado correctamente!!' })
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'hubo un error' })
  }
}

//login

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //busco si existe
    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({ msg: "El mail no existe" });
    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch)
      return res.status(401).json({ msg: "El password is incorrecto" });
    console.log(user)
    res.json({ msg: "Logueado correctamente", name: user.name, email: user.email, admin: user.admin })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}





