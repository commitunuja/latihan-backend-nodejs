const express = require("express");
const routes = express.Router();   

routes.use(require("./crud"));
routes.use(require("./upload"));
routes.use(require("./auth"));


module.exports = routes;