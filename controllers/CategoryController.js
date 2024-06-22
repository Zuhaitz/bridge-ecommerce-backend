const { Category } = require("../models/index.js");
const CategoryController = {
  create(req, res) {
    req.body.role = "category";
    Category.create(req.body)
      .then((category) =>
        res
          .status(201)
          .send({ message: "Categoria creada correctamente", category }),
      )
      .catch((err) => console.error(err));
  },

  getAll(req, res) {
    req.body.role = "category";
    Category.getAll(req.body)
      .then((category) =>
        res
          .status(201)
          .send({ message: "Categoria traidas correctamente", category }),
      )
      .catch((err) => console.error(err));
  },
};

module.exports = CategoryController;
