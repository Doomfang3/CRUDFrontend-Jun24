import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { API_URL } from '../helpers/constants'
import { Button, MultiSelect, TextInput } from '@mantine/core'

/* {
    "id": 1,
    "title": "Pizza",
    "instructions": [
      "Make the dough",
      "Put stuff on it",
      "Cook it"
    ],
    "ingredients": [1, 2, 3]
  }, */

export default function EditRecipe() {
  const [title, setTitle] = useState('')
  const [instructions, setInstructions] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [ingredientsData, setIngredientsData] = useState([])

  const { recipeId } = useParams()
  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await fetch(`${API_URL}/recipes/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title, instructions, ingredients }),
      })
      if (response.ok) {
        navigate(`/recipes/${recipeId}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAllIngredients = async () => {
    try {
      const response = await fetch(`${API_URL}/ingredients`)
      if (response.ok) {
        const ingredientsData = await response.json()
        setIngredientsData(ingredientsData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllIngredients()
  }, [])

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${API_URL}/recipes/${recipeId}`)
        if (response.ok) {
          const recipeData = await response.json()
          setTitle(recipeData.title)
          setInstructions(recipeData.instructions)
          setIngredients(recipeData.ingredients)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchRecipe()
  }, [recipeId])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput label='Title' value={title} onChange={event => setTitle(event.target.value)} />

        <TextInput
          label='Instructions'
          value={instructions.join(',')}
          onChange={event => setInstructions(event.target.value.split(','))}
        />
        <MultiSelect
          label='Ingredients'
          value={ingredients.map(currentIngredientId => currentIngredientId.toString())}
          data={ingredientsData.map(currentIngredient => ({
            value: currentIngredient.id.toString(),
            label: currentIngredient.name,
          }))}
          onChange={event =>
            setIngredients(event.map(currentIngredientId => parseInt(currentIngredientId)))
          }
        />

        <Button variant='outline' color='teal' size='xl' radius='xl' type='submit'>
          Button
        </Button>
      </form>
    </>
  )
}
