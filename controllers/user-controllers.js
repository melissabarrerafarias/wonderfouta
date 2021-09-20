const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      const { username, password } = await req.body;
      //   console.log(username, email, password);

      // if user tries to login with blank fields
      if (!username || !password) {
        res.status(400).json({ msg: "All required fields must be entered." });
      }

      // look for logged in user by username entered...
      const user = await db.User.findOne({ username: username });

      // ...send error if not found
      if (!user) {
        res.status(400).json({ msg: "This user does not exists." });
      }

      // un-hash password...
      const passwordCheck = await bcrypt.compare(password, user.password);

      // send error if does not match password logged in with
      if (!passwordCheck) {
        res.status(400).json({ msg: "incorrect password." });
      }

      // generate token equal to existing users id, use .env password, set restriction to time out in 24 hours
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      res.json({
        token,
        user: { id: user.id, username: user.username, email: user.email },
      });
    } catch (err) {
      res.status(500).json({ msg: err });
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
  deleteUser: async (req, res) => {
    try {
      const id = await req.params.id;
      // console.log(id);
      db.User.destroy({
        where: {
          id: id,
        },
      });
      res.send({ msg: `deleted user id ${id}` });
    } catch (err) {
      console.log(err);
    }
  },
};
