const { Router } = require("express");
const dietsRoute = Router();
const { getDiets } = require("../handlers/handlerDiet");

dietsRoute.get("/", getDiets);

module.exports = dietsRoute;
