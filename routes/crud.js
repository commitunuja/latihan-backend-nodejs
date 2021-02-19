const crudControllers = require("../controllers/crud")
const validation = require("../middleware/validation");

const express = require("express");
const routes = express.Router();  
    
routes.get("/crud/", crudControllers.tampil);
routes.post("/crud", validation.validate("crud"), crudControllers.simpan);
routes.put("/crud/:id_crud",validation.validate("crud"), crudControllers.edit);
routes.delete("/crud/:id_crud", crudControllers.hapus);
    
module.exports = routes;