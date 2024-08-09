import {getUsersByNickname} from "api/users-api"
import AdminUser from "components/my-page/AdminUser"
import {useEffect, useState} from "react"

const MyPageUsersContainer = () => {
  const [searchValue, setSearchValue] = useState("")
  const [userDatas, setUserDatas] = useState([])

  // searchValue가 변경되면 동작,
  // 닉네임으로 전체 회원을 조회해서 맞는 회원의 리스트를 반환
  useEffect(() => {
    const searchUsers = async () => {
      try {
        const res = await getUsersByNickname(searchValue)
        // 검색된 데이터가 있는 경우, 해당 데이터로
        if (res.data) {
          setUserDatas(res.data)
          // 검색된 데이터가 없는 경우, 빈 배열로 변경
        } else {
          setUserDatas([])
        }
        // 에러가 반환된 경우, 빈 배열로 변경
      } catch (error) {
        setUserDatas([])
        console.log(error)
      }
    }

    searchUsers()
  }, [searchValue])

  // input 값이 변경되면 검색 값을 동기화
  const onChangeHandler = (event) => {
    const target = event.target
    setSearchValue(target.value)
  }
  return (
    <div className="flex flex-col items-center">
      <button className="my-2.5 text-4xl font-bold">회원 관리</button>
      <input
        value={searchValue}
        type="search"
        placeholder="회원 닉네임으로 검색"
        className="my-2 w-[500px] border px-5 py-3 text-sm outline-1"
        onChange={onChangeHandler}
      />
      <table className="table-auto text-center">
        <thead>
          <tr>
            <th className="w-[150px]">이메일</th>
            <th className="w-[150px]">닉네임</th>
            <th className="w-[100px]">정지 여부</th>
            <th className="w-[100px]">권한</th>
            <th className="w-[100px]">회원 삭제</th>
          </tr>
        </thead>
        <tbody>
          {userDatas.map((user) => (
            <AdminUser key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MyPageUsersContainer
