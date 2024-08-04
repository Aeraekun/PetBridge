import {useEffect, useState} from "react"
import ContractAnimal from "./ContractAnimal"
import ContractPerson from "./ContractPerson"
import {
  disalbeContract,
  getContractDetail,
  patchContract,
} from "api/contracts-api"
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
  const [contractInfo, setContractInfo] = useState(null)
  const {id} = useParams()
  const [isStampFilled, setIsStampFilled] = useState(null)

  // 페이지 초기 로드
  // 계약서 정보를 불러옴
  useEffect(() => {
    // 백엔드 서버에서 계약서 API 호출해서, 반환값을 상세 정보에 저장
    const initContractInfo = async () => {
      const fetchedContractInfo = await getContractDetail(id)
      if (fetchedContractInfo.data) {
        setContractInfo(fetchedContractInfo.data)
      }
    }

    initContractInfo()
  }, [id])

  useEffect(() => {
    if (contractInfo !== null) {
      setIsLoading(false)

      let stampFilled = 0
      for (let i = 1; i < 13; i++) {
        if (!contractInfo[`month${i}`]) {
          return
        }
        stampFilled++
      }

      if (Number(contractInfo.month) === stampFilled) {
        setIsStampFilled(true)
      }
    }
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

  // 계약서 삭제 버튼을 누르면
  const clickDeleteButtonHandler = () => {
    // 계약서 아이디로 삭제 요청을 보냄
    if (confirm("계약서를 삭제하시겠습니까?")) {
      disalbeContract(id)
    }
  }

  // 계약 체결 버튼을 누르면
  const clickPatchButtonHandler = () => {
    // 계약서 아이디로 삭제 요청을 보냄
    if (confirm("계약을 체결하시겠습니까?")) {
      patchContract(id)
    }
  }

  // 계약 종료 (환급) 버튼 클릭
  const clickFinishHandler = () => {
    if (confirm("환급을 신창하시겠습니까?")) {
      patchContract(id)
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

          {contractInfo.confirmed ? (
            <>
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
                <div className="flex h-20 items-center justify-center">
                  {Number(userId) == contractInfo.contractorId ? (
                    <button
                      className="rounded-2xl bg-mild p-2.5 text-2xl font-bold text-white"
                      onClick={onClickStampHandler}
                    >
                      이번 달 스탬프 찍기
                    </button>
                  ) : isStampFilled ? (
                    <button onClick={clickFinishHandler}>환급 신청하기</button>
                  ) : (
                    <div>스탬프를 받기 위해 계약 내용을 잘 이행해주세요.</div>
                  )}
                </div>
              </div>
            </>
          ) : Number(userId) !== contractInfo.contractorId ? (
            <button
              className="rounded-xl bg-mild p-2.5 text-white"
              onClick={clickPatchButtonHandler}
            >
              계약 체결하기
            </button>
          ) : (
            <button
              className="rounded-xl bg-alert p-2.5 text-white"
              onClick={clickDeleteButtonHandler}
            >
              계약서 삭제하기
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default ContractsContainer
