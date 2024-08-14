import {useState} from "react"

const Pagination = ({currentPage, totalPages, onPageChange}) => {
  const [visiblePageRange, setVisiblePageRange] = useState([0, 10])

  const handlePageChange = (page) => {
    onPageChange(page)
  }

  const handlePrev = () => {
    if (visiblePageRange[0] > 0) {
      setVisiblePageRange([
        visiblePageRange[0] - 10,
        Math.min(visiblePageRange[1] - 10, totalPages),
      ])
    }
  }

  const handleNext = () => {
    if (visiblePageRange[1] < totalPages) {
      setVisiblePageRange([
        visiblePageRange[0] + 10,
        Math.min(visiblePageRange[1] + 10, totalPages),
      ])
    }
  }

  const pages = []
  for (
    let i = visiblePageRange[0];
    i < Math.min(visiblePageRange[1], totalPages);
    i++
  ) {
    pages.push(i + 1)
  }

  return (
    <div className="mt-4 flex items-center justify-center">
      {visiblePageRange[0] > 0 && (
        <button
          className="mx-1 rounded border bg-white px-3 py-1 text-black"
          onClick={handlePrev}
        >
          이전
        </button>
      )}
      {pages.map((page) => (
        <button
          key={page}
          className={`mx-1 rounded border px-3 py-1 ${
            currentPage === page ? "bg-point text-white" : "bg-white text-black"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      {visiblePageRange[1] < totalPages && (
        <button
          className="mx-1 rounded border bg-white px-3 py-1 text-black"
          onClick={handleNext}
        >
          다음
        </button>
      )}
    </div>
  )
}

export default Pagination
