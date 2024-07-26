import MyPageNavList from "./MyPageNavList"
import {useSelector} from "react-redux"
import {selectUserName} from "features/user/users-slice"

import DefaulUser150 from "assets/image/default_user_150.png"

const MyPageNav = () => {
  // 유저 이름 초기화
  const userName = useSelector(selectUserName)

  return (
    // 마이페이지 전체 틀
    <div className="flex h-full w-[300px] flex-col  items-center justify-center space-y-4 rounded-l-lg border py-2.5 text-center">
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
      <ul className="flex h-[260px] w-[250px] flex-col justify-between ">
        <MyPageNavList />
      </ul>
      {/* 회원 버튼 */}
      <span className="text-stroke">[회원 탈퇴하기]</span>
    </div>
  )
}

export default MyPageNav
