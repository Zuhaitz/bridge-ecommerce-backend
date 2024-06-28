const { Category, Product, Sequelize } = require("../models/index.js");
const { Op } = Sequelize;

const CategoryController = {
  create(req, res) {
    Category.create(req.body)
      .then((category) =>
        res.status(201).send({ message: "Category was created", category }),
      )
      .catch((err) => console.error(err));
  },

  getAll(req, res) {
    Category.findAll()
      .then((category) =>
        res
          .status(200)
          .send({ message: "These are all the categories", category }),
      )
      .catch((err) => console.error(err));
  },

  getById(req, res) {
    Category.findByPk(req.params.id)
      .then((category) => res.status(200).json(category))
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  },

  async delete(req, res) {
    try {
      await Category.destroy({
        where: { id: req.params.id },
      });
      res.send({ message: "The category has been removed" });
    } catch (error) {
      console.log(error);
    }
  },

  async update(req, res) {
    try {
      await Category.update(req.body, {
        where: { id: req.params.id },
      });
      const category = await Category.findByPk(req.params.id);
      res.send("Category update");
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Is not possible update the category" });
    }
  },

  getOneByName(req, res) {
    Category.findOne({
      where: {
        name: {
          [Op.like]: `%${req.params.name}%`,
        },
      },
    }).then((category) => res.send(category));
  },

  getAllWithProduct(req, res) {
    Category.findAll({ include: Product })
      .then((category) =>
        res.status(200).send({
          message: "These are all the categories with products",
          category,
        }),
      )
      .catch((err) => console.error(err));
  },
};

module.exports = CategoryController;
