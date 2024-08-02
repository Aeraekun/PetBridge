import {useState} from "react"

const SearchDropDown = ({subtitle, placeholder, itemName}) => {
  const [searchValue, setSearchValue] = useState("")
  let id = 1
  let nicknameId = 1
  const userDatas = [
    {id: id++, nickname: `유저 닉네임${nicknameId++}`},
    {id: id++, nickname: `유저 닉네임${nicknameId++}`},
    {id: id++, nickname: `유저 닉네임${nicknameId++}`},
    {id: id++, nickname: `유저 닉네임${nicknameId++}`},
    {id: id++, nickname: `유저 닉네임${nicknameId++}`},
    {id: id++, nickname: `유저 닉네임${nicknameId++}`},
    {id: id++, nickname: `유저 닉네임${nicknameId++}`},
    {id: id++, nickname: `유저 닉네임${nicknameId++}`},
    {id: id++, nickname: `유저 닉네임${nicknameId++}`},
    {id: id++, nickname: `유저 닉네임${nicknameId++}`},
    {id: id++, nickname: `유저 닉네임${nicknameId++}`},
    {id: id++, nickname: `유저 닉네임${nicknameId++}`},
    {id: id++, nickname: `유저 닉네임${nicknameId++}`},
    {id: id++, nickname: `유저 닉네임${nicknameId++}`},
  ]

  const onChangeHandler = (event) => {
    const target = event.target
    setSearchValue(target.value)
  }

  return (
    <div className=" flex h-80 w-60 flex-col divide-y rounded-xl border shadow-xl">
      <div className="h-10 w-full p-3 text-sm">{subtitle}</div>
      <div className="mb-1 h-10 w-full">
        <input
          value={searchValue}
          type="search"
          placeholder={placeholder}
          className="w-full border-none px-5 py-3 text-sm outline-1"
          onChange={onChangeHandler}
        />
      </div>
      <div className="h-60 w-full overflow-auto">
        <div className="p-3">
          {itemName}
          <span className="mx-2 rounded-xl bg-stroke px-2 py-1 text-xs">
            14
          </span>
        </div>
        <ul>
          {userDatas.map((user) => (
            <li key={user.id} className="flex items-center">
              <span className="w-5"></span>
              <button className="me-3 inline-flex h-10 grow items-center rounded-xl p-3 hover:bg-stroke hover:text-white">
                {user.nickname}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SearchDropDown
