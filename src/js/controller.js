import * as model from './model';
import recipeView from './views/recipeViews';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    //loading recipe
    await model.loadRecipe(id);

    //  rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError(error);
  }
};

//controlRecipes();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
