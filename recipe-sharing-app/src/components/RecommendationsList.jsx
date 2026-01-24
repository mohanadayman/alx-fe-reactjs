import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecommendationsList = () => {
    const recommendations = useRecipeStore(state => state.recommendations);
    const recipes = useRecipeStore(state => state.recipes);

    // Get recommended recipes based on favorites
    const recommendedRecipes = recommendations.length > 0
        ? recommendations.map(id => recipes.find(recipe => recipe.id === id)).filter(Boolean)
        : [];

    return (
        <div>
            <h2>Recommended For You</h2>
            {recommendedRecipes.length === 0 ? (
                <p>Add recipes to your favorites to get personalized recommendations!</p>
            ) : (
                <div>
                    {recommendedRecipes.map(recipe => (
                        <div key={recipe.id}>
                            <h3>{recipe.title}</h3>
                            <p>{recipe.description}</p>
                            <Link to={`/recipe/${recipe.id}`}>View Details</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecommendationsList;
