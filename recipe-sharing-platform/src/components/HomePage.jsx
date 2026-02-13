import { useState, useEffect } from 'react';
import recipeData from '../data.json';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        setRecipes(recipeData);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <header className="max-w-7xl mx-auto mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 text-center">
                    Recipes
                </h1>
            </header>

            <main className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recipes.map((recipe) => (
                        <div
                            key={recipe.id}
                            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                        >
                            <div className="relative h-48 w-full overflow-hidden">
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-2">
                                    {recipe.title}
                                </h2>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {recipe.summary}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default HomePage;