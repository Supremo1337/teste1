require("dotenv").config();

const { connect, connection } = require("mongoose");
connect(process.env.DB_URL);

var db = connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("Database actived");
});

const express = require("express");

const server = express();
const routes = require("./src/routes");
var cors = require("cors");
server.use(express.json()); // faz com que o express entenda JSON
const { createProxyMiddleware } = require("http-proxy-middleware");
server.use(cors());
server.use(
  "/api",
  routes,
  createProxyMiddleware({
    target: "http://localhost:8000/",
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
  })
);

server.use(express.urlencoded({ extended: "true" }));
server.listen(8000);