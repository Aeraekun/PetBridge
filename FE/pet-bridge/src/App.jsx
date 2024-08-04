import {Route, Routes} from "react-router-dom"
import Layout from "./layout/Layout"
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
import ShortsLayout from "layout/ShortsLayout"
import Report from "./components/map/Report"

import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {selectIsAuthenticated, setUserInfos} from "features/user/users-slice"
import PrivateRoute from "routes/PrivateRoute"

// 유저
import LoginPage from "./pages/LoginPage"
import SignUpPage from "pages/SignUpPage"
import UsersLayout from "layout/UsersLayout"
import UpdateProfilePage from "pages/UpdateProfilePage"

// 소셜로그인
import SocialPage from "pages/SocialPage"
import SocialSuccessContainer from "components/users/SocailSuccessContainer"
import SocialUpdateContainer from "components/users/SocialUpdateContainer"

// 마이페이지
import MyPage from "pages/MyPage"
import MyPageDisableContainer from "components/my-page/MyPageDisableContainer"
import MyPageArtilcesContainer from "components/my-page/MyPageArticlesContainer"
import MyPageContractsContainer from "components/my-page/MyPageContractsContainer"
import MyPageFavoritesContainer from "components/my-page/MyPageFavoritesContainer"
import MyPageLikesContainer from "components/my-page/MyPageLikesContainer"
import MyPagePetPicsContainer from "components/my-page/MyPagePetPicsContainer"
import MyPageAnimalsContainer from "components/my-page/MyPageAnimalsContainer"
import MyPageReportsContainer from "components/my-page/MyPageReportsContainer"
import MyPageUsersContainer from "components/my-page/MyPageUsersContainer"

import {
  getAccessTokenFromSession,
  getUserInfosFromSession,
} from "utils/user-utils"

// 계약서
import ContractsContainer from "components/contracts/ContractsContainer"
import ContractsPage from "pages/ContractsPage"
import PetpickComments from "components/petpick/PetpickComments"
import PetpickTagDetail from "components/petpick/PetpickTagDetail"
import ContractsCreateContainer from "components/contracts/ContractsCreateContainer"

// 메인페이지
import MainPage from "pages/MainPage"
import AiPage from "pages/AiPage"
import AiEyes from "components/ai/AiEyes"
import AiSkin from "components/ai/AiSkin"
import ChatModal from "pages/ChatModal"
import AnimalAPIBoardLIst from "components/board/animals/AnimalAPIBoardLIst"

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
    <div>
      <ChatModal />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />} exact />
          <Route path="/shelter" element={<AnimalPage />}>
            <Route index element={<AnimalBoardList />} />
            <Route path="0" element={<AnimalAPIBoardLIst />} />
            <Route path="1" element={<AnimalBoardList />} />
            <Route path="details/:id" element={<AnimalDetail />} />
            <Route path="modify/:id" element={<AnimalDetailModify />} />
            <Route path="regist" element={<AnimalRegist />} />
          </Route>
          <Route
            path="/petpick/write"
            element={
              <PrivateRoute
                component={<PetpickWrite />}
                isAuthenticated={isAuthenticated}
              />
            }
          ></Route>
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
          <Route path="/contracts" element={<ContractsPage />}>
            <Route path=":id" element={<ContractsContainer />}></Route>
            <Route path="create" element={<ContractsCreateContainer />}></Route>
          </Route>
          <Route path="/ai" element={<AiPage />}>
            <Route path="eyes" element={<AiEyes />} />
            <Route path="skin" element={<AiSkin />} />
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
            <Route path="disable" element={<MyPageDisableContainer />} />
            <Route path="articles" element={<MyPageArtilcesContainer />} />
            <Route path="petpics" element={<MyPagePetPicsContainer />} />
            <Route path="pets" element={<MyPageAnimalsContainer />} />
            <Route path="contracts" element={<MyPageContractsContainer />} />
            <Route path="favorites" element={<MyPageFavoritesContainer />} />
            <Route path="likes" element={<MyPageLikesContainer />} />
            <Route path="admin-users" element={<MyPageUsersContainer />} />
            <Route path="admin-reports" element={<MyPageReportsContainer />} />
          </Route>
        </Route>
        <Route path="/lost-and-found" element={<LostAndFoundPage />}>
          <Route path="/lost-and-found/report" element={<Report />}></Route>
        </Route>
        <Route path="/petpick" element={<ShortsLayout />}>
          <Route path="" element={<PetpickComments />}></Route>
        </Route>
        <Route path="/petpick/:id/tag" element={<PetpickTagDetail />}></Route>

        <Route path="/contracts" element={<ContractsPage />}>
          <Route path=":id" element={<ContractsContainer />}></Route>
          <Route path="create" element={<ContractsContainer />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
