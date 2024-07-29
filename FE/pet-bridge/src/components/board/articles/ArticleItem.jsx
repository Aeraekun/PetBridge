const ArticleItem = ({data}) => {
  return (
    <div className="w-72 h-[425px] mx-auto my-4 rounded-xl border border-stroke overflow-hidden">
      <img src={data.thumbnail} alt="imag" className="object-contain" />
      <div className="p-4">
        <div className="flex items-center mb-4 justify-around space-x-2.5 h-8">
          <img
            src="https://via.placeholder.com/50"
            alt="Author Avatar"
            className="w-12 h-12 rounded-full border "
          />
          <div className="flex-1">
            <p className="text-lg font-semibold">{data.nickname}</p>
          </div>

          <img
            src="/icons/icon-comment.svg"
            alt="Comment Icon"
            className="w-5"
          />
          <div>{data.count}</div>
        </div>
        <div className=" hover:text-clip text-overflow">{data.title}</div>
      </div>
    </div>
  )
}
export default ArticleItem
