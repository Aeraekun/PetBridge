import {deleteUser} from "api/users-api"

const AdminReport = ({report}) => {
  const disableUser = ({id}) => {
    if (confirm(`${id} 유저의 회원 정보를 삭제하시겠습니까?`)) deleteUser(id)
  }

  const onClickDisableHandler = (userId) => {
    disableUser(userId)
  }

  return (
    <tr>
      <td>{report.userId}</td>
      <td>{report.reportType}</td>
      <td>{report.reason}</td>
      <td>{report.content}</td>
      <button
        onClick={() => onClickDisableHandler({id: report.userId})}
        className="bg-alert rounded-xl p-2.5"
      >
        회원 삭제
      </button>
    </tr>
  )
}

export default AdminReport
