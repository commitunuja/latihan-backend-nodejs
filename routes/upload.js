const crudControllers = require("../controllers/upload")
const validation = require("../middleware/validation");

const express = require("express");
const routes = express.Router();  

routes.get("/upload", crudControllers.tampil);
routes.post("/upload", crudControllers.simpan);
routes.put("/upload/:id_upload", crudControllers.edit);
routes.delete("/upload/:id_upload", crudControllers.hapus);

module.exports = routes;