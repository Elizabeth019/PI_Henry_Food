const { Router } = require("express");
const recipeRoute = Router();
const { recipeId, nameRecipe, newRecipe } = require("../handlers/handlerRecipe");

recipeRoute.get("/", nameRecipe);
recipeRoute.get("/:id", recipeId); 
recipeRoute.post("/", newRecipe);

module.exports = recipeRoute;