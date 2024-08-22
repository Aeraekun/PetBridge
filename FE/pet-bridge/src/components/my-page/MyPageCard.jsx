import DOMPurify from "dompurify"

const MyPageCard = ({
  imageSrc,
  imageAlt,
  content1,
  content2,
  content3,
  content,
  onClick,
}) => {
  const sanitizedContent = DOMPurify.sanitize(content) // Quill 안정성 높이기
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
        <div>{content3}</div>
        {content && (
          <div
            dangerouslySetInnerHTML={{__html: sanitizedContent}}
            className="text-overflow"
          />
        )}
      </ul>
    </div>
  )
}

export default MyPageCard
