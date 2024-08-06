import React from "react"

const MainShelterCard = ({
  noticeNo,
  sexCd,
  popfile,
  kindCd,
  cardNm,
  careNm,
  careAddr,
}) => {
  return (
    <li className="h-[420px] w-[300px] shrink-0 rounded-2xl border shadow">
      <div className="flex h-[250px] w-full items-center justify-center overflow-hidden bg-white">
        <img src={popfile} alt={kindCd} className="size-full object-cover" />
      </div>
      <div className="p-2.5">
        <p>품종 : {kindCd}</p>
        <p>공고 번호 : {noticeNo}</p>
        <p>성별 : {sexCd}</p>
        <p>{cardNm}</p>
        <p>보호기관 : {careNm}</p>
        <p>보호기관 주소 : {careAddr}</p>
      </div>
    </li>
  )
}

export default MainShelterCard
