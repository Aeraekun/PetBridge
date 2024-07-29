import {Navigate} from "react-router-dom"

const PrivateRoute = ({isAuthenticated, component: Component}) => {
  return isAuthenticated ? (
    Component
  ) : (
    <Navigate to="/users/login" {...alert("로그인이 필요합니다.")} />
  )
}

export default PrivateRoute
