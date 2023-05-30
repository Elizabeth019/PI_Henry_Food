let validURL = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};
// Funcion para validar el nombre. (Solo caracteres a-z A-Z)
let validName = (str) => {
  let pattern = /^[a-zA-Z\s]+$/;
  return pattern.test(str);
};

let validate = (input) => {
  let errors = {};

  // Name obligatorio.
  if (!input.name) {
    errors.name = "Name cannot be null.";
  }
  // Solo letras
  if (input.name && !validName(input.name)) {
    errors.name = "Name invalid.";
  }
  // Summary obligatorio.
  if (!input.summary) {
    errors.summary = "Summary cannot be null.";
  }
  // El score tiene que ser de 1 a 100, puede ser nulo.
  if (input.score < 1 || input.score > 100) {
    errors.score = "The score is 1 - 100.";
  }
  // El healthScore tiene que ser de 1 a 100, puede ser nulo.
  if (input.healthScore < 1 || input.healthScore > 100) {
    errors.healthScore = "The health score is 1 - 100.";
  }
  // La imagen puede no ingresarse, si se ingresa tiene que pasar la validación.
  if (input.image && !validURL(input.image)) {
    errors.image = "Invalid URL.";
  }
  // Obligatorio los pasos.
  if (!input.steps) {
    errors.steps = "Enter the recipe steps.";
  }
  // Obligatorio tipo de dieta.
  if (!input.diets.length) {
    errors.diets = "Select at least one diet.";
  }
  if (input.diet && !validName(input.diet)) {
    errors.diet = "Diet invalid.";
  }

  return errors;
};

exports = {
    validate,
    validURL,
    validName,
    
}