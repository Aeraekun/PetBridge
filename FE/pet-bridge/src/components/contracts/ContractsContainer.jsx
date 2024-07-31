const ContractsContainer = () => {
  // 정보 초기화

  // 계약서 정보를 불러옴
  // 입양 동물 id로 입양 동물 정보 불러옴
  // 임보자 id로 임보자 정보 불러옴
  // 입양자 id로 입양자 정보 불러옴
  return (
    <div className="my-10 flex w-[1000px] flex-col space-y-10">
      <span className="text-4xl font-bold">계약서</span>
      <div className="grid h-32 w-full grid-cols-4">
        {/* 입양 동물 정보란 */}
        <div className="col-span-2 border p-2.5">
          <p className="text-xl font-bold">입양 동물</p>
          <div className="flex">
            <img src="" alt="" className="size-[80px]" />
            <span>사진, 이름, 품종, 나이 , 상태</span>
          </div>
        </div>
        {/* 임보자 정보란 */}
        <div className="col-span-1 border p-2.5">
          <p className="text-xl font-bold">임보자</p>
          <div className="flex">
            <img src="" alt="" className="size-[40px] rounded-full border" />
            <span>입양 보내는 사람: 사진, 닉네임</span>
          </div>
        </div>
        {/* 입양자 정보란 */}
        <div className="col-span-1 border p-2.5">
          <p className="text-xl font-bold">입양자</p>
          <div className="flex">
            <img src="" alt="" className="size-[40px] rounded-full border" />
            <span>입양 받는 사람: 사진, 닉네임</span>
          </div>
        </div>
      </div>
      <div className="bg-stroke flex h-[600px] w-full justify-center p-5">
        <p className="text-4xl font-bold">계약서</p>
      </div>
      <div>계약서 이행 여부</div>
    </div>
  )
}

export default ContractsContainer
