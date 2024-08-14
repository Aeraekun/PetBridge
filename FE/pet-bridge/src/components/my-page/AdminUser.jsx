import {deleteUser} from "api/users-api"
import Swal from "sweetalert2"

const AdminUser = ({user}) => {
  const disableUser = async ({id, nickname}) => {
    const result = await Swal.fire({
      title: `${nickname} 유저의 회원 정보를 삭제하시겠습니까?`,
      showCancelButton: true,
      confirmButtonText: "네",
      confirmButtonColor: "#fe85ac",
      cancelButtonText: "아니요",
      cancelButtonColor: "#a4a2a1",
      customClass: {
        confirmButton: "w-20 py-2 text-white font-semibold rounded-md",
        cancelButton: "w-20 py-2 text-white font-semibold rounded-md",
      },
    })
    if (result.isConfirmed) deleteUser(id)
  }

  const onClickDisableHandler = (userId) => {
    disableUser(userId)
  }

  return (
    <tr className="border-2">
      <td className="h-12">{user.email}</td>
      <td>{user.nickname}</td>
      <td>{!user.disabled ? <span>활성</span> : <span>비활성</span>}</td>
      <td>{user.role}</td>
      <td>
        <button
          onClick={() =>
            onClickDisableHandler({id: user.id, nickname: user.nickname})
          }
          className="outline-alert hover:bg-alert rounded-lg p-1 outline"
        >
          회원 삭제
        </button>
      </td>
    </tr>
  )
}

export default AdminUser
