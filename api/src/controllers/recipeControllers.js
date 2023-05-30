const axios = require("axios");
const { Recipe, Diets } = require("../db");
const { API_KEY, URL_SPOONACULAR } = process.env;
require("dotenv").config();

const getRecipeId = async (id, source) => {
  /*  debo buscar por id, 
      debe devolver la info de dicha receta pedida,
      de incluir los datos tipo diets, 
      debe funcionar para la api como para la base de datos */

  const recip =
    source === "api"
      ?
      // (
      //     await axios.get(
      //       `${URL_SPOONACULAR}/recipes/${id}/information?apiKey=${API_KEY}`
      //     )
      //   ).data

(
      await axios.get(
        `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
        )
        ).data.results

      : await Recipe.findByPk(id);
  return recip

//   const detail = recip.find((el) => el.id == id);
//  console.log(detail);
  // const { title, summary, healthScore, image, analyzedInstructions, diets } =
  //   recip;

  // let recipeDetail = {
  //   id,
  //   title,
  //   summary,
  //   healthScore,
  //   image,
  //   steps: analyzedInstructions[0]?.steps.map(
  //     (el) => el.step !== undefined && el.step
  //   ),
  //   diets,
  // };

  // return recipeDetail;
};

const searchName = async (name) => {
  /*debo obtener todas las recetas que coincidan,
  que se pueda buscar independianetemente en mayúscula o minuscula, 
  se debe buscar tanto en la api como en la bdd */

    const databaseName = await Recipe.findAll();

  const apiName =
    // (
    //   await axios.get(
    //     `${URL_SPOONACULAR}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    //   )
    // ).data.results;

    (
      await axios.get(
        `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
      )
    ).data.results;
  
    const apiNameClean = cleanArray(apiName);

    const filterName = apiNameClean.filter((r) =>
      r.name.toLowerCase().includes(name.toLowerCase())
    );
    return [...databaseName, ...filterName];
};

const searchAllRecipe = async () => {
  const databaseName = await Recipe.findAll();

  const apiName =
    //   (
    //   await axios.get(
    //     `${URL_SPOONACULAR}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    //   )
    // ).data.results;

    (
      await axios.get(
        `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
      )
    ).data.results;

  const apiNameClean = cleanArray(apiName);

  return [...databaseName, ...apiNameClean];
};

const createRecipe = async (name, summary, healthScore, image, steps, diets) => {
  let recipeCreate = await Recipe.create({name,
summary,
    healthScore,
    image,
    steps,
  });

  let dietDB = await Diets.findAll({
    where: { name: diets },
  });

  await recipeCreate.addDiet(dietDB); 
  return recipeCreate;
};

const cleanArray = (array) =>
  array.map((elemento) => {
    return {
      id: elemento.id,
      name: elemento.title,
      summary: elemento.summary,
      // score: elemento.score,
      healthScore: elemento.healthScore,
      image: elemento.image,
      steps: elemento.steps,
      diets: elemento.diets,
      create: false,
    };
  });

module.exports = {
  getRecipeId,
  createRecipe,
  searchName,
  searchAllRecipe,
};
