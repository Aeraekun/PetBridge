import {getUsersByNickname} from "api/users-api"
import {setOpponentInfo} from "features/chat/chat-slice"
import {useState, useRef, useEffect} from "react"
import {useDispatch} from "react-redux"
import DefaultUser150 from "assets/icons/icon-default-user-150.svg"

const SearchDropDown = ({subtitle, placeholder, itemName, onDataChange}) => {
  const [searchValue, setSearchValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({x: 180, y: 80})
  const dispatch = useDispatch()

  const buttonRef = useRef(null)
  const [userDatas, setUserDatas] = useState([])
  const [userCount, setUserCounts] = useState(0)

  // searchValue가 변경되면 동작,
  // 닉네임으로 전체 회원을 조회해서 맞는 회원의 리스트를 반환
  useEffect(() => {
    const searchUsers = async () => {
      try {
        const res = await getUsersByNickname(searchValue)
        // 검색된 데이터가 있는 경우, 해당 데이터로
        if (res.data) {
          setUserDatas(res.data)
          setUserCounts(res.data.length)
          // 검색된 데이터가 없는 경우, 빈 배열로 변경
        } else {
          setUserDatas([])
          setUserCounts(0)
        }
        // 에러가 반환된 경우, 빈 배열로 변경
      } catch (error) {
        setUserDatas([])
        setUserCounts(0)
        console.log(error)
      }
    }

    if (searchValue) {
      searchUsers()
    }
  }, [searchValue])

  const onChangeHandler = (event) => {
    const target = event.target
    setSearchValue(target.value)
  }

  const clickHandler = () => {
    const rect = buttonRef.current.getBoundingClientRect()
    setPosition({x: rect.left, y: rect.bottom})
    setIsOpen(!isOpen)
  }

  const clickItemHandler = (event) => {
    // 특정 유저를 클릭했을 때, 해당 유저 아이디를 기준으로 배열에서 찾아 정보를 상태에 저장
    const selectedSearchId = event.currentTarget.id
    const selectedInfo = userDatas.find(
      (data) => Number(data.id) === Number(selectedSearchId)
    )
    onDataChange(selectedSearchId)

    // const selectedInfo = userDatas[event.target.key]
    dispatch(setOpponentInfo(selectedInfo))
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={clickHandler}
        className="absolute right-4 top-0 flex h-10 justify-between rounded-xl border p-3 text-sm"
        ref={buttonRef}
      >
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
                {userCount}
              </span>
            </div>
            <ul>
              {userDatas.map((user, index) => (
                <li
                  key={user.id}
                  className="flex w-full items-center overflow-x-hidden"
                >
                  <button
                    key={index}
                    id={user.id}
                    onClick={clickItemHandler}
                    className="me-3 flex h-10 grow items-center gap-2 rounded-xl p-3 hover:bg-stroke hover:text-white"
                  >
                    <img
                      src={user.image ? user.image : DefaultUser150}
                      alt={user.nickname}
                      className="size-8 rounded-full"
                    />
                    <span className="whitespace-nowrap">{user.nickname}</span>
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
