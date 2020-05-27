const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");

const authenticate = require("./auth/auth-middleware.js");
const authRouter = require("./auth/auth-router");
const recipeRouter = require("./recipes/recipes-router");

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
server.use("/api/recipes", recipeRouter);

server.get("/api", (req, res) => {
  res.status(200).send(`
  <h1>Welcome to the Secret Family Recipes API!</h1>

  <h3>Send your requests to these endpoints:</h3>

  <p>*** Heroku wipes the databse every 24-48 hours so until I make the transition to Postgres, register your dummy id after long absences ***</p>

  <p>to <strong>REGISTER</strong> a new user: <strong>POST</strong> to https://bw-grandmas-recipes.herokuapp.com/api/auth/register</p>

  <p>to <strong>LOGIN</strong> a user: <strong>POST</strong> to https://bw-grandmas-recipes.herokuapp.com/api/auth/login</p>

  <p>to <strong>LOGOUT</strong> a user: <strong>GET</strong> to https://bw-grandmas-recipes.herokuapp.com/api/auth/logout</p>


          <p>to <strong>GET</strong> all added recipes: <strong>GET</strong> to https://bw-grandmas-recipes.herokuapp.com/api/recipes</p>

    <p>to <strong>GET</strong> all registered users: <strong>GET</strong> to https://bw-grandmas-recipes.herokuapp.com/api/recipes/users</p>

          <p>to <strong>GET</strong> all added recipes w/ instructions: <strong>GET</strong> to https://bw-grandmas-recipes.herokuapp.com/api/recipes/instructions</p>


  `);
});
module.exports = server;
