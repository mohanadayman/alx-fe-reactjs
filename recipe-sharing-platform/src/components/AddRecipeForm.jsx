import { useState } from 'react';

const AddRecipeForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    image: '',
    ingredients: '',
    steps: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.summary.trim()) newErrors.summary = "A short summary is required";
    
    // Ingredient validation: split by newline and filter empty strings
    const ingredientList = formData.ingredients.split('\n').filter(i => i.trim() !== '');
    if (ingredientList.length < 2) {
      newErrors.ingredients = "Please include at least 2 ingredients (one per line)";
    }

    if (!formData.steps.trim()) newErrors.steps = "Preparation steps are required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // In a real app, you'd send this to your backend or local storage
      const finalRecipe = {
        ...formData,
        id: Date.now(),
        ingredients: formData.ingredients.split('\n').filter(i => i.trim() !== ''),
        steps: formData.steps.split('\n').filter(s => s.trim() !== '')
      };
      
      console.log("Recipe Submitted:", finalRecipe);
      setIsSubmitted(true);
      // Reset form
      setFormData({ title: '', summary: '', image: '', ingredients: '', steps: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for a field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gray-900 py-6 px-8">
          <h2 className="text-2xl font-bold text-white">Add New Recipe</h2>
          <p className="text-gray-400 text-sm">Share your culinary masterpiece with the world.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {isSubmitted && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              Success! Your recipe has been added.
            </div>
          )}

          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Recipe Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Grandma's Famous Lasagna"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Image URL & Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Summary</label>
              <input
                type="text"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none ${errors.summary ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
          </div>

          {/* Ingredients Textarea */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Ingredients (one per line)</label>
            <textarea
              name="ingredients"
              rows="4"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="2 cups flour&#10;1 tsp salt..."
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none ${errors.ingredients ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.ingredients && <p className="text-red-500 text-xs mt-1">{errors.ingredients}</p>}
          </div>

          {/* Steps Textarea */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Preparation Steps</label>
            <textarea
              name="steps"
              rows="6"
              value={formData.steps}
              onChange={handleChange}
              placeholder="1. Preheat oven to 350F..."
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none ${errors.steps ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.steps && <p className="text-red-500 text-xs mt-1">{errors.steps}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-lg transform active:scale-95"
          >
            Publish Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;