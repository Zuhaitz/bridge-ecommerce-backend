const { User } = require("../models/index");
const bcrypt = require("bcryptjs");

// Ref: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
const regexEmail = /^\S+@\S+\.\S+$/;
// Ref: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const UserController = {
  create(req, res) {
    req.body.role = "user";
    const password = bcrypt.hashSync(req.body.password, 10);

    if (!dataValidation(req.body)) {
      return res.status(400).send({ message: "Data is not correct" });
    }

    User.create({ ...req.body, password })
      .then((user) =>
        res.status(201).send({ message: "User created successfully", user }),
      )
      .catch((err) => {
        console.error(err);
        res.status(400).send({ error: err.original.code });
      });
  },
};

function dataValidation(reqBody) {
  const { name, email, password } = reqBody;
  if (!name || !email || !password) return false;

  if (!regexEmail.test(reqBody.email)) {
    console.log("El email introducido no es valido", "danger");
    return false;
  }

  if (!regexPassword.test(reqBody.password)) {
    console.log("La contraseña no cumple las condiciones", "danger");
    return false;
  }

  return true;
}

module.exports = UserController;
