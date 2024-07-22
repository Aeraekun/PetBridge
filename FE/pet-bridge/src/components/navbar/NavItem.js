import {Link} from "react-router-dom"
import PropTypes from "prop-types"

function NavItem({category}) {
  return (
    <li className="flex h-12 cursor-pointer items-center px-2.5 text-xl">
      <Link to="/">{category}</Link>
    </li>
  )
}

NavItem.propTypes = {
  category: PropTypes.string.isRequired,
}

export default NavItem
