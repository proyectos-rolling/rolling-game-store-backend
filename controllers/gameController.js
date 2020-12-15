const Game = require('../models/Game');
const {validationResult} = require('express-validator');


exports.index = async (req, res) => {
  let games = await Game.find({}).sort({ created_at: -1});
  try {
    res.json(games);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.active = async (req, res) => {
  let games = await Game.find({ active: true }).sort({ created_at: -1 });
  try {
    res.json(games);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.featured = async (req, res) => {
  let games = await Game.find({ featured: true, active: true }).sort({
    created_at: -1,
  });
  try {
    res.json(games);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.specialoffers = async (req, res) => {
  let games = await Game.find({ discount: { $gt: 0 }, active: true }).sort({
    created_at: -1,
  });
  try {
    res.json(games);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createGame = async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {name} = req.body;
    try{
        //Busco si existe un juego con ese nombre
        let game = await Game.findOne({name});
        if(game){ 
            return res.status(400).json({msg:'El juego ya existe!!'});
        }
        game = new Game(req.body);
        //guardar en la db
        await game.save();
        res.json({msg: 'Juego creado correctamente!!'})
    }catch(error){
        console.log(error);
        res.status(400).json({msg:'hubo un error'})
    }
}
exports.updateGame = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Data to update can not be empty!" });
  }
  const { id } = req.body;
  Game.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      console.log(data);
      if (!data) {
        res.status(404).send({
          message: "Cannot update user with id:" + id + "maybe not found",
        });
      } else {
        res.send({ msg: "Juego editado correctamente!!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "error" + err });
    });
};

exports.destroy = async (req, res) => {
  const { _id } = req.params
   try {
     //Busco si existe un juego con ese id
     let game = await Game.findOne({ _id });
     if (!game) {
       console.log("not game")
       return res.status(400).json({ msg: "El juego no existe!!" });
     }
     await game.deleteOne()
     res.json({ msg: "Juego borrado correctamente!!" });
   } catch (error) {
     console.log(error);
     res.status(400).json({ msg: "hubo un error" });
   }
};




