const db = require("../models");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await db.User.findAll();
    //   console.log(users);
      res.send(users);
    } catch (err) {
      console.log(err);
    }
  },
  signUp: async (req, res) => {
    try {
      user = await req.body;
      //   console.log(user);
      db.User.create(user);
      res.send(user);
    } catch (err) {
      console.log(err);
    }
  },
  login: (req, res) => {
    res.send({ msg: "log me in" });
  },
  update: (req, res) => {
    res.send({ msg: "update my info" });
  },
};
