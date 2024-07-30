const AnimalItem = ({data}) => {
  return (
    <div className="border-stroke mx-auto my-4 h-[425px] w-72 overflow-hidden rounded-xl border">
      <img
        src={data.filename}
        alt="imag"
        className="contain h-[200px] w-[300px] object-cover"
      />
      <div className="m-2  text-xl font-bold">{data.kind_cd}</div>
      <div className="mx-2 flex flex-row space-x-2 ">
        <tr className=" flex flex-col space-y-2">
          <div className=" flex ">
            <div className="mr-3 w-20">공고번호</div>
            <div className="w-full">{data.notice_no}</div>
          </div>
          <div className=" flex ">
            <div className="mr-3 w-20">성별</div>
            <div className="w-full">{data.sex_cd}</div>
          </div>
          <div className=" flex ">
            <div className="mr-3 w-20">발견장소</div>
            <div className="w-full">{data.care_addr}</div>
          </div>
          <div className=" flex ">
            <div className="mr-3 w-20">특징</div>
            <div className="w-full">{data.notice_comment}</div>
          </div>
        </tr>
      </div>
    </div>
  )
}
export default AnimalItem
