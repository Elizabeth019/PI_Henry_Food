const {
  getRecipeId,
  createRecipe,
  searchName,
  searchAllRecipe,
} = require("../controllers/recipeControllers");

const recipeId = async (req, res) => {
  const { id } = req.params;

  const source = isNaN(id) ? "bdd" : "api";

  try {
    const idRecipe = await getRecipeId(id, source);
    //console.log(idRecipe);
    res.status(200).json(idRecipe);
  } catch (error) {
    res.status(400).json({ error: `No se Encontro Receta con el id: ${id}` });
  }
};

const nameRecipe = async (req, res) => {
  const { name } = req.query;

  try {
    const search = name ? await searchName(name) : await searchAllRecipe();
    res.status(200).json(search);
  } catch (error) {
    // res.status(404).json({ error :`No se encontro la receta con el nombre ${name}` });
    res.status(400).json({ error: error.message });
  }
};


const newRecipe = async (req, res) => {
  const { name, summary, healthScore, image, steps, diets } = req.body;

  try {
    const recipeNuevo = await createRecipe(
      name,
      summary,
      healthScore,
      image,
      steps,
      diets
    );
    res.status(201).json(recipeNuevo);
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message });
  }
};

//   const infoApi = await resApi?.map((r) => {
//     return {
//       id: r.id,
//       name: r.title,
//       summary: r.summary,
//       score: r.spoonacularScore,
//       healthScore: r.healthScore,
//       image: r.image,
//       steps: r.analyzedInstructions[0]?.steps.map((s) => {
//         return {
//           number: s.number,
//           step: s.step,
//         };
//       }),
//       diets: r.diets,
//       dish: r.dishTypes,
//     };
//   });
//   return infoApi;
// };

// const get_DataBase = async () => {
//   return await Recipe.findAll({
//     include: {
//       model: Diet,
//       attributes: ["name"],
//       through: {
//         attributes: [],
//       },
//     },
//   });
// };

module.exports = {
  recipeId,
  nameRecipe,
  newRecipe,
};
