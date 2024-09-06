const express = require("express");
const { typeError } = require("./middleware/errors");
const app = express();
const PORT = 3000;

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/users", require("./routes/users"));
app.use("/categories", require("./routes/categories"));
app.use("/orders", require("./routes/orders"));
app.use("/products", require("./routes/products"));

const upload = require("./config/cloudinary");
app.post("/upload", upload.single("picture"), (req, res) => {
  res.status(200).json({
    url: req.file,
  });
});

app.use(typeError);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
