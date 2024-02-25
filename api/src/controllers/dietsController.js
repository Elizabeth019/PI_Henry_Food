const { Diets } = require("../db");
const axios = require("axios");
// const postDiet = require("../handlers/handlerPostDiet");
const { API_KEY, URL_SPOONACULAR } = process.env;

const getTypesDiets = async () => {

  const eachDiets = [];
  
const typesDiet = (
  await axios.get(
    `${URL_SPOONACULAR}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
     // `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
  )
).data.results;
        
        const die = typesDiet.map((elem) => elem.diets)
  
  for (let i = 0; i < die.length; i++) {
    for (let j = 0; j < die[i].length; j++) {
      eachDiets.push(die[i][j]);
    }
  }
  
  const dataArr = new Set(eachDiets);
  
  let result = [...dataArr];
  
  await postDiet(result); 
  
   const all = await Diets.findAll();

  return all

};

const postDiet = async (dataArr) => {
  await dataArr.map((elem) => {
    Diets.findOrCreate({
      where: {
        name: elem,
      },
    });
  });
};

module.exports = {
  getTypesDiets,
};
