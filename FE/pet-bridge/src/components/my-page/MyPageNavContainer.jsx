import {useDispatch, useSelector} from "react-redux"
import {
  getUserInfoThunk,
  logOut,
  selectImage,
  selectNickname,
  selectRole,
} from "features/user/users-slice"
import {Link, NavLink, useNavigate} from "react-router-dom"
import MyPageNav from "./MyPageNav"
import DefaulUser150 from "assets/icons/icon-default-user-150.svg"
import iconMyArticles from "assets/icons/icon-my-articles.svg"
import iconMyShorts from "assets/icons/icon-my-shorts.svg"
import iconMyContracts from "assets/icons/icon-my-contracts.svg"
import iconMyFavorites from "assets/icons/icon-my-favorites.svg"
import iconMyLikes from "assets/icons/icon-my-likes.svg"
import iconMyPets from "assets/icons/icon-my-pets.svg"
import {useState} from "react"

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
      text: "내 입양 계약",
      imgSrc: iconMyContracts,
      url: "contracts",
    },
    {
      id: itemId++,
      text: "팔로우중인 동물",
      imgSrc: iconMyFavorites,
      url: "favorites",
    },
    {
      id: itemId++,
      text: "내 좋아요",
      imgSrc: iconMyLikes,
      url: "likes",
    },
    {id: itemId++, text: "나의 동물", imgSrc: iconMyPets, url: "pets"},
  ]

  return (
    <nav className="grid grid-cols-3 gap-4 px-5 md:flex md:flex-col md:justify-between">
      {navItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.url}
          className={({isActive}) =>
            `border rounded-xl ${isActive ? "bg-yellow" : ""}`
          }
        >
          <MyPageNav text={item.text} imgSrc={item.imgSrc} />
        </NavLink>
      ))}
    </nav>
  )
}

const MyPageNavContainer = () => {
  // 유저 정보 초기화
  const userName = useSelector(selectNickname)
  const userImage = useSelector(selectImage)
  const role = useSelector(selectRole)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 햄버거 버튼
  const [isNavOpen, setIsNavOpen] = useState(false)

  // 로그아웃 처리
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
    <div className="col-span-3 flex min-w-56 flex-col  items-center justify-center space-y-3 py-2.5 text-center md:h-full md:w-80">
      {/* 1. 유저 프로필 이미지 */}
      <img
        src={userImage ? userImage : DefaulUser150}
        alt="유저 이미지"
        className="size-[150px] rounded-full"
      />
      {/* 2. 유저 이름 */}
      <button className="bg-white text-2xl" onClick={onClickUsernameHandler}>
        {userName}
      </button>
      {/* 3. 수정하기, 로그아웃 */}
      <div className="flex items-center justify-between space-x-2">
        {/* 햄버거 버튼 */}
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
      <div className="md:hidden">
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="text-4xl focus:outline-none"
        >
          &#9776; {/* 햄버거 메뉴 아이콘 */}
        </button>
      </div>

      {/* 네비게이션 리스트 */}
      <div className={`${isNavOpen ? "block" : "hidden"} md:block`}>
        <MyPageNavList />
      </div>

      {role === "ADMIN" ? (
        // 관리자
        <div>
          <NavLink
            to="admin-users"
            className={({isActive}) => [
              isActive ? "text-red-400" : "text-stroke",
            ]}
          >
            [회원 관리]
          </NavLink>
          <NavLink
            to="admin-reports"
            className={({isActive}) => [
              isActive ? "text-red-400" : "text-stroke",
            ]}
          >
            [신고 관리]
          </NavLink>
        </div>
      ) : (
        <NavLink
          to="disable"
          className={({isActive}) => [
            isActive ? "text-red-400" : "text-stroke",
            "m-0",
          ]}
        >
          [회원 탈퇴하기]
        </NavLink>
      )}
    </div>
  )
}

export default MyPageNavContainer
