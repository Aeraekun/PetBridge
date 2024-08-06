import PropTypes from "prop-types"

const Button = ({text, onClick}) => {
  return (
    <button
      className="h-12 rounded-md border border-stroke bg-mild px-3.5 py-2.5"
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button

Button.propTypes = {
  text: PropTypes.string.isRequired,
}
