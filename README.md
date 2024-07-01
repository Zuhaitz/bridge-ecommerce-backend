# E-Commerce Backend Implementation

Backend project for an e-commerce type platform, making use of tools like Sequelize and Node.

## Authors

- [Carlota Ruiz](https://github.com/CarBlank)
- [Zuhaitz Martínez](https://github.com/Zuhaitz)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_PASSWORD` - password of the user to access the database

`JWT_SECRET` - for jsonwebtoken

## API Reference

#### Add Order

> POST /orders

| Parameter  | Type    | Description                                    |
| :--------- | :------ | :--------------------------------------------- |
| `products` | `array` | **Required**. List of ids of products in order |

** Needs Auth token of user **

## Run Locally

Clone the project

```bash
  git clone https://github.com/Zuhaitz/bridge-ecommerce-backend.git
```

Go to the project directory

```bash
  cd bridge-ecommerce-backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```
