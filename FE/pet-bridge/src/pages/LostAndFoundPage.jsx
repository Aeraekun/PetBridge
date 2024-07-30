import Kakao from "components/map/Kakao"
import Report from "components/map/Report"
import Navbar from "components/header/Navbar"
import {Routes, Route, Link} from "react-router-dom"

const LostAndFoundPage = () => {
  return (
    <>
      <Navbar />
      <header className="border-b bg-yellow py-10 text-center">
        <div className="flex justify-center space-x-6 text-lg">
          <button>
            <Link to="/lost-and-found">실종동물지도</Link>
          </button>
          <button>
            <Link to="/lost-and-found/report">실종동물 제보하기</Link>
          </button>
          <button>
            <Link to="/lost-and-found/1">
              실종동물 상세페이지[페이지 구현 후 삭제필요]
            </Link>
          </button>
        </div>
      </header>
      <section className="grid place-items-center">
        <Routes>
          <Route path="/" element={<Kakao />}></Route>
          <Route path="/report" element={<Report />}></Route>
        </Routes>
      </section>
    </>
  )
}

export default LostAndFoundPage
