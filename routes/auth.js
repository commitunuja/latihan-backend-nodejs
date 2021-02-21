const authControllers = require("../controllers/auth")
const validation = require("../middleware/validation");
const token = require("../middleware/jwt");

const express = require("express");
const routes = express.Router();  
    
routes.post("/auth", validation.validate("auth"), authControllers.daftar);
routes.post("/auth/login", validation.validate("auth"), authControllers.login);
routes.get("/auth",[token.checkTokenRoot], authControllers.coba);
routes.get("/auth/token", authControllers.token);

module.exports = routes;