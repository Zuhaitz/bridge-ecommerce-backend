const { User } = require("../models/index");
const bcrypt = require("bcryptjs");

const UserController = {
  create(req, res) {
    req.body.role = "user";
    const password = bcrypt.hashSync(req.body.password, 10);
    console.log(req.body);

    User.create({ ...req.body, password })
      .then((user) =>
        res.status(201).send({ message: "Usuario creado con exito", user }),
      )
      .catch((err) => {
        console.error(err);
        res.status(400).send({ message: "ERROR" });
      });
  },
};

module.exports = UserController;
