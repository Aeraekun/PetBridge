import {Route, Routes} from "react-router-dom"
import Layout from "./layout/Layout"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "pages/SignUpPage"
import BoardPage from "pages/BoardPage"
import AnimalPage from "pages/AnimalPage"
import ArticleBoardList from "components/board/articles/ArticleBoardList"
import ArticleDetail from "components/board/articles/ArticleDetail"
import ArticleDetailModify from "components/board/articles/ArticleDetailModify"
import ArticleBoardWrite from "components/board/articles/ArticleBoardWrite"
import AnimalBoardList from "components/board/animals/AnimalBoardList"
import AnimalDetail from "components/board/animals/AnimalDetail"
import AnimalRegist from "components/board/animals/AnimalRegist"
import AnimalDetailModify from "components/board/animals/AnimalDetailModify"
import LostAndFoundPage from "pages/LostAndFoundPage"
import PetpickWrite from "components/petpick/PetpickWrite"
import Report from "./components/map/Report"

import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import MyPage from "pages/MyPage"
import UsersLayout from "layout/UsersLayout"
import {selectIsAuthenticated, setUserInfos} from "features/user/users-slice"
import MyPageDisableContainer from "components/users/MyPageDisableContainer"
import UpdateProfilePage from "pages/UpdateProfilePage"
import PrivateRoute from "routes/PrivateRoute"
import MyPageArtilcesContainer from "components/users/MyPageArticlesContainer"
import MyPageContractsContainer from "components/users/MyPageContractsContainer"
import MyPageFavoritesContainer from "components/users/MyPageFavoritesContainer"
import MyPageLikesContainer from "components/users/MyPageLikesContainer"
import MyPagePetPicsContainer from "components/users/MyPagePetPicsContainer"
import MyPagePetsContainer from "components/users/MyPagePetsContainer"
import SocialPage from "pages/SocialPage"
import SocialSuccessContainer from "components/users/SocailSuccessContainer"
import SocialUpdateContainer from "components/users/SocialUpdateContainer"
import {
  getAccessTokenFromSession,
  getUserInfosFromSession,
} from "utils/user-utils"
import ContractsContainer from "components/contracts/ContractsContainer"
import ContractsPage from "pages/ContractsPage"
import PetpickComments from "components/petpick/PetpickComments"
import PetpickTagDetail from "components/petpick/PetpickTagDetail"

function App() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const accessToken = getAccessTokenFromSession()
  const [isLoading, setIsLoading] = useState(true)

  // 액세스 토큰과 isAuthenticated 상태가 변경될 때마다 동작
  // 액세스 토큰이 있는지 확인하고, 유저 정보가 있다면 세션에 있는 유저 정보를 상태로 가져온다.
  // 새로고침시 회원 관련 화면 유지를 위한 기능
  useEffect(() => {
    const getUserInfo = () => {
      if (accessToken) {
        dispatch(setUserInfos(getUserInfosFromSession()))
      }
      setIsLoading(false)
    }

    getUserInfo()
  }, [dispatch, accessToken, isAuthenticated])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/shelter" element={<AnimalPage />}>
          <Route index element={<AnimalBoardList />} />
          <Route path=":bcode" element={<AnimalBoardList />} />
          <Route path="details/:id" element={<AnimalDetail />} />
          <Route path="modify/:id" element={<AnimalDetailModify />} />
          <Route path="regist" element={<AnimalRegist />} />
        </Route>
        <Route path="/communities" element={<BoardPage />}>
          <Route index element={<ArticleBoardList />} />
          <Route path=":bcode" element={<ArticleBoardList />} />
          <Route path="details/:id" element={<ArticleDetail />} />
          <Route path="modify/:id" element={<ArticleDetailModify />} />
          <Route
            path="write"
            element={
              <PrivateRoute
                component={<ArticleBoardWrite />}
                isAuthenticated={isAuthenticated}
              />
            }
          ></Route>
        </Route>
      </Route>
      <Route path="/users/" element={<UsersLayout />}>
        <Route path="social" element={<SocialPage />}>
          <Route path="success" element={<SocialSuccessContainer />}></Route>
          <Route path="update" element={<SocialUpdateContainer />}></Route>
        </Route>
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="sign-up" element={<SignUpPage />}></Route>
        <Route path="update" element={<UpdateProfilePage />}></Route>
        <Route
          path=":userId"
          element={
            <PrivateRoute
              component={<MyPage />}
              isLoading={isLoading}
              isAuthenticated={isAuthenticated}
            />
          }
        >
          <Route path="disable" element={<MyPageDisableContainer />}></Route>
          <Route path="articles" element={<MyPageArtilcesContainer />}></Route>
          <Route path="petpics" element={<MyPagePetPicsContainer />}></Route>
          <Route path="pets" element={<MyPagePetsContainer />}></Route>
          <Route
            path="contracts"
            element={<MyPageContractsContainer />}
          ></Route>
          <Route
            path="favorites"
            element={<MyPageFavoritesContainer />}
          ></Route>
          <Route path="likes" element={<MyPageLikesContainer />}></Route>
        </Route>
      </Route>
      <Route path="/lost-and-found" element={<LostAndFoundPage />}>
        <Route path="/lost-and-found/report" element={<Report />}></Route>
      </Route>
      <Route path="/petpick" element={<PetpickComments />}></Route>
      <Route path="/petpick/:id/tag" element={<PetpickTagDetail />}></Route>

      <Route
        path="/petpick/write"
        element={
          <PrivateRoute
            component={<PetpickWrite />}
            isAuthenticated={isAuthenticated}
          />
        }
      ></Route>
      <Route path="/contracts" element={<ContractsPage />}>
        <Route path=":id" element={<ContractsContainer />}></Route>
        <Route path="create" element={<ContractsContainer />}></Route>
      </Route>
    </Routes>
  )
}

export default App
