import {Route, Routes} from "react-router-dom"
import Layout from "./layout/Layout"
import LoginPage from "./pages/LoginPage"
import SignUp from "pages/SignUpPage"
import CommunityPage from "pages/CommunityPage"
import ShortsPage from "pages/ShortsPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/communities" element={<CommunityPage />}></Route>
      </Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/shorts" element={<ShortsPage />}></Route>
    </Routes>
  )
}

export default App
