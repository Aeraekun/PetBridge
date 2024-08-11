import React from "react"

const MainShelterCard = ({
  noticeNo,
  sexCd,
  popfile,
  kindCd,
  cardNm,
  careNm,
}) => {
  return (
    <li className="h-[420px] w-[300px] shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
      <div className="flex h-[250px] w-full items-center justify-center overflow-hidden bg-gray-100">
        <img src={popfile} alt={kindCd} className="size-full object-cover" />
      </div>
      <div className="space-y-2 p-4">
        <p className="text-base text-gray-700">
          <strong>품종:</strong> {kindCd}
        </p>
        <p className="text-base text-gray-700">
          <strong>공고 번호:</strong> {noticeNo}
        </p>
        <p className="text-base text-gray-700">
          <strong>성별:</strong> {sexCd}
        </p>
        <p className="text-base font-semibold text-gray-900">{cardNm}</p>
        <p className="text-base text-gray-700">
          <strong>보호기관:</strong> {careNm}
        </p>
      </div>
    </li>
  )
}

export default MainShelterCard
