/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import StateBadge from "components/common/StateBadge"

const AnimalItem = ({data, onSelectAnimal, isShelter}) => {
  return (
    <div
      className=" group mx-auto my-4 h-[425px] w-72 overflow-hidden rounded-xl border border-stroke group-hover:shadow-lg "
      onClick={onSelectAnimal}
    >
      <div className="relative group-hover:shadow-lg">
        {isShelter ? (
          <img
            src={data.popfile}
            alt="imag"
            className="size-[300px]  snap-center overflow-hidden object-cover "
          />
        ) : (
          <img
            src={data.filename}
            alt="imag"
            className="size-[300px]  snap-center overflow-hidden object-cover "
          />
        )}
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:translate-y-[-50%]">
          <div className="absolute top-[280px] w-full bg-white bg-opacity-100 p-1 pl-2 opacity-100 transition-opacity duration-700 ease-in-out group-hover:opacity-100">
            <StateBadge state={data.processState} />
            {isShelter ? (
              <div className="m-2  text-xl font-bold">{data.kindCd}</div>
            ) : (
              <div className="m-2  text-xl font-bold">{data.name}</div>
            )}
            <div className="mx-2 flex flex-row space-x-2 ">
              <div className=" flex flex-col space-y-2">
                {isShelter ? (
                  <div className=" grid grid-cols-4 gap-2 ">
                    <div className="col-span-1 ">공고번호</div>
                    <div className="col-span-3 border-l pl-2">
                      {data.noticeNo}
                    </div>
                  </div>
                ) : (
                  <div className=" grid grid-cols-4 gap-2">
                    <div className="col-span-1 ">품종</div>
                    <div className="col-span-3 border-l pl-2">
                      {data.kindCd}
                    </div>
                  </div>
                )}
                <div className=" grid grid-cols-4 gap-2 ">
                  <div className="col-span-1 ">성별</div>
                  <div className="col-span-3 border-l pl-2">
                    {data.sexCd === "F"
                      ? "암컷"
                      : data.sexCd === "M"
                        ? "수컷"
                        : "미상"}
                  </div>
                </div>
                {isShelter ? (
                  <>
                    <div className=" grid grid-cols-4 gap-2 ">
                      <div className="col-span-1 ">발견장소</div>
                      <div className="col-span-3 border-l pl-2">
                        {data.happenPlace}
                      </div>
                    </div>
                    <div className=" grid grid-cols-4 gap-2 ">
                      <div className="col-span-1 ">발견일</div>
                      <div className="col-span-3 border-l pl-2">
                        {data.happenDt}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className=" grid grid-cols-4 gap-2 ">
                      <div className="col-span-1 ">보호장소 </div>
                      <div className="col-span-3 border-l pl-2">
                        {data.careAddr}
                      </div>
                    </div>
                    <div className=" grid grid-cols-4 gap-2 ">
                      <div className="col-span-1 ">나이</div>
                      <div className="col-span-3 border-l pl-2">
                        {data.age} 년생
                      </div>
                    </div>
                  </>
                )}

                <div className=" flex size-full flex-col gap-1">
                  <div className="w-fit border-b">특징</div>
                  <div className="size-full border p-3">{data.specialMark}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AnimalItem
