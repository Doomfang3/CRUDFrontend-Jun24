import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/recipes/add'>New recipe</Link>
        </li>
        <li>
          <Link to='/ingredients/add'>New ingredient</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
