import {useEffect} from "react"
import {useNavigate, useSearchParams} from "react-router-dom"
import {getPaymentCompleted} from "api/contracts-api.js"
import {Toast} from "utils/common-utils"

const PaymentComplete = () => {
  let [infoQuery] = useSearchParams()
  const navigate = useNavigate()
  const getInfoFromQuery = async () => {
    const contract_id = infoQuery.get("contract_id")
    const pg_token = infoQuery.get("pg_token")

    if (contract_id && pg_token) {
      try {
        await getPaymentCompleted(contract_id, pg_token)
        Toast.fire({icon: "success", title: "계약 체결이 완료됐어요."})
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "warning",
          title: "결제를 실패했습니다. 계약을 다시 체결해주세요.",
        })
      }
      navigate(`/contracts/${contract_id}`)
    } else {
      Toast.fire({
        icon: "warning",
        title:
          "결제 정보를 받아오는 데 실패했습니다. 계약을 다시 체결해주세요.",
      })
      navigate("")
    }
  }

  useEffect(() => {
    getInfoFromQuery()
  }, [])

  return <div>결제 완료 페이지</div>
}

export default PaymentComplete
