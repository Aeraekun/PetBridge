import PropTypes from "prop-types"

const Input = ({type = "text", placeholder = "검색어를 입력하세요", id}) => {
  return (
    <input
      className="w-full rounded-md border p-2.5"
      type={type}
      name=""
      id={id}
      placeholder={placeholder}
    />
  )
}

export default Input

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}
