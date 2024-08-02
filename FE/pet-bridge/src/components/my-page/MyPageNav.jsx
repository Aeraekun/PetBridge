const MyPageNav = ({text, imgSrc}) => {
  return (
    <div className="flex size-full h-[35px] items-center justify-between rounded-xl border px-2.5 font-medium">
      <img src={imgSrc} alt={text} />
      {text}
      <div></div>
    </div>
  )
}

export default MyPageNav
