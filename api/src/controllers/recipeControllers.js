const axios = require("axios");
const { Recipe, Diets } = require("../db");
const { API_KEY, URL_SPOONACULAR } = process.env;
require("dotenv").config();

const getRecipeId = async (id, source) => {
  const recip =
    source === "api"
      ? await axios.get(
          // `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
          `${URL_SPOONACULAR}/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
        )
      : await Recipe.findAll({
        where: { id },
        include: {
          model: Diets,
          attributes: ["name"],
          through: {
            attributes: [],
          }
        }
      });


  const detail = source === "api" ? recip.data.results.find((el) => el.id === Number(id)) : recip
  if (source === "api") {
    const { title, summary, healthScore, image, analyzedInstructions, diets } =
    detail;

  let recipeDetail = {
    id,
    title,
    summary,
    healthScore,
    image,
    steps:
      analyzedInstructions.length > 0 &&
      analyzedInstructions[0].steps.map((s) => s.step),
    diets,
  };

    return recipeDetail;
    
  } else {
    const dbInfo = detail.map(el => {
      const dietas = el.diets.map(e => e.name)
      return {
        id: el.id,
        title: el.title,
        summary: el.summary,
        healthScore: el.healthScore,
        image: el.image,
        steps: el.steps,
        diets:dietas,
      };
    })
    return dbInfo[0]
  }
  
};

const searchName = async (name) => {
  const databaseName = await Recipe.findAll();

  const apiName =

    (
      await axios.get(
        // `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
        `${URL_SPOONACULAR}/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
      )
    ).data.results;

  const apiNameClean = cleanArray(apiName);

  const filterName = apiNameClean.filter((r) =>
    r.title.toLowerCase().includes(name.toLowerCase())
  );
  return [...databaseName, ...filterName];
};

const searchAllRecipe = async () => {
  const databaseName = await Recipe.findAll({
    include: {
      model: Diets,
      attributes: ["name"],
      through: {
        attributes:[],
      }
    }
  });
  const dbInf = databaseName.map(el => {
    const dataDiet = el.diets.map(e => e.name)
    return {
      id: el.id,
      title: el.title,
      summary: el.summary,
      healthScore: el.healthScore,
      image: el.image,
      steps: el.steps,
      diets: dataDiet,
    };
})

  const apiName =
    
    (
      await axios.get(
        // `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
          `${URL_SPOONACULAR}/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
      )
    ).data.results;

  const apiNameClean = cleanArray(apiName);

  return [...dbInf, ...apiNameClean];
};

const createRecipe = async (
 title,
  summary,
  healthScore,
  image,
  steps,
  diets
) => {
  let recipeCreate = await Recipe.create({
    title,
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
      title: elemento.title,
      summary: elemento.summary,
      healthScore: elemento.healthScore,
      image: elemento.image,
      steps: elemento.analyzedInstructions[0]?.steps.map((s) => {
        return {
          number: s.number,
          step: s.step,
        };
      }),
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
