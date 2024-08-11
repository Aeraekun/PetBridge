import {useEffect} from "react"
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {selectId} from "features/user/users-slice.js"

const PaymentCancel = () => {
  const navigate = useNavigate()
  const userId = useSelector(selectId)
  useEffect(() => {
    alert(
      "결제를 취소했습니다. 계약서 내용을 다시 확인하고 계약을 체결해주세요."
    )
    if (userId) {
      navigate(`/users/${userId}/contracts`)
    } else {
      navigate("/")
    }
  }, [userId])
  return <div>결제 취소</div>
}

export default PaymentCancel
