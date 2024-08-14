const Button = ({text, onClick}) => {
  return (
    <button
      className="border-stroke bg-mild h-8 truncate rounded-md p-1 sm:h-10 sm:px-2 sm:py-1.5 md:h-12 md:px-3.5 md:py-2.5"
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
