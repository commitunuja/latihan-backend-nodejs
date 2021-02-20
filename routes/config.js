const express = require("express");
const routes = express.Router();   

routes.use(require("./crud"));
routes.use(require("./upload"));


module.exports = routes;