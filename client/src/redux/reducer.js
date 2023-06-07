import {
  GET_RECIPES,
  GET_DIETS,
  GET_RECIPE_BY_NAME,
  GET_RECIPE_DETAILS,
  CREATE_RECIPE,
  FILTER_BY_TYPE_DIET,
  FILTER_BY_RESOURCES,
  ORDER_BY_ALPHABET,
  ORDER_BY_HEALTH_SCORE,
  CLEAR_DETAIL,
} from "./actions";

const initialState = {
  allRecipes: [],
  showedRecipes: [],
  diets: [],
  recipeDetails: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        showedRecipes: action.payload,
        allRecipes: action.payload,
      };

    case GET_RECIPE_BY_NAME:
      return {
        ...state,
        showedRecipes: action.payload,
      };

    case GET_RECIPE_DETAILS:
      return {
        ...state,
        recipeDetails: action.payload,
      };

    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };

    case CREATE_RECIPE:
      return {
        ...state
      };

    case FILTER_BY_TYPE_DIET:
      const all = state.allRecipes;
      const filter =
        action.payload === "all"
          ? all
          : all.filter((r) =>
              r.diets.find(
                (d) => d.name === action.payload || d === action.payload
              )
            );
      console.log(all);
      return {
        ...state,
        showedRecipes: filter,
      };

    case FILTER_BY_RESOURCES:
      const allRecipes1 = state.allRecipes;
      const statusFiltered2 =
        action.payload === "Filter by Source"
          ? allRecipes1.filter((el) => typeof el.id === "string")
          : allRecipes1.filter((el) => typeof el.id !== "number");

      return {
        ...state,
        showedRecipes:
          action.payload === "api"
            ? allRecipes1.filter((el) => typeof el.id === "number")
            : statusFiltered2,
      };

    case ORDER_BY_ALPHABET:
      let sortByAlphabet = [...state.showedRecipes];
      sortByAlphabet =
        action.payload === "atoz" //(de la A a la Z)
          ? state.showedRecipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
              if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
              return 0;
            })
          : state.showedRecipes.sort(function (a, b) {
              if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
              if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
              return 0;
            });
      return {
        ...state,
        showedRecipes: sortByAlphabet,
      };

    case ORDER_BY_HEALTH_SCORE: //(por puntuacion)
      let sortedByScore = [...state.showedRecipes];
      console.log(sortedByScore);
      sortedByScore =
        action.payload === "asc"
          ? state.showedRecipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) return 1;
              if (a.healthScore < b.healthScore) return -1;
              return 0;
            })
          : state.showedRecipes.sort(function (a, b) {
              if (a.healthScore < b.healthScore) return 1;
              if (a.healthScore > b.healthScore) return -1;
              return 0;
            });
      return {
        ...state,
        showedRecipes: sortedByScore,
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        recipeDetails: [],
      };

    default:
      return state;
  }
}
