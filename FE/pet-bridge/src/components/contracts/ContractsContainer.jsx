import {useEffect, useState} from "react"
import ContractAnimal from "./ContractAnimal"
import ContractPerson from "./ContractPerson"
import {
  disalbeContract,
  getContractDetail,
  patchContract,
  postPayment,
} from "api/contracts-api"
import {useNavigate, useParams} from "react-router-dom"
import ContractDetail from "./ContractDetail"
import ContractStamp from "./ContractStamp"
import {patchThisMonthStamp} from "utils/contract-utils"
import {useSelector} from "react-redux"
import {selectId, selectPhone} from "features/user/users-slice"
import {postPhoneCheck, postPhoneVerificationCode} from "api/users-api"
// import ContractBackground from "assets/image/contract-bg.webp"
import Swal from "sweetalert2"
import {Toast} from "utils/common-utils"

const ContractsContainer = () => {
  const navigate = useNavigate()
  // 정보 초기화
  const userId = useSelector(selectId)
  const phone = useSelector(selectPhone)
  const [isLoading, setIsLoading] = useState(true)
  const [contractInfo, setContractInfo] = useState(null)
  const {id} = useParams()
  const [isStampFilled, setIsStampFilled] = useState(null)

  // 서명(전화번호) 인증 관련 state
  const [isPhoneCodeSent, setIsPhoneCodeSent] = useState(false)
  const [isPhoneCodeChecked, setIsPhoneCodeChecked] = useState(false)
  const [phoneCode, setPhoneCode] = useState("")

  // 결제 인증 관련 state
  // const [isPaymentChecked, setIsPaymentChecked] = useState(false)

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
        if (contractInfo[`month${i}`]) {
          stampFilled++
        }
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
        Toast.fire({icon: "success", title: "스탬프 찍기를 성공했어요."})
      } else if (res.response.status == 409) {
        Toast.fire({
          icon: "warning",
          title:
            "이번 달에 이미 스탬프를 찍었어요. 다음 달에 입양 후기를 확인하고 또 찍어주세요.",
        })
      }
    }
  }

  // 계약서 삭제 버튼을 누르면
  const clickDeleteButtonHandler = async () => {
    const result = await Swal.fire({
      title: "계약서를 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#a4a2a1",
      customClass: {
        confirmButton: "w-20 py-2 text-white font-semibold rounded-md",
        cancelButton: "w-20 py-2 text-white font-semibold rounded-md",
      },
    })
    // 계약서 아이디로 삭제 요청을 보냄
    if (result.isConfirmed) {
      try {
        disalbeContract(id)
        Toast.fire({icon: "success", title: "계약서가 삭제되었습니다."})
        navigate(`/users/${userId}`)
      } catch (error) {
        console.log("계약서 삭제 에러: ", error)
      }
    }
  }

  // 계약 종료 (환급) 버튼 클릭
  const clickFinishHandler = async () => {
    const result = await Swal.fire({
      title: "환급 요청을 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      confirmButtonColor: "#fe85ac",
      cancelButtonText: "아니요",
      cancelButtonColor: "#a4a2a1",
      customClass: {
        confirmButton: "w-20 py-2 text-white font-semibold rounded-md",
        cancelButton: "w-20 py-2 text-white font-semibold rounded-md",
      },
    })
    if (result.isConfirmed) {
      try {
        const contractEditRequestDto = {
          id: id,
          status: "환급대기",
        }
        console.log(contractEditRequestDto)
        const res = await patchContract(contractEditRequestDto)
        Toast.fire({
          icon: "success",
          title:
            "환급 신청을 완료했어요. 관리자가 환급 요청을 처리할 때까지 기다려주세요.",
        })
        console.log(res)
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "warning",
          title: "환급 신청을 실패했어요. 다시 시도해주세요.",
        })
      }
    }
  }

  // 서명하기 클릭시
  // 1. 서명 여부 확인창 클릭
  // 2. 서명 여부 확인시 문자 전송 + 인증코드 작성창 띄워줌
  // 3. 인증코드 입력 및 작성
  // 4. 인증코드 확인 완료시 제출 버튼 활성화
  const clickSignHandler = async () => {
    // 서명 버튼 클릭으로 SMS를 보낼지 확인
    const result = await Swal.fire({
      title: "SMS 서명하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      confirmButtonColor: "#fe85ac",
      cancelButtonText: "아니요",
      cancelButtonColor: "#a4a2a1",
      customClass: {
        confirmButton: "w-20 py-2 text-white font-semibold rounded-md",
        cancelButton: "w-20 py-2 text-white font-semibold rounded-md",
      },
    })
    if (result.isConfirmed) {
      const isSent = await postPhoneVerificationCode({phone: phone})
      console.log(isSent)
      if (isSent) {
        setIsPhoneCodeSent(true)
      }
      console.log("서명 클릭")
    }
  }

  const changeCodeHandler = (event) => {
    const code = event.target.value
    setPhoneCode(code)
  }

  const clickPhoneCodeCheckHandler = async () => {
    const phoneConfirmData = {
      phone: phone,
      code: Number(phoneCode),
    }
    try {
      const res = await postPhoneCheck(phoneConfirmData)
      if (res?.status === 200) {
        setIsPhoneCodeChecked(true)
        Toast.fire({icon: "success", title: "SMS 인증을 성공했어요."})
      }
    } catch (error) {
      console.log(error)
      Toast.fire({icon: "warning", title: "SMS 인증을 실패했어요."})
    }
  }

  const clickPaymentHandler = async () => {
    const result = await Swal.fire({
      title:
        "결제가 완료되면 계약이 자동으로 체결됩니다. 결제 화면으로 이동하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      confirmButtonColor: "#fe85ac",
      cancelButtonText: "아니요",
      cancelButtonColor: "#a4a2a1",
      customClass: {
        confirmButton: "w-20 py-2 text-white font-semibold rounded-md",
        cancelButton: "w-20 py-2 text-white font-semibold rounded-md",
      },
    })
    if (result.isConfirmed) {
      try {
        const res = await postPayment(
          Number(contractInfo.id),
          contractInfo.animalName,
          Number(contractInfo.payment)
        )
        console.log("clickPaymendHandler에서 res 출력", res)
        if (res.data?.next_redirect_pc_url) {
          window.location.href = res.data.next_redirect_pc_url
        }
        return res
      } catch (error) {
        console.log(error)
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
          <div className="h-6"></div>
          <div
            className="flex w-full flex-col items-center bg-gray-100 p-5 pb-10"
            style={{
              // backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${ContractBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p className="my-16 font-serif text-4xl font-extrabold">계 약 서</p>
            <ContractDetail
              contractorNickname={contractInfo.contractorNickname}
              contracteeNickname={contractInfo.contracteeNickname}
              animalName={contractInfo.animalName}
              month={contractInfo.month}
              payment={contractInfo.payment}
              content={contractInfo.content}
            />
          </div>

          {contractInfo.status === "계약완료" ? (
            <>
              <span className="text-4xl font-bold">입양 스탬프북</span>
              <div className="border-mild flex w-full flex-col items-center justify-center rounded-2xl border-2 p-5">
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
                      className="bg-mild rounded-2xl p-2.5 text-2xl font-bold text-white"
                      onClick={onClickStampHandler}
                    >
                      이번 달 스탬프 찍기
                    </button>
                  ) : isStampFilled ? (
                    <button
                      onClick={clickFinishHandler}
                      className="bg-mild rounded-xl p-2.5 font-bold"
                    >
                      환급 신청하기
                    </button>
                  ) : (
                    <div>스탬프를 받기 위해 계약 내용을 잘 이행해주세요.</div>
                  )}
                </div>
              </div>
            </>
          ) : contractInfo.status === "환급대기" ? (
            <div className="border-mild flex w-full flex-col items-center justify-center rounded-2xl border-2 p-5">
              <div className="flex h-full flex-wrap justify-center">
                {Array.from({length: contractInfo.month}).map((_, index) => (
                  <ContractStamp
                    key={index}
                    idx={index + 1}
                    text={contractInfo[`month${index + 1}`]}
                  />
                ))}
              </div>
              <div className="my-5 flex h-20 items-center justify-center">
                <button
                  disabled={true}
                  className="rounded-xl bg-green-100 p-2.5 text-xl font-bold"
                >
                  <p>환급 신청 완료!</p>
                  <p>환급 대기 중입니다.</p>
                </button>
              </div>
            </div>
          ) : Number(userId) !== contractInfo.contractorId ? (
            <>
              {/* 서명란 */}
              <section className="h-80">
                <p className="my-4 text-center font-bold">서명</p>
                <div className="flex h-40 w-full gap-10">
                  {/* 보호자 서명 */}
                  <div className="w-80">
                    <ContractPerson
                      imageSrc={contractInfo.contractorImage}
                      title="보호자"
                      nickname={contractInfo.contractorNickname}
                    />
                    <div className="flex gap-4 py-2.5">
                      <span className="my-3 font-bold">서명</span>

                      <button
                        disabled={true}
                        className={`bg-stroke rounded-2xl border p-2.5`}
                      >
                        서명 완료
                      </button>
                    </div>
                  </div>
                  {/* 계약자 서명 */}
                  <div className="w-80">
                    <ContractPerson
                      imageSrc={contractInfo.contracteeImage}
                      title="계약자"
                      nickname={contractInfo.contracteeNickname}
                    />
                    <div className="flex gap-4 p-2.5">
                      <p className="my-3 font-bold">서명</p>
                      {isPhoneCodeSent ? (
                        isPhoneCodeChecked ? (
                          <button
                            disabled={true}
                            className={`bg-stroke rounded-2xl border p-2.5`}
                          >
                            서명 완료
                          </button>
                        ) : (
                          <>
                            <input
                              type="number"
                              placeholder="인증코드"
                              className="w-40 rounded-2xl border px-2 text-center transition-all"
                              id="phoneCheck"
                              onChange={changeCodeHandler}
                            />
                            <button
                              onClick={clickPhoneCodeCheckHandler}
                              className="hover:bg-mild grow rounded-2xl border px-2"
                            >
                              확인
                            </button>
                          </>
                        )
                      ) : (
                        <button
                          disabled={isPhoneCodeSent}
                          className={`rounded-2xl border p-2.5 ${isPhoneCodeSent}`}
                          onClick={clickSignHandler}
                        >
                          서명 하기
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* 클릭시 결제 후 계약 체결하기 */}
              <button
                disabled={!isPhoneCodeChecked}
                className="bg-mild h-16 w-56 rounded-xl p-2.5 text-xl text-white"
                onClick={clickPaymentHandler}
              >
                계약 체결하기
              </button>
            </>
          ) : contractInfo.status === "계약전" ? (
            <>
              <section className="h-80">
                <p className="my-4 text-center text-xl font-bold">서명</p>
                <div className="flex h-40 w-full gap-10">
                  {/* 보호자 서명 */}
                  <div className="w-80">
                    <ContractPerson
                      imageSrc={contractInfo.contractorImage}
                      title="보호자"
                      nickname={contractInfo.contractorNickname}
                    />
                    <div className="flex gap-4 py-2.5">
                      <span className="my-3 font-bold">서명</span>

                      <button
                        disabled={true}
                        className={`bg-stroke rounded-2xl border p-2.5`}
                      >
                        서명 완료
                      </button>
                    </div>
                  </div>
                  {/* 계약자 서명 */}
                  <div className="w-80">
                    <ContractPerson
                      imageSrc={contractInfo.contracteeImage}
                      title="계약자"
                      nickname={contractInfo.contracteeNickname}
                    />
                    <div className="flex gap-4 p-2.5">
                      <p className="my-3 font-bold">서명</p>
                      <button
                        disabled={true}
                        className={`rounded-2xl border p-2.5`}
                      >
                        서명 대기중
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              <button
                className="bg-alert rounded-xl p-2.5 text-white"
                onClick={clickDeleteButtonHandler}
              >
                계약서 삭제하기
              </button>
            </>
          ) : (
            <div>계약전아님</div>
          )}
        </>
      )}
      <div className="h-20"></div>
    </div>
  )
}

export default ContractsContainer
