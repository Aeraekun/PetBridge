import {Route, Routes} from "react-router-dom"
import Layout from "./layout/Layout"
import ShortsLayout from "./layout/ShortsLayout"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "pages/SignUpPage"
import CommunityPage from "pages/CommunityPage"
import ShortsPage from "pages/ShortsPage"
import ShortComments from "components/shorts/ShortComments"
import LostAndFoundPage from "pages/LostAndFoundPage"
import {useDispatch} from "react-redux"
import {useEffect} from "react"
import {getUserInfo} from "api/users-api"
import MyPage from "pages/MyPage"
import UsersLayout from "layout/UsersLayout"
import ArticleBoardList from "components/board/ArticleBoardList"

function App() {
  const dispath = useDispatch()

  useEffect(() => {
    dispath(getUserInfo)
  })

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/communities" element={<CommunityPage />}>
          <Route path=":bcode" element={<ArticleBoardList />} />
        </Route>
      </Route>
      <Route path="/users/" element={<UsersLayout />}>
        <Route path="/users/login" element={<LoginPage />}></Route>
        <Route path="/users/sign-up" element={<SignUpPage />}></Route>
        <Route path="/users/:user-id" element={<MyPage />}></Route>
      </Route>
      <Route path="/lost-and-found" element={<LostAndFoundPage />}></Route>
      <Route path="/short" element={<ShortsPage />}></Route>
      <Route path="/shorts" element={<ShortsLayout />}>
        <Route path="comments" element={<ShortComments />}></Route>
      </Route>
    </Routes>
  )
}

export default App
