/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import StateBadge from "components/common/StateBadge"

const AnimalItem = ({data, onSelectAnimal, isShelter}) => {
  return (
    <div
      className="relative mx-auto my-4 h-[425px] w-72 overflow-hidden rounded-xl border border-stroke"
      onClick={onSelectAnimal}
    >
      <StateBadge state={data.processState} />

      {isShelter ? (
        <img
          src={data.popfile}
          alt="imag"
          className="object-contain  h-[200px] w-[300px] snap-center   overflow-hidden "
        />
      ) : (
        <img
          src={data.filename}
          alt="imag"
          className="object-contain  h-[200px] w-[300px] snap-center  overflow-hidden "
        />
      )}

      {isShelter ? (
        <div className="m-2  text-xl font-bold">{data.kindCd}</div>
      ) : (
        <div className="m-2  text-xl font-bold">{data.name}</div>
      )}
      <div className="mx-2 flex flex-row space-x-2 ">
        <div className=" flex flex-col space-y-2">
          {isShelter ? (
            <div className=" flex ">
              <div className="mr-3 w-[95px]">공고번호</div>
              <div className="w-full">{data.noticeNo}</div>
            </div>
          ) : (
            <div className=" flex ">
              <div className="mr-3 w-[95px]">품종</div>
              <div className="w-full">{data.kindCd}</div>
            </div>
          )}
          <div className=" flex ">
            <div className="mr-3 w-[95px]">성별</div>
            <div className="w-full">
              {data.sexCd === "F"
                ? "암컷"
                : data.sexCd === "M"
                  ? "수컷"
                  : "미상"}
            </div>
          </div>
          {isShelter ? (
            <>
              <div className=" flex ">
                <div className="mr-3 w-[95px]">발견장소</div>
                <div className="w-full">{data.happenPlace}</div>
              </div>
              <div className=" flex ">
                <div className="mr-3 w-[95px]">발견일</div>
                <div className="w-full">{data.happenDt}</div>
              </div>
            </>
          ) : (
            <>
              <div className=" flex ">
                <div className="mr-3 w-[95px]">나이</div>
                <div className="w-full">{data.age}</div>
              </div>
              <div className=" flex ">
                <div className="mr-3 w-[95px]">보호장소</div>
                <div className="w-full">{data.careAddr}</div>
              </div>
            </>
          )}

          <div className=" flex ">
            <div className="w-full">{data.specialMark}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AnimalItem
