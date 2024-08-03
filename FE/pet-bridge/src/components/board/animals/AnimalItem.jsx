/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

const AnimalItem = ({data, onSelectAnimal}) => {
  return (
    <div
      className="border-stroke mx-auto my-4 h-[425px] w-72 overflow-hidden rounded-xl border"
      onClick={onSelectAnimal}
    >
      <img
        src={data.popfile}
        alt="imag"
        className="contain h-[200px] w-[300px] overflow-hidden  snap-center "
      />
      <div className="m-2  text-xl font-bold">{data.kindCd}</div>
      <div className="mx-2 flex flex-row space-x-2 ">
        <div className=" flex flex-col space-y-2">
          <div className=" flex ">
            <div className="mr-3 w-20">공고번호</div>
            <div className="w-full">{data.noticeNo}</div>
          </div>
          <div className=" flex ">
            <div className="mr-3 w-20">성별</div>
            <div className="w-full">
              {data.sexCd === "F"
                ? "암컷"
                : data.sexCd === "M"
                  ? "수컷"
                  : "미상"}
            </div>
          </div>
          <div className=" flex ">
            <div className="mr-3 w-20">발견장소</div>
            <div className="w-full">{data.happenPlace}</div>
          </div>
          <div className=" flex ">
            <div className="mr-3 w-20">발견일</div>
            <div className="w-full">{data.happenDt}</div>
          </div>
          <div className=" flex ">
            <div className="mr-3 w-20">특징</div>
            <div className="w-full">{data.specialMark}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AnimalItem
