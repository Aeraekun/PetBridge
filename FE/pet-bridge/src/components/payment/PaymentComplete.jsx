import {useEffect} from "react"
import {useNavigate, useSearchParams} from "react-router-dom"
import {getPaymentCompleted} from "api/contracts-api.js"

const PaymentComplete = () => {
  let [infoQuery] = useSearchParams()
  const navigate = useNavigate()
  const getInfoFromQuery = async () => {
    const contract_id = infoQuery.get("contract_id")
    const pg_token = infoQuery.get("pg_token")

    if (contract_id && pg_token) {
      try {
        await getPaymentCompleted(contract_id, pg_token)
        alert("계약 체결이 완료되었습니다.")
      } catch (error) {
        console.log(error)
        alert("결제를 실패했습니다. 계약을 다시 체결해주세요.")
      }
      navigate(`/contracts/${contract_id}`)
    } else {
      alert("결제 정보를 받아오는 데 실패했습니다. 계약을 다시 체결해주세요.")
      navigate("")
    }
  }

  useEffect(() => {
    getInfoFromQuery()
  }, [])

  return <div>결제 완료 페이지</div>
}

export default PaymentComplete
