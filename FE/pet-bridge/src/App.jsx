import {Route, Routes} from "react-router-dom"
import Layout from "./layout/Layout"
import ShortsLayout from "./layout/ShortsLayout"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "pages/SignUpPage"
import CommunityPage from "pages/CommunityPage"
import ShortsPage from "pages/ShortsPage"
import ShortsComment from "components/shorts/ShortsComment"
import LostAndFoundPage from "pages/LostAndFoundPage"
import ShortsTagDetail from "components/shorts/ShortsTagDetail"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/communities" element={<CommunityPage />}></Route>
      </Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/lost-and-found" element={<LostAndFoundPage />}></Route>
      <Route path="/signup" element={<SignUpPage />}></Route>
      <Route path="/short" element={<ShortsPage />}></Route>
      <Route path="/shorts" element={<ShortsLayout />}>
        <Route path="/shorts/comments" element={<ShortsComment />}></Route>
        <Route path="/shorts/tag" element={<ShortsTagDetail />}></Route>
      </Route>
    </Routes>
  )
}

export default App
