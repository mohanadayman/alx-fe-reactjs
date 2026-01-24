import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
    const recipes = useRecipeStore(state => state.recipes);
    const favorites = useRecipeStore(state => state.favorites);
    const removeFavorite = useRecipeStore(state => state.removeFavorite);

    const favoriteRecipes = favorites.map(id =>
        recipes.find(recipe => recipe.id === id)
    ).filter(Boolean);

    return (
        <div >
            <h2>My Favorites ({favoriteRecipes.length})</h2>
            {favoriteRecipes.length === 0 ? (
                <p>No favorites yet. Start adding your favorite recipes!</p>
            ) : (
                <div>
                    {favoriteRecipes.map(recipe => (
                        <div key={recipe.id}>
                            <h3>{recipe.title}</h3>
                            <p>{recipe.description}</p>
                            <Link to={`/recipe/${recipe.id}`}>View Details</Link>
                            <button
                                onClick={() => removeFavorite(recipe.id)}
                            >
                                ❤️ Remove from Favorites
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default FavoritesList;