import {useState} from "react"
import searchIcon from "assets/icons/icon-search.png"

const Search = ({searchform}) => {
  const [inputKeyword, setInputKeyword] = useState("")
  const [type, setType] = useState("")

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSearch()
    }
  }

  const handleButtonClick = () => {
    handleSearch()
  }

  const handleSearch = () => {
    let params = {}
    if (type === "전체") {
      params = {title: inputKeyword, usernickname: inputKeyword}
    } else if (inputKeyword !== "") {
      params[type] = inputKeyword
    } else {
      params = {}
    }
    console.log(params, "params")
    searchform(params) // 새로운 검색 조건을 부모로 전달
    setInputKeyword("")
    setType("")
  }

  return (
    <div className="flex w-full items-center justify-between p-4">
      {/* <div className="flex w-full items-center justify-between rounded-md border border-[#D9D9D9] bg-pink-100 p-4"> */}
      <select
        id="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="h-12 w-48 rounded-xl border-2 border-stroke p-2"
      >
        <option value="전체">전체</option>
        <option value="title">제목</option>
        <option value="usernickname">닉네임</option>
      </select>
      <div className=" mr-10 flex  h-12 w-36 items-center justify-end text-lg">
        검색어
      </div>
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        value={inputKeyword}
        className="mr-12 h-12 w-full rounded-xl border-2 border-stroke p-2"
        onKeyDown={handleKeyDown}
        onChange={(e) => setInputKeyword(e.target.value)}
      />
      <button
        className="flex h-10 w-36 items-center justify-center rounded-xl bg-mild text-black"
        onClick={handleButtonClick}
      >
        <img src={searchIcon} alt="Search Icon" className="mr-2 size-[20px]" />
        검색
      </button>
    </div>
  )
}

export default Search
