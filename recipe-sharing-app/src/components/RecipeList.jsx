import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  const handleFavoriteClick = (recipeId) => {
    if (favorites.includes(recipeId)) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
      generateRecommendations();
    }
  };

  return (
    <div>
      {filteredRecipes.length === 0 ? (
        <p>No recipes found. Try a different search!</p>
      ) : (
        <>
          {filteredRecipes.map(recipe => (
            <div key={recipe.id}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <Link to={`/recipe/${recipe.id}`}>View Details</Link>
              <button
                onClick={() => handleFavoriteClick(recipe.id)}>
                {favorites.includes(recipe.id) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
export default RecipeList;