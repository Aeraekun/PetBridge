import {deleteUser} from "api/users-api"

const AdminUser = ({user}) => {
  const disableUser = ({id, nickname}) => {
    if (confirm(`${nickname} 유저의 회원 정보를 삭제하시겠습니까?`))
      deleteUser(id)
  }

  const onClickDisableHandler = (userId) => {
    disableUser(userId)
  }

  return (
    <tr>
      <td>{user.email}</td>
      <td>{user.nickname}</td>
      <td>{user.disabled ? <span>활성</span> : <span>비활성</span>}</td>
      <td>{user.role}</td>
      <button
        onClick={() =>
          onClickDisableHandler({id: user.id, nickname: user.nickname})
        }
        className="bg-alertrounded-xl"
      >
        회원 삭제
      </button>
    </tr>
  )
}

export default AdminUser
