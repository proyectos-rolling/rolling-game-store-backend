const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const gameController = require("./controllers/gameController");
const userController = require("./controllers/userController");

//Games routes
router.get("/games/", [], gameController.index);
router.post(
  "/games/new/",
  [
    check("name", "El nombre es obligatorio!").notEmpty(),
    check("description", "La descripción es obligatoria!").notEmpty(),
    check("price", "El precio es obligatorio!").notEmpty(),
  ],
  gameController.createGame
);
router.delete("/games/:_id", [], gameController.destroy);

//Users routes
router.get("/users/", [], userController.index);
router.post(
  "/users/new/",
  [
    check("name", "El nombre es obligatorio!").not().isEmpty(),
    check("email", "El email es obligatorio!").not().isEmpty(),
    check("email", "Debe ser formato email!").isEmail(),
    check("password", "Debe agregar la contraseña").notEmpty(),
    check(
      "password",
      "El password debe ser de un minimo de 6 caracteres"
    ).isLength({ min: 6 }),
  ],
  userController.createUser
);

module.exports = router;