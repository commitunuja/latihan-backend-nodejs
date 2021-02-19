const express = require("express");
const routes = express.Router();   

routes.use(require("./crud"));


module.exports = routes;