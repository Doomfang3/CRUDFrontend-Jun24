import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from '../styles/NewRecipePage.module.css'
import { Button, MultiSelect, TextInput } from '@mantine/core'

const NewRecipePage = () => {
  const navigate = useNavigate()

  const [ingredients, setIngredients] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    instructions: [],
    ingredients: [1, 3],
  })

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/recipes`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const parsed = await response.json()
      console.log(parsed)
      navigate(`/details/${parsed.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAllIngredients = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/ingredients`)
      if (response.ok) {
        const ingredientsData = await response.json()
        setIngredients(ingredientsData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllIngredients()
  }, [])

  return (
    <>
      <h2>New Recipe</h2>
      <form onSubmit={handleSubmit} className={classes.formCtn}>
        <TextInput
          label='Title'
          value={formData.title}
          onChange={event => setFormData({ ...formData, title: event.target.value })}
        />

        <TextInput
          label='Instructions'
          value={formData.instructions.join(',')}
          onChange={event =>
            setFormData({ ...formData, instructions: event.target.value.split(',') })
          }
        />
        <MultiSelect
          label='Ingredients'
          value={formData.ingredients.map(currentIngredientId => currentIngredientId.toString())}
          data={ingredients.map(currentIngredient => ({
            value: currentIngredient.id.toString(),
            label: currentIngredient.name,
          }))}
          onChange={event =>
            setFormData({
              ...formData,
              ingredients: event.map(currentIngredientId => parseInt(currentIngredientId)),
            })
          }
        />

        <Button variant='outline' color='teal' size='xl' radius='xl' type='submit'>
          Button
        </Button>
      </form>
    </>
  )
}

export default NewRecipePage
