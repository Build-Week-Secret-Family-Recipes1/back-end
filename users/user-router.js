const express = require("express");
const db = require("../data/dbConfig");
// const Users = require("./user-model");

const router = express.Router();

// *** GET Users ***

router.get("/", async (req, res) => {
  try {
    const users = await db("users");
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorMessage: "Cannot retrieve users",
    });
  }
});

// *** GET Users by ID ***

router.get("/:id", async (req, res) => {
  try {
    const user = await db("users").where("user_id", req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorMessage: "Cannot retrieve user",
    });
  }
});

module.exports = router;
