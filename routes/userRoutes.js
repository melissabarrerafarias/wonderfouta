const router = require("express").Router();
const {
  signUp,
  login,
  update,
  getUsers,
  deleteUser,
} = require("../controllers/user-controllers");

router.get("/getUsers", getUsers);
router.post("/signUp", signUp);
router.post("/login", login);
router.put("/update", update);
router.delete("/:id", deleteUser);

module.exports = router;
