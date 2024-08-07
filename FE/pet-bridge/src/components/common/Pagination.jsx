// 페이지 네이션 컴포넌트
// 현재페이지, 총 페이지, 페이지 바뀌었을때 이벤트처리 (페이지는 0부터 시작)
const Pagination = ({currentPage, totalPages, onPageChange}) => {
  const pages = []
  for (let i = 0; i < totalPages; i++) {
    pages.push(i)
  }

  return (
    <div className="mt-4 flex justify-center">
      {pages.map((page) => (
        <button
          key={page + 1}
          className={`mx-1 rounded border px-3 py-1 ${currentPage === page ? "bg-green-600 text-white" : "bg-white text-black"}`}
          onClick={() => onPageChange(page)}
        >
          {page + 1}
        </button>
      ))}
    </div>
  )
}
export default Pagination
