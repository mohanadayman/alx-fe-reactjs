import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AddRecipeForm } from './components/AddRecipeForm.jsx'
import { RecipeList } from './components/RecipeList.jsx'
import { RecipeDetails } from './components/RecipeDetails.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><AddRecipeForm /><RecipeList /></>} />
        <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
