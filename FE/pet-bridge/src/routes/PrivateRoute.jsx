import SirenModal from "components/common/SirenModal"
import {useState} from "react"

// import {Navigate} from "react-router-dom"

const PrivateRoute = ({isAuthenticated, isLoading, component: Component}) => {
  const [modalOpen, setModalOpen] = useState(true)
  if (isLoading) {
    return <div>Loading...</div>
  }

  const closeModal = () => {
    setModalOpen(false)
  }
  return isAuthenticated ? (
    Component
  ) : (
    // <Navigate to="/users/login" {...alert("로그인이 필요합니다.")} />
    <SirenModal isOpen={modalOpen} onClose={closeModal} />
  )
}

export default PrivateRoute
