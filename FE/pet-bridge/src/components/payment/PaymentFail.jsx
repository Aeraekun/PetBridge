import {useEffect} from "react"
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {selectId} from "features/user/users-slice.js"
import {Toast} from "utils/common-utils"

const PaymentFail = () => {
  const navigate = useNavigate()
  const userId = useSelector(selectId)

  useEffect(() => {
    Toast.fire({
      icon: "warning",
      title: "결제를 실패했습니다. 계약을 다시 체결해주세요.",
    })
    if (userId) {
      navigate(`/users/${userId}/contracts`)
    } else {
      navigate("/")
    }
  }, [userId])

  return <div>결제 실패</div>
}

export default PaymentFail
