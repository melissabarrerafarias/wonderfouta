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
  login: async (req, res) => {
    try {
      const { username, email, password } = await req.body;
      console.log(username, email, password);
      res.send({ username, email, password });
    } catch (err) {
      console.log(err);
    }
  },
  update: async (req, res) => {
    try {
      const update = await req.body;
    //   console.log(update);
      db.User.update(update, {
        where: {
          id: update.id,
        },
      });
      res.send(update);
    } catch (err) {
      console.log(err);
    }
  },
};
