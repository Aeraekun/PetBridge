import {Route, Routes} from "react-router-dom"
import Layout from "./layout/Layout"
import ShortsLayout from "./layout/ShortsLayout"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "pages/SignUpPage"
import BoardPage from "pages/BoardPage"
import AnimalPage from "pages/AnimalPage"
import ArticleBoardList from "components/board/articles/ArticleBoardList"
import AnimalBoardList from "components/board/animals/AnimalBoardList"
import ShortsPage from "pages/ShortsPage"
import ShortsComment from "components/shorts/ShortsComment"
import LostAndFoundPage from "pages/LostAndFoundPage"
import ShortsTagDetail from "components/shorts/ShortsTagDetail"

import {useDispatch} from "react-redux"
import {useEffect} from "react"
import MyPage from "pages/MyPage"
import UsersLayout from "layout/UsersLayout"
import {setAuthenticated} from "features/user/users-slice"
import MyPageDisableContainer from "components/users/MyPageDisableContainer"

setAuthenticated

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      dispatch(setAuthenticated(true))
    }
  })

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/shelter" element={<AnimalPage />}>
          <Route index element={<AnimalBoardList />} />
          <Route path=":bcode" element={<AnimalBoardList />} />
        </Route>
        <Route path="/communities" element={<BoardPage />}>
          <Route index element={<ArticleBoardList />} />
          <Route path=":bcode" element={<ArticleBoardList />} />
        </Route>
      </Route>
      <Route path="/users/" element={<UsersLayout />}>
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="sign-up" element={<SignUpPage />}></Route>
        <Route path=":user-id" element={<MyPage />}>
          <Route path="disable" element={<MyPageDisableContainer />}></Route>
        </Route>
      </Route>
      <Route path="/lost-and-found" element={<LostAndFoundPage />}></Route>
      <Route path="/short" element={<ShortsPage />}></Route>
      <Route path="/shorts" element={<ShortsLayout />}>
        <Route path="/shorts/comments" element={<ShortsComment />}></Route>
        <Route path="/shorts/tag" element={<ShortsTagDetail />}></Route>
      </Route>
    </Routes>
  )
}

export default App
