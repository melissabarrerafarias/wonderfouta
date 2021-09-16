const { urlencoded } = require("express");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = require("./models");

db.sequelize.sync().then(
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  })
);
