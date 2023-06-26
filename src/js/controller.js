import * as model from './model';
import recipeView from './views/recipeViews';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

if (module.hot) {
  module.hot.accept();
}

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

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //get search query
    const query = searchView.getQuery();
    if (!query) return;

    // load search results
    await model.loadSearchResults();

    // render search results
    resultsView.render(model.state.search.results);
  } catch (error) {
    resultsView.renderError(error);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
