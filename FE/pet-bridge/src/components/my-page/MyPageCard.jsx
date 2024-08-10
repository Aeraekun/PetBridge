const MyPageCard = ({
  imageSrc,
  imageAlt,
  content1,
  content2,
  content3,
  onClick,
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      className="h-[450px] w-[300px] snap-center overflow-hidden rounded-xl border"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick()
        }
      }}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="h-[300px] w-full rounded-t-xl"
      />
      <ul className="space-y-2.5 p-2.5 text-left font-bold">
        <li>{content1}</li>
        <li>{content2}</li>
        <li>{content3}</li>
      </ul>
    </div>
  )
}

export default MyPageCard
