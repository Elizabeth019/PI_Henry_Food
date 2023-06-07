import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const GET_RECIPE_DETAILS = "GET_RECIPE_DETAILS";
export const GET_DIETS = "GET_DIETS";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const FILTER_BY_TYPE_DIET = "FILTER_BY_TYPE_DIET";
export const ORDER_BY_ALPHABET = "ORDER_BY_ALPHABET";
export const FILTER_BY_RESOURCES = "FILTER_BY_RESOURCES";
export const ORDER_BY_HEALTH_SCORE = "ORDER_BY_HEALTH_SCORE";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const GET_DATABASE = "GET_DATABASE";

const URL = "http://localhost:3001";

export function getRecipes() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/recipe`);
      console.log(response)
      return dispatch({
        type: GET_RECIPES,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getRecipeByName(title) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/recipe/?name=${title}`);
      console.log(response)
      return dispatch({
        type: GET_RECIPE_BY_NAME,
        payload: response.data,
      });
    } catch (err) {
      // alert("Recipe not found.");
      console.log(err)
    }
  };
}

export function getRecipeDetails(id) {
    return async function (dispatch) {
        try {
            const response = (await axios.get(`${URL}/recipe/${id}`));
            console.log(response)
            return dispatch({
                type: GET_RECIPE_DETAILS,
                payload: response.data,
            });
        } catch (err) {
            console.log(err);
  }
}

}

export function getDiets() {
  return async function (dispatch) {
    try {
      let response = (await axios.get(`${URL}/diet`)).data;
       if (response.length < 10) response = await axios.get(`${URL}/diet`);
      console.log(response)
      return dispatch({
        type: GET_DIETS,
        payload: response,
        
      });
    } catch (err) {
      console.log(err);
    }
  };

}
export function createRecipe(payload) {
  console.log(payload)
  return async function (dispatch) {
    try {
      const response = await axios.post(`${URL}/recipe`, payload);
      console.log(response);
      return dispatch({
        type: CREATE_RECIPE,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
    console.log(payload)
  };
}

export function filterByTypeDiet(payload) {
  console.log(payload)
  return {
    type: FILTER_BY_TYPE_DIET,
    payload: payload,
  };
}

export function orderByAlphabet(payload) {
  return {
    type: ORDER_BY_ALPHABET,
    payload,
  };
}

export function filterByResources(payload) {
  return {
    type: FILTER_BY_RESOURCES,
    payload: payload,
  };
}

export function orderByHealthScore(payload) {
  return {
    type: ORDER_BY_HEALTH_SCORE,
    payload,
  };
}

export function clearDetail() {
  return {
    type: CLEAR_DETAIL,
  };
}


export function getDatabase() {
  return async function (dispatch) {
    try {
      let dataBase = await axios.get(`${URL}/recipe/dates`);
      return dispatch({
        type: GET_DATABASE,
        payload: dataBase.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}