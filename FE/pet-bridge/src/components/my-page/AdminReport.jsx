import {deleteUser, patchReport} from "api/users-api"
import Swal from "sweetalert2"

const AdminReport = ({report}) => {
  const disableUser = async (userId) => {
    const result = await Swal.fire({
      title: `${userId} 유저의 회원 정보를 삭제하시겠습니까?`,
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
    if (result.isConfirmed) deleteUser(userId)
  }

  const patchReportStatus = async (reportId) => {
    const result = await Swal.fire({
      title: `신고 번호 ${reportId} 의 신고 처리 상태를 변경하시겠습니까?`,
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
    if (result.isConfirmed) {
      patchReport(reportId)
    }
  }

  const onClickDisableHandler = (userId) => {
    disableUser(userId)
  }

  const onClickPatchHandler = (reportId) => {
    patchReportStatus(reportId)
  }

  return (
    <tr className="border-2">
      <td>{report.userId}</td>
      <td>{report.reportType}</td>
      <td>{report.reason}</td>
      <td>{report.confirmed}</td>
      <td>
        <button
          onClick={() => onClickDisableHandler(report.userId)}
          className="outline-alert hover:bg-alert rounded-lg p-1 outline"
        >
          회원 삭제
        </button>
      </td>
      <td>
        {report.confirmed ? (
          <button disabled={true} className="bg-stroke rounded-lg p-1">
            처리 완료
          </button>
        ) : (
          <button
            onClick={() => onClickPatchHandler(report.id)}
            className="outline-alert hover:bg-alert rounded-lg p-1 outline"
          >
            신고 처리
          </button>
        )}
      </td>
    </tr>
  )
}

export default AdminReport
