const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.get("/", (req, res) => {
  res.status(200).send(`
  <h1>Welcome to the Secret Family Recipes API!</h1>

  <h4>Send your requests to these endpoints:</h4>

  <p>
    
  </p>

  `);
});
module.exports = server;
