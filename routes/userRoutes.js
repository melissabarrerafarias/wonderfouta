const router = require("express").Router();
const {
  signUp,
  login,
  update,
  getUsers,
  deleteUser,
} = require("../controllers/user-controllers");

// route: http://localhost:5000/user/getUsers
router.get("/getUsers", getUsers);

// route: http://localhost:5000/user/signUp
router.post("/signUp", signUp);

// route: http://localhost:5000/user/login
router.post("/login", login);

// route: http://localhost:5000/user/update
router.put("/update", update);

// route: http://localhost:5000/user/:id
router.delete("/:id", deleteUser);

module.exports = router;
