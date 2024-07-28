const AnimalItem = ({data}) => {
  return (
    <div className="w-72 h-[425px] mx-auto my-4 rounded-xl border border-stroke overflow-hidden">
      <img
        src={data.filename}
        alt="imag"
        className="object-cover contain w-[300px] h-[200px]"
      />
      <div className="text-xl  font-bold m-2">{data.kind_cd}</div>
      <div className="mx-2 flex flex-row space-x-2 ">
        <tr className=" flex flex-col space-y-2">
          <div className=" flex ">
            <div className="w-20 mr-3">공고번호</div>
            <div className="w-full">{data.notice_no}</div>
          </div>
          <div className=" flex ">
            <div className="w-20 mr-3">성별</div>
            <div className="w-full">{data.sex_cd}</div>
          </div>
          <div className=" flex ">
            <div className="w-20 mr-3">발견장소</div>
            <div className="w-full">{data.care_addr}</div>
          </div>
          <div className=" flex ">
            <div className="w-20 mr-3">특징</div>
            <div className="w-full">{data.notice_comment}</div>
          </div>
        </tr>
      </div>
    </div>
  )
}
export default AnimalItem
