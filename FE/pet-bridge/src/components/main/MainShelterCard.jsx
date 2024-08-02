const MainShelterCard = ({noticeNo, sexCd, popfile, kindCd, cardNm}) => {
  return (
    <li className="h-[400px] w-[300px] rounded-2xl border shadow">
      <div className="flex h-[250px] w-full items-center justify-center overflow-y-hidden bg-white">
        <img
          src={popfile}
          alt={kindCd}
          className="h-auto w-full object-cover"
        />
      </div>
      <div className="p-2.5">
        <p>{kindCd}</p>
        <p>{noticeNo}</p>
        <p>{sexCd}</p>
        <p>{cardNm}</p>
      </div>
    </li>
  )
}

export default MainShelterCard
