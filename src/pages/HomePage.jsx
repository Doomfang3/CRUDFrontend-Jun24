import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const [recipes, setRecipes] = useState([])

  const fetchAllRecipes = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/recipes`)

      if (response.ok) {
        const recipesData = await response.json()
        setRecipes(recipesData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllRecipes()
  }, [])

  return (
    <ul>
      {recipes.map(recipe => (
        <li key={recipe.id}>
          <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default HomePage
