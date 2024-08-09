import AdminReport from "./AdminReport"
import {getResportList} from "api/mypage-api"
import {useEffect, useState} from "react"

const MyPageReportsContainer = () => {
  const [page] = useState(0)
  const [size] = useState(12)
  const [type] = useState("")
  const [reports, setReports] = useState([])

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await getResportList({
          page,
          size,
          type,
        })

        if (res.data.length > 0) {
          setReports(res.data)
        }
      } catch (error) {
        return error
      }
    }
    fetchReports()
  }, [page, size, type])
  return (
    <div className="flex flex-col items-center p-2.5">
      <button className="my-2.5 text-4xl font-bold">신고 관리</button>
      <div className="flex justify-between gap-4">
        <input
          type="number"
          id="page"
          className="w-24 border p-2"
          placeholder="page"
        />
        <input
          type="number"
          id="page"
          className="w-24 border p-2"
          placeholder="size"
        />
        <select type="number" id="page" className="w-24 border p-2">
          <option></option>
        </select>
      </div>
      <table className="table-fixed text-center">
        <thead>
          <tr>
            <th className="w-[100px]">유저</th>
            <th className="w-[100px]">대상 유형</th>
            <th className="w-[200px]">사유</th>
            <th className="w-[100px]">내용</th>
            <th className="w-[100px]">회원 삭제</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <AdminReport key={report.id} report={report} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MyPageReportsContainer
