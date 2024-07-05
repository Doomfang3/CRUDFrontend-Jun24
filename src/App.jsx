import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import RecipeDetailsPage from './pages/RecipeDetailsPage'
import NewRecipePage from './pages/NewRecipePage'
import NewIngredientPage from './pages/NewIngredientPage'
import EditRecipe from './pages/EditRecipe'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/recipes/:recipeId' element={<RecipeDetailsPage />} />
        <Route path='/recipes/edit/:recipeId' element={<EditRecipe />} />
        <Route path='/recipes/add' element={<NewRecipePage />} />
        <Route path='/ingredients/add' element={<NewIngredientPage />} />
        <Route path='*' element={<h1>404 Page</h1>} />
      </Routes>
    </>
  )
}

export default App
