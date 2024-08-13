const MyPageNav = ({text, imgSrc}) => {
  return (
    <div className="flex size-full h-[35px] items-center justify-between px-2.5 md:font-medium">
      <img src={imgSrc} alt={text} className="px-1" />
      <span className="hidden md:inline">{text}</span>
      <div />
    </div>
  )
}

export default MyPageNav
