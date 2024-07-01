const { Product, Sequelize } = require("../models/index.js");
const { Op } = Sequelize;

const ProductController = {
  create(req, res) {
    Product.create(req.body)
      .then((product) =>
        res.status(201).send({ message: "Product was created", product }),
      )
      .catch((err) => console.error(err));
  },

  getAll(req, res) {
    Product.findAll()
      .then((product) =>
        res
          .status(201)
          .send({ message: "These are all the products", product }),
      )
      .catch((err) => console.error(err));
  },

  getById(req, res) {
    Product.findByPk(req.params.id)
      .then((product) => res.status(200).json(product))
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  },

  async delete(req, res) {
    try {
      await Product.destroy({
        where: { id: req.params.id },
      });
      res.send({ message: "The product has been removed" });
    } catch (error) {
      console.log(error);
    }
  },

  async update(req, res) {
    try {
      await Product.update(req.body, {
        where: { id: req.params.id },
      });
      const product = await Product.findByPk(req.params.id);
      res.send("Product updated");
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Is not possible update the product" });
    }
  },

  getByName(req, res) {
    Product.findAll({
      where: {
        name: {
          [Op.like]: `%${req.params.name}%`,
        },
      },
    }).then((product) => res.send(product));
  },

  getByPrice(req, res) {
    Product.findAll({
      where: {
        price: {
          [Op.like]: req.params.price,
        },
      },
    }).then((product) => res.send(product));
  },
};

module.exports = ProductController;
