import {Route, Routes} from "react-router-dom"
import Layout from "./layout/Layout"
import ShortsLayout from "./layout/ShortsLayout"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "pages/SignUpPage"
import BoardPage from "pages/BoardPage"
import AnimalPage from "pages/AnimalPage"
import ArticleBoardList from "components/board/articles/ArticleBoardList"
import ArticleDetail from "components/board/articles/ArticleDetail"
import ArticleBoardWrite from "components/board/articles/ArticleBoardWrite"
import AnimalBoardList from "components/board/animals/AnimalBoardList"
import ShortsPage from "pages/ShortsPage"
import ShortsComment from "components/shorts/ShortsComment"
import LostAndFoundPage from "pages/LostAndFoundPage"
import ShortsTagDetail from "components/shorts/ShortsTagDetail"
import Report from "./components/map/Report"

import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import MyPage from "pages/MyPage"
import UsersLayout from "layout/UsersLayout"
import {
  selectIsAuthenticated,
  setAuthenticated,
} from "features/user/users-slice"
import MyPageDisableContainer from "components/users/MyPageDisableContainer"
import UpdateProfilePage from "pages/UpdateProfilePage"
import PrivateRoute from "routes/PrivateRoute"

function App() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(selectIsAuthenticated)

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
          <Route path="details/:id" element={<ArticleDetail />} />
          <Route path="write" element={<ArticleBoardWrite />} />
        </Route>
      </Route>
      <Route path="/users/" element={<UsersLayout />}>
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="sign-up" element={<SignUpPage />}></Route>
        <Route path="update" element={<UpdateProfilePage />}></Route>
        <Route
          path=":user-id"
          element={
            <PrivateRoute
              component={<MyPage />}
              isAuthenticated={isAuthenticated}
            />
          }
        >
          <Route path="disable" element={<MyPageDisableContainer />}></Route>
        </Route>
      </Route>
      <Route path="/lost-and-found" element={<LostAndFoundPage />}>
        <Route path="/lost-and-found/report" element={<Report />}></Route>
      </Route>
      <Route path="/short" element={<ShortsPage />}></Route>
      <Route path="/shorts" element={<ShortsLayout />}>
        <Route path="/shorts/comments" element={<ShortsComment />}></Route>
        <Route path="/shorts/tag" element={<ShortsTagDetail />}></Route>
      </Route>
    </Routes>
  )
}

export default App
