import {reportdata} from "components/my-page/reportdata"
import AdminReport from "./AdminReport"

const MyPageReportsContainer = () => {
  return (
    <div className="flex flex-col items-center">
      <p>회원 관리</p>
      <table className="table-auto">
        <thead>
          <tr>
            <th>유저</th>
            <th>대상 유형</th>
            <th>사유</th>
            <th>내용</th>
            <th>회원 삭제</th>
          </tr>
        </thead>
        <tbody>
          {reportdata.map((report) => (
            <AdminReport key={report.id} report={report} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MyPageReportsContainer
