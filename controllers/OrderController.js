const { Order } = require("../models");

const OrderController = {
  async create(req, res) {
    try {
      const user = req.user.name;
      const products = req.body.products;
      const order = await Order.create({ user });
      console.log(products);

      res.send(order);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  getAll(req, res) {
    const user = req.user.name;

    Order.findAll({ where: { user } })
      .then((orders) => res.send(orders))
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
};

module.exports = OrderController;
