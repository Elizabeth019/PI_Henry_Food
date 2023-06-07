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
    const idRecipe = await getRecipeId(id, source) ;

    res.status(200).json(idRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
};

const nameRecipe = async (req, res) => {
  const { name } = req.query;

  try {
    const search = name ? await searchName(name) : await searchAllRecipe();
    res.status(200).json(search);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const newRecipe = async (req, res) => {
  const { title, summary, healthScore, image, steps, diets } = req.body;

  try {
    const recipeNuevo = await createRecipe(
      title,
      summary,
      healthScore,
      image,
      steps,
      diets
    );
    console.log("nuevo",recipeNuevo)
    res.status(201).json(recipeNuevo);
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message });
  }
};

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
