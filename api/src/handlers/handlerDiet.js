const { getTypesDiets } = require(`../controllers/dietsController`);

const getDiets = async (req, res) => {
  //const { diets } = req.query;

  try {
    const typeDie = await getTypesDiets()
    res.status(200).json(typeDie);
  } catch (err) {
    res.status(404).json({err: err.message});
    
  }
};

module.exports = {
  getDiets,
};
