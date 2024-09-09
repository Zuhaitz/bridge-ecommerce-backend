const {
  User,
  Order,
  Product,
  Category,
  Token,
  Sequelize,
} = require("../models/index");
const { Op } = Sequelize;
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

  async uploadImage(req, res) {
    try {
      // console.log(req.user.dataValues.name);
      await User.update(
        { picture: req.file.path },
        { where: { name: req.user.dataValues.name } },
      );

      res.send({ path: req.file.path });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Problem uploading image" });
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

  async logout(req, res) {
    try {
      await Token.destroy({
        where: {
          [Op.and]: [
            { username: req.user.name },
            { token: req.headers.authorization },
          ],
        },
      });
      res.send({ message: "Logout successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Problem found when trying to logout" });
    }
  },

  async getInfo(req, res) {
    try {
      const user = await User.findByPk(req.user.name, {
        attributes: ["name", "email", "picture", "role"],
      });
      const orders = await Order.findAll({
        attributes: ["id", "createdAt"],
        where: { user: user.name },

        include: {
          model: Product,
          attributes: ["id", "name", "description", "price"],
          through: { attributes: [] },

          include: {
            model: Category,
            attributes: ["name", "description"],
          },
        },
      });

      res.send({ user, orders });
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  },
};

module.exports = UserController;
