const ContractDetail = ({
  contractorNickname,
  contracteeNickname,
  animalName,
  month,
  payment,
  content,
}) => {
  return (
    <div className="flex flex-col space-y-5 text-xl">
      <p className="bg-none px-2">
        <span>보호자 </span>
        <span className="px-2 font-bold">{contractorNickname}</span>
        <span>님은 </span>
        <span>입양자 </span>
        <span className="px-2 font-bold">{contracteeNickname}</span>
        <span>님과 입양 동물 </span>
        <span className="px-2 font-bold">{animalName}</span>
        <span>에 대한 입양 계약을 다음과 같이 체결합니다.</span>
      </p>
      <p className="bg-none px-2">
        <span className="px-2 font-bold">{month}</span>
        <span>개월동안 매월 펫픽 혹은 커뮤니티에 후기를 작성할 것.</span>
      </p>
      {content && (
        <>
          <p className="bg-none px-2 ">
            <span>특약 사항</span>
          </p>
          <div className="rounded-xl bg-none p-2">
            <span className="px-2 font-bold">{content}</span>
          </div>
          <p className="bg-none px-2">
            <span>를 성실히 이행할 것.</span>
          </p>
        </>
      )}
      <p className="bg-none px-2">
        <span>
          위 사항을 성실히 이행했을 시, 보호자의 확인에 따라 계약 체결시
          견우와직묘에 저장된 책임비
        </span>
        <span className="px-2 font-bold">{payment}</span>
        <span>원을 반환합니다.</span>
      </p>
    </div>
  )
}

export default ContractDetail
