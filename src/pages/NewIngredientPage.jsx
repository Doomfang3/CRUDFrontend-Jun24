import { useState } from 'react'
import classes from '../styles/NewIngredientPage.module.css'

const NewIngredientPage = () => {
  const [name, setName] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/ingredients`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })
      if (response.ok) {
        const newIngredient = await response.json()
        console.log(newIngredient)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>New ingredient</h1>
      <form onSubmit={handleSubmit} className={classes.formCtn}>
        <label>
          Name: <input value={name} onChange={event => setName(event.target.value)} />
        </label>
        <button type='submit'>Create ingredient</button>
      </form>
    </>
  )
}

export default NewIngredientPage
