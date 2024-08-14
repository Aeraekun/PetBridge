import {stateBgColors, stateColors} from "./StateColorList"

const StateBadge = ({state, category}) => {
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
  const color = stateColors[state] || "outline-mild"
  const bgcolor = stateBgColors[state] || "bg-mild"
  const displayName = stateNames[state] || state
  return (
    <>
      {category === "article" ? (
        // <div
        //   className={`absolute right-2 top-2  bg-white p-2  rounded-2xl outline outline-4 ${color}`}
        // >
        //   {displayName}
        // </div>
        <div
          className={`absolute right-0 top-0  w-full outline outline-2 ${color}`}
        >
          <div className="absolute right-0 h-[10px] w-full"></div>
          <div
            className={`absolute  bottom-0 z-40 flex h-8 items-center justify-center rounded-tr p-3 font-bold ${bgcolor} border-r`}
          >
            {displayName}
          </div>
        </div>
      ) : (
        <div
          className={`absolute right-1 top-0  w-full bg-white outline outline-4 ${color}`}
        >
          <div className="absolute right-0 h-[10px] w-full"></div>
          <div
            className={`absolute right-2 top-[-15px] z-40 flex h-8 items-center justify-center rounded-2xl bg-white p-2 font-bold outline outline-4 ${color}`}
          >
            {displayName}
          </div>
        </div>
      )}
    </>
  )
}

export default StateBadge
