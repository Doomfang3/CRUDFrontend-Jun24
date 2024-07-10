import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'

const RecipeDetailsPage = () => {
  const navigate = useNavigate()
  const { recipeId } = useParams()
  const [recipeDetails, setRecipeDetails] = useState({})

  const fetchDetails = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/recipes/${recipeId}`)
      if (!response.ok) {
        throw new Error('Error fetching recipe details', response)
      }
      const recipeData = await response.json()
      setRecipeDetails(recipeData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchDetails()
  }, [])

  const handleDelete = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/recipes/${recipeId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      Recipe Detail
      <div>
        <p>
          <b>Recipe name: </b>
          {recipeDetails.title}
        </p>
        <p>
          <b>Description: </b>
          {recipeDetails.instructions}
        </p>
        <Button variant='filled' color='cyan' component={Link} to={`/recipes/edit/${recipeId}`}>
          Update
        </Button>
        <Button
          leftSection={<IconTrash size={14} />}
          variant='filled'
          color='red'
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </>
  )
}

export default RecipeDetailsPage
