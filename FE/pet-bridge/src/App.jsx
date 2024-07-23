import {Route, Routes} from "react-router-dom"
import Layout from "./layout/Layout"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "pages/SignUpPage"
import CommunityPage from "pages/CommunityPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/communities" element={<CommunityPage />}></Route>
      </Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signup" element={<SignUpPage />}></Route>
    </Routes>
  )
}

export default App
