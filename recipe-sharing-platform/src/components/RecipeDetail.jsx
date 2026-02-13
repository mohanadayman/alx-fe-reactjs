import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import recipeData from '../data.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Find the specific recipe by ID (matching types as params are strings)
    const foundRecipe = recipeData.find((item) => item.id === parseInt(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Recipe not found.</p>
        <Link title="Go Back" to="/" className="mt-4 text-orange-600 hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-12">
      {/* Hero Image Section */}
      <div className="relative h-64 md:h-96 w-full">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
          <div className="max-w-5xl mx-auto w-full px-6 pb-8">
            <Link to="/" className="text-white text-sm font-medium mb-4 inline-block hover:underline">
              ← Back to Recipes
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md">
              {recipe.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Sidebar: Ingredients */}
          <section className="lg:col-span-1">
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>
              <ul className="space-y-3">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="h-2 w-2 mt-2 mr-3 bg-orange-500 rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                )) || <p className="text-gray-400 italic">No ingredients listed.</p>}
              </ul>
            </div>
          </section>

          {/* Main: Instructions */}
          <section className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Instructions</h2>
            <div className="space-y-8">
              {recipe.instructions?.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="pt-1">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {step}
                    </p>
                  </div>
                </div>
              )) || <p className="text-gray-400 italic">No instructions provided.</p>}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default RecipeDetail;