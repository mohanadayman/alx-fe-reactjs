import { useParams, Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import { EditRecipeForm } from './EditRecipeForm';
import { DeleteRecipeButton } from './DeleteRecipeButton';

 export const RecipeDetails = () => {
    const { recipeId } = useParams();
    const recipe = useRecipeStore(state =>
      state.recipes.find(recipe => recipe.id === parseInt(recipeId))
    );

    if (!recipe) {
      return (
        <div>
          <p>Recipe not found</p>
          <Link to="/">Back to Recipes</Link>
        </div>
      );
    }

    return (
      <div>
        <Link to="/">Back to Recipes</Link>
        <h1>{recipe.title}</h1>
        <p>{recipe.description}</p>
        <EditRecipeForm recipeId={recipe.id} />
        <DeleteRecipeButton recipeId={recipe.id} />
      </div>
    );
  };
