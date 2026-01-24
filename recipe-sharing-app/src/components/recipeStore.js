import { create } from 'zustand'

export const useRecipeStore = create(set => ({
    recipes: [],
    addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
    setRecipes: (recipes) => set({ recipes }),
    updateRecipe: (recipeId, updatedRecipe) => set(state => ({
        recipes: state.recipes.map(recipe => recipe.id === recipeId ? updatedRecipe : recipe)
    })),
    deleteRecipe: (recipeId) => set(state => ({
        recipes: state.recipes.filter(recipe => recipe.id !== recipeId)
    })),

    searchTerm: '',
    filteredRecipes: [],
    setSearchTerm: (term) => set(state => {
        const filtered = state.recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(term.toLowerCase()) ||
            recipe.description.toLowerCase().includes(term.toLowerCase())
        );
        return { searchTerm: term, filteredRecipes: filtered };
    }),

    favorites: [],
    addFavorite: (recipeId) => set(state => ({ favorites: [...state.favorites, recipeId] })),
    removeFavorite: (recipeId) => set(state => ({
        favorites: state.favorites.filter(id => id !== recipeId)
    })),
    recommendations: [],
    generateRecommendations: () => set(state => {
        // Mock implementation based on favorites
        const recommended = state.recipes.filter(recipe =>
            state.favorites.includes(recipe.id) && Math.random() > 0.5
        );
        return { recommendations: recommended };
    }),
}));