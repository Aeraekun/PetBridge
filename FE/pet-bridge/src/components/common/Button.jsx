import PropTypes from "prop-types"

function Button({text}) {
  return (
    <button className="h-12 rounded-md border border-stroke bg-mild px-3.5 py-2.5">
      {text}
    </button>
  )
}

export default Button

Button.propTypes = {
  text: PropTypes.string.isRequired,
}
