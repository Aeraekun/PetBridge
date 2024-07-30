import {useDispatch, useSelector} from "react-redux"
import {
  getUserInfoThunk,
  logOut,
  selectNickname,
} from "features/user/users-slice"
import {Link, NavLink, useNavigate} from "react-router-dom"
import MyPageNavComponent from "./MyPageNavComponent"
import DefaulUser150 from "assets/icons/icon-default-user-150.svg"
import iconMyArticles from "assets/icons/icon-my-articles.svg"
import iconMyShorts from "assets/icons/icon-my-shorts.svg"
import iconMyContracts from "assets/icons/icon-my-contracts.svg"
import iconMyFavorites from "assets/icons/icon-my-favorites.svg"
import iconMyLikes from "assets/icons/icon-my-likes.svg"
import iconMyPets from "assets/icons/icon-my-pets.svg"

const MyPageNavList = () => {
  let itemId = 0

  const navItems = [
    {
      id: itemId++,
      text: "내가 쓴 글",
      imgSrc: iconMyArticles,
      url: "articles",
    },
    {id: itemId++, text: "내 펫픽", imgSrc: iconMyShorts, url: "petpics"},
    {
      id: itemId++,
      text: "내 입양기록(계약서)",
      imgSrc: iconMyContracts,
      url: "contracts",
    },
    {
      id: itemId++,
      text: "내 관심등록 동물",
      imgSrc: iconMyFavorites,
      url: "favorites",
    },
    {
      id: itemId++,
      text: "내가 좋아요한 펫픽",
      imgSrc: iconMyLikes,
      url: "likes",
    },
    {id: itemId++, text: "나의 동물", imgSrc: iconMyPets, url: "pets"},
  ]

  return (
    <nav className="flex h-[260px] w-[300px] flex-col justify-between px-5">
      {navItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.url}
          className={({isActive}) =>
            `rounded-xl ${isActive ? "bg-yellow" : ""}`
          }
        >
          <MyPageNavComponent text={item.text} imgSrc={item.imgSrc} />
        </NavLink>
      ))}
    </nav>
  )
}

const MyPageNavContainer = () => {
  // 유저 이름 초기화
  const userName = useSelector(selectNickname)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // 로그아웃
  const deleteJWT = () => {
    console.log("NavAction.jsx => deleteJWT => 리프레시 토큰 삭제")
    localStorage.removeItem("refreshToken")
    sessionStorage.removeItem("accessToken")
    navigate("/")
  }

  const handleLogOut = () => {
    console.log("NavAction.jsx => handleLogOut 함수 호출")
    const logOutMessage = dispatch(logOut())
    console.log(logOutMessage)
    deleteJWT()
  }

  const onClickUsernameHandler = () => {
    console.log(getUserInfoThunk())
  }

  return (
    // 마이페이지 전체 틀
    <div className="flex h-full w-[300px] flex-col  items-center justify-center space-y-4 py-2.5 text-center">
      {/* 1. 유저 프로필 이미지 */}
      <img
        src={DefaulUser150}
        alt="유저 이미지"
        className="size-[150px] rounded-full"
      />
      {/* 2. 유저 이름 */}
      <button className="bg-white text-2xl" onClick={onClickUsernameHandler}>
        {userName}
      </button>
      {/* 3. 수정하기, 로그아웃 */}
      <div className="flex space-x-5">
        <Link
          to="/users/update"
          className="flex h-[35px] w-[100px] items-center justify-center rounded-xl bg-mild"
        >
          수정하기
        </Link>
        <button
          className="flex h-[35px] w-[100px] items-center justify-center rounded-xl bg-mild"
          onClick={handleLogOut}
        >
          로그아웃
        </button>
      </div>
      {/* 카테고리 리스트 */}
      <MyPageNavList />
      {/* 회원 버튼 */}
      <NavLink
        to="disable"
        className={({isActive}) => [isActive ? "text-red-400" : "text-stroke"]}
      >
        [회원 탈퇴하기]
      </NavLink>
    </div>
  )
}

export default MyPageNavContainer
