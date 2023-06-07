let regexName = /^[a-zA-Z\s]+$/;

export const validate = (input) => {
  let errors = {};

  if (!input.title) {
    errors.title = "Title cannot be null.";
  }

  if (!regexName.test(input.title)) {
    errors.title = "title invalid.";
  }

  if (!input.summary) {
    errors.summary = "Summary cannot be null.";
  }

  if (input.healthScore < 1 || input.healthScore > 100) {
    errors.healthScore = "The health score is 1 - 100.";
  }

  if (!input.steps) {
    errors.steps = "Enter the recipe steps.";
  }

  if (!input.diets || input.diets.length === 0) {
    errors.diets = "At least one diet is required";
  }

  return errors;
};
