import {Navigate} from "react-router-dom"

const PrivateRoute = ({isAuthenticated, isLoading, component: Component}) => {
  if (isLoading) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? (
    Component
  ) : (
    <Navigate to="/users/login" {...alert("로그인이 필요합니다.")} />
  )
}

export default PrivateRoute
