const StateBadge = ({state}) => {
  const stateColors = {
    입양중: "bg-cyan-100",
    입양대기: "bg-yellow-100",
    입양완료: "bg-green-100",
    임시보호: "bg-gray-100",
    // 보호소
    보호중: "bg-green-200",
    "종료(반환)": "bg-blue-100",
    "종료(입양)": "bg-purple-100",
    "종료(안락사)": "bg-black text-white",
    "종료(자연사)": "bg-yellow",
    "종료(기타)": "bg-gray-100",

    REVIEW: "bg-purple-100",
    NOTICE: "bg-blue-100",
    PROMOTION: "bg-pink-100",
    FREE: "bg-orange-100",
  }

  const stateNames = {
    입양중: "입양중",
    입양대기: "입양대기",
    입양완료: "입양완료",
    임시보호: "임시보호",
    REVIEW: "입양후기",
    NOTICE: "공지사항",
    PROMOTION: "입양홍보",
    FREE: "자유게시판",
  }
  const color = stateColors[state] || "bg-mild"
  const displayName = stateNames[state] || state
  return (
    <div
      className={`absolute right-2 top-2 flex h-8 items-center justify-center rounded  ${color}`}
    >
      {displayName}
    </div>
  )
}

export default StateBadge
