import {useState, useRef} from "react"

const SearchDropDown = ({subtitle, placeholder, itemName, onDataChange}) => {
  const [searchValue, setSearchValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})
  const buttonRef = useRef(null)
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

  const clickHandler = () => {
    const rect = buttonRef.current.getBoundingClientRect()
    setPosition({x: rect.left, y: rect.bottom})
    setIsOpen(!isOpen)
  }

  const onClickHandler = (event) => {
    const selectedSearchId = event.target.id
    onDataChange(selectedSearchId)
  }

  position

  return (
    <>
      <button onClick={clickHandler} ref={buttonRef}>
        {subtitle}
      </button>
      {isOpen && (
        <div
          className="fixed flex h-80 w-60 flex-col divide-y rounded-xl border bg-white shadow-xl"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: "translateY(10px)",
          }}
        >
          <div className="flex h-10 w-full justify-between p-3 text-sm">
            <span>{subtitle}</span> <button onClick={clickHandler}>X</button>
          </div>
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
                  <button
                    id={user.id}
                    onClick={onClickHandler}
                    className="me-3 inline-flex h-10 grow items-center rounded-xl p-3 hover:bg-stroke hover:text-white"
                  >
                    {user.nickname}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchDropDown
