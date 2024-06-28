const { Order, Product, Category, OrderProduct } = require("../models");

const OrderController = {
  async create(req, res) {
    try {
      const user = req.user.name;
      const products = req.body.products;
      const order = await Order.create({ user });
      for (x in products) {
        await OrderProduct.create({
          orderId: order.id,
          productId: products[x],
        });
      }

      res.send(order);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  getAll(req, res) {
    Order.findAll({
      include: {
        model: Product,
        attributes: ["name", "description"],
        through: { attributes: [] },

        include: {
          model: Category,
          attributes: ["name", "description"],
        },
      },
    })
      .then((orders) => res.send(orders))
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
};

module.exports = OrderController;
