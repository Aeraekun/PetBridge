import {selectPhone, selectSocialType} from "features/user/users-slice"
import {useEffect} from "react"
import {useSelector} from "react-redux"
import {Outlet, useNavigate} from "react-router-dom"

const ContractsPage = () => {
  const phone = useSelector(selectPhone)
  const socialType = useSelector(selectSocialType)
  const navigate = useNavigate()

  useEffect(() => {
    if (socialType && !phone) {
      alert("계약 진행을 위해 전화번호 인증이 필요합니다.")
      navigate("/users/social/update")
    }
  }, [phone])

  return (
    <div>
      <main className="flex flex-col items-center">
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default ContractsPage
