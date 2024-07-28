import {useSelector} from "react-redux"
import {selectUserName} from "features/user/users-slice"
import {NavLink} from "react-router-dom"
import MyPageNavComponent from "./MyPageNavComponent"

import DefaulUser150 from "assets/images/icon-default-user-150.svg"
import iconMyArticles from "assets/images/icon-my-articles.svg"
import iconMyShorts from "assets/images/icon-my-shorts.svg"
import iconMyContracts from "assets/images/icon-my-contracts.svg"
import iconMyFavorites from "assets/images/icon-my-favorites.svg"
import iconMyLikes from "assets/images/icon-my-likes.svg"
import iconMyPets from "assets/images/icon-my-pets.svg"

const MyPageNavList = () => {
  let itemId = 0

  const navItems = [
    {
      id: itemId++,
      text: "내가 쓴 글",
      imgSrc: iconMyArticles,
    },
    {id: itemId++, text: "내 펫핏", imgSrc: iconMyShorts},
    {
      id: itemId++,
      text: "내 입양기록(계약서)",
      imgSrc: iconMyContracts,
    },
    {
      id: itemId++,
      text: "내 관심등록 동물",
      imgSrc: iconMyFavorites,
    },
    {
      id: itemId++,
      text: "내가 좋아요한 펫픽",
      imgSrc: iconMyLikes,
    },
    {id: itemId++, text: "나의 동물", imgSrc: iconMyPets},
  ]

  return (
    <nav className="flex h-[260px] w-[250px] flex-col justify-between ">
      {navItems.map((item) => (
        <NavLink key={item.id} className="">
          <MyPageNavComponent text={item.text} imgSrc={item.imgSrc} />
        </NavLink>
      ))}
    </nav>
  )
}

const MyPageNavContainer = () => {
  // 유저 이름 초기화
  const userName = useSelector(selectUserName)

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
      <span className="bg-white text-2xl">{userName}</span>
      {/* 3. 수정하기, 로그아웃 */}
      <div className="flex space-x-5">
        <div className="flex h-[35px] w-[100px] items-center justify-center rounded-xl bg-mild">
          수정하기
        </div>
        <div className="flex h-[35px] w-[100px] items-center justify-center rounded-xl bg-mild">
          로그아웃
        </div>
      </div>
      {/* 카테고리 리스트 */}
      <MyPageNavList />
      {/* 회원 버튼 */}
      <NavLink to="disable">
        <span className="text-stroke">[회원 탈퇴하기]</span>
      </NavLink>
    </div>
  )
}

export default MyPageNavContainer
