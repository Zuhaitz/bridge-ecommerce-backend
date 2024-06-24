const { User, Token } = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.js")["development"];

// Ref: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
// const regexEmail = /^\S+@\S+\.\S+$/;
// Ref: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
// const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const UserController = {
  async create(req, res, next) {
    try {
      req.body.role = "user";
      const password = await bcrypt.hash(req.body.password, 10);

      const user = await User.create({ ...req.body, password });
      res.send(user);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  login(req, res) {
    User.findOne({
      where: { name: req.body.name },
    }).then((user) => {
      if (!user)
        return res
          .status(400)
          .send({ message: "User or password is incorrect" });

      const isEqual = bcrypt.compareSync(req.body.password, user.password);

      if (!isEqual)
        return res
          .status(400)
          .send({ message: "User or password is incorrect" });

      const token = jwt.sign({ name: user.name }, jwt_secret);
      Token.create({ token, username: user.name });
      res.send({ message: "Bienvenid@ " + user.name, user, token });
    });
  },
};

module.exports = UserController;
