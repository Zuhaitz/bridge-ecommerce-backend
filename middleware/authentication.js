const { User, Token, Sequelize } = require("../models");
const { Op } = Sequelize;
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.js")["development"];

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, jwt_secret);
    const user = await User.findByPk(payload.name);

    const tokenFound = await Token.findOne({
      where: { [Op.and]: [{ username: user.name }, { token: token }] },
    });

    if (!tokenFound) {
      return res.status(401).send({ message: "Not authorize!" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error, message: "Problem with the token" });
  }
};

const isAdmin = async (req, res, next) => {
  const admins = ["admin", "superadmin"];
  if (!admins.includes(req.user.role)) {
    return res.status(403).send({
      message: "You're not allowed to do this!",
    });
  }
  next();
};

module.exports = { authentication, isAdmin };
