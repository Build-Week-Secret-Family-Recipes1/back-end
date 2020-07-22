const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");

const authenticate = require("./auth/auth-middleware.js");
const authRouter = require("./auth/auth-router");
const recipeRouter = require("./recipes/recipes-router");
const userRouter = require("./users/user-router.js");

const server = express();

const sessionConfig = {
  name: "family-recipes",
  secret: "keep it secret, keep it safe",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
};

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));

server.use("/api/auth", authRouter);
server.use("/api/recipes", authenticate, recipeRouter);
server.use("/api/users", authenticate, userRouter);

server.get("/api", (req, res) => {
  res.status(200).send(`
  <h1>Welcome to the Secret Family Recipes API!</h1>

  <h3>Send your requests to these endpoints:</h3>
  </br>

  <h2>Authentication</h2></br>

  <p>to <strong>REGISTER</strong> a new user: <strong>POST</strong> to https://bw-grandmas-recipes.herokuapp.com/api/auth/register</p>

  <p>to <strong>LOGIN</strong> a user: <strong>POST</strong> to https://bw-grandmas-recipes.herokuapp.com/api/auth/login</p>

  <p>to <strong>LOGOUT</strong> a user: <strong>GET</strong> to https://bw-grandmas-recipes.herokuapp.com/api/auth/logout</p>
  </br>

  <h2>Users</h2></br>

  <p>to <strong>GET</strong> all registered users: <strong>GET</strong> to https://bw-grandmas-recipes.herokuapp.com/api/users</p>

  <p>to <strong>GET</strong> all registered users by user_id: <strong>GET</strong> to https://bw-grandmas-recipes.herokuapp.com/api/users/:id</p></br>

  <h2>Recipes</h2></br>
         
  <p>to <strong>GET</strong> all added recipes: <strong>GET</strong> to https://bw-grandmas-recipes.herokuapp.com/api/recipes</p>

  <p>to <strong>GET</strong> all added ingredients: <strong>GET</strong> to https://bw-grandmas-recipes.herokuapp.com/api/recipes/ingredients</p>

  <p>to <strong>GET</strong> all added instructions: <strong>GET</strong> to https://bw-grandmas-recipes.herokuapp.com/api/recipes/instructions</p>

  <p>to <strong>GET</strong> recipes sorted by recipe_id: <strong>GET</strong> to https://bw-grandmas-recipes.herokuapp.com/api/recipes/:id</p>

  <p>to <strong>GET</strong> ingredients sorted by recipe_id: <strong>GET</strong> to https://bw-grandmas-recipes.herokuapp.com/api/recipes/:id/ingredients</p>

  <p>to <strong>GET</strong> instructions sorted by recipe_id: <strong>GET</strong> to https://bw-grandmas-recipes.herokuapp.com/api/recipes/:id/instructions</p>

  <p>to <strong>ADD</strong> new recipes: <strong>POST</strong> to https://bw-grandmas-recipes.herokuapp.com/api/recipes</p>

  <p>to <strong>ADD</strong> new ingredients by recipe_id: <strong>POST</strong> to https://bw-grandmas-recipes.herokuapp.com/api/recipes/:id/ingredients</p>

  <p>to <strong>ADD</strong> new instructions by recipe_id: <strong>POST</strong> to https://bw-grandmas-recipes.herokuapp.com/api/recipes/:id/instructions</p>


  `);
});
module.exports = server;
