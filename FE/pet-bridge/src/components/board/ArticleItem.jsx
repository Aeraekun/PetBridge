const ArticleItem = ({data}) => {
  return (
    <div className="max-w-xs mx-auto my-4 rounded-xl border border-gray-300 shadow-md overflow-hidden">
      <img src={data.image} alt="imag" />
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img
            src="https://via.placeholder.com/50" // Placeholder avatar
            alt="Author Avatar"
            className="w-12 h-12 rounded-full border border-gray-300"
          />
          <div className="ml-4">
            <p className="text-lg font-semibold">Author Nickname</p>
          </div>
        </div>
        {data.title}
      </div>
    </div>
  )
}
export default ArticleItem
