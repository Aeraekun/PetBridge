const MyPageNavList = () => {
  const navItems = [
    "내가 쓴 글",
    "내 펫픽",
    "내 입양기록(계약서)",
    "내 관심등록 동물",
    "내가 좋아요한 펫픽",
    "나의 동물",
  ]

  const navItemList = navItems.map((navItem) => (
    <li
      className="flex h-[35px] items-center justify-center rounded-xl border border-stroke"
      key={navItem}
    >
      {navItem}
    </li>
  ))
  return <>{navItemList}</>
}

export default MyPageNavList
