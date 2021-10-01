const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", require("./routes/userRoutes"));
app.use("/payment", require("./routes/paymentRoutes"))

const db = require("./models");

db.sequelize.sync().then(
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  })
);
