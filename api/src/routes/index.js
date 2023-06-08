const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRoute = require("./Recipe.Route");
const dietsRoute = require("./Diets.Route");

const indexRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
indexRouter.use("/recipe", recipeRoute);
indexRouter.use("/diet", dietsRoute);

module.exports = indexRouter;
