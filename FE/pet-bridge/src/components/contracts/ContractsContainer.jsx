import {useEffect, useState} from "react"
import ContractAnimal from "./ContractAnimal"
import ContractPerson from "./ContractPerson"
import {getContractDetail} from "api/contracts-api"
import {useParams} from "react-router-dom"
import ContractDetail from "./ContractDetail"
import ContractStamp from "./ContractStamp"
import {patchThisMonthStamp} from "utils/contract-utils"
import {useSelector} from "react-redux"
import {selectId} from "features/user/users-slice"

const ContractsContainer = () => {
  // 정보 초기화
  const userId = useSelector(selectId)
  const [isLoading, setIsLoading] = useState(true)
  const [contractInfo, setContractInfo] = useState({})
  const {id} = useParams()

  // 페이지 초기 로드
  // 계약서 정보를 불러옴
  useEffect(() => {
    // 백엔드 서버에서 계약서 API 호출해서, 반환값을 상세 정보에 저장
    const initContractInfo = async () => {
      const contractInfo = await getContractDetail(id)
      console.log(contractInfo)
      setContractInfo(contractInfo.data)
    }

    initContractInfo()
    console.log(contractInfo)
  }, [])

  useEffect(() => {
    setIsLoading(false)
  }, [contractInfo])

  // 스탬프  찍기를 누르면
  const onClickStampHandler = async () => {
    const stampInfo = {
      contractId: contractInfo.id,
      month: contractInfo.month,
    }

    if (stampInfo) {
      const res = await patchThisMonthStamp(stampInfo)

      if (res.response.status === 200) {
        alert("스탬프 찍기를 성공했어요.")
      } else if (res.response.status == 409) {
        alert(
          "이번 달에 이미 스탬프를 찍었어요. 다음 달에 입양 후기를 확인하구 또 찍어주세요."
        )
      }
    }
  }

  return (
    <div className="my-10 flex w-[1000px] flex-col items-center space-y-10">
      <span className="text-4xl font-bold">입양 계약서</span>
      {isLoading ? (
        <div>로딩중입니다.</div>
      ) : (
        <>
          <div className="grid h-32 w-full grid-cols-4">
            {/* 입양 동물 정보란 */}
            <ContractAnimal
              imageSrc={contractInfo.animalImage}
              name={contractInfo.animalName}
              kind={contractInfo.animalKind}
              age="3살"
            />
            {/* 임보자 정보란 */}
            <ContractPerson
              imageSrc={contractInfo.contractorImage}
              title="보호자"
              nickname={contractInfo.contractorNickname}
            />
            {/* 입양자 정보란 */}
            <ContractPerson
              imageSrc={contractInfo.contracteeImage}
              title="입양자"
              nickname={contractInfo.contracteeNickname}
            />
          </div>
          <div className="flex h-[600px] w-full flex-col items-center rounded-2xl bg-stroke p-5">
            <p className="my-10 text-4xl font-bold">계약서</p>
            <ContractDetail
              contractorNickname={contractInfo.contractorNickname}
              contracteeNickname={contractInfo.contracteeNickname}
              animalName={contractInfo.animalName}
              month={contractInfo.month}
              payment={contractInfo.payment}
              content={contractInfo.content}
            />
          </div>
          <span className="text-4xl font-bold">입양 스탬프북</span>
          <div className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-mild p-5">
            <div className="flex h-full flex-wrap justify-center">
              {Array.from({length: contractInfo.month}).map((_, index) => (
                <ContractStamp
                  key={index}
                  idx={index + 1}
                  text={contractInfo[`month${index + 1}`]}
                />
              ))}
            </div>
            {Number(userId) === contractInfo.contractorId ? (
              <button
                className="rounded-2xl bg-mild p-2.5 text-2xl font-bold text-white"
                onClick={onClickStampHandler}
              >
                이번 달 스탬프 찍기
              </button>
            ) : (
              <div>스탬프를 받기 위해 계약 내용을 잘 이행해주세요.</div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default ContractsContainer
