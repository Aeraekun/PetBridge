import AdminUser from "components/my-page/AdminUser"
import {userdata} from "components/my-page/userdata"

const MyPageUsersContainer = () => {
  return (
    <div className="flex flex-col items-center">
      <p>회원 관리</p>
      <table className="table-auto">
        <thead>
          <tr>
            <th>이메일</th>
            <th>닉네임</th>
            <th>정지 여부</th>
            <th>권한</th>
            <th>회원 삭제</th>
          </tr>
        </thead>
        <tbody>
          {userdata.map((user) => (
            <AdminUser key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MyPageUsersContainer
