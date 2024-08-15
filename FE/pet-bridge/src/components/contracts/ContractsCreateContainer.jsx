import {
  selectId,
  selectImage,
  selectNickname,
  selectPhone,
} from "features/user/users-slice"
import {useSelector} from "react-redux"
import ContractDetail from "components/contracts/ContractDetail"
import ContractPerson from "components/contracts/ContractPerson"
import {useEffect, useState} from "react"
import {postContract} from "api/contracts-api"
import {useNavigate} from "react-router-dom"
import SearchDropDown from "components/common/SearchDropDown"
import AnimalTag from "components/common/AnimalTag"
import {selectOpponentInfo} from "features/chat/chat-slice"
import {postPhoneCheck, postPhoneVerificationCode} from "api/users-api"
// import ContractBackground from "assets/image/contract-bg.webp"
import Swal from "sweetalert2"
import {Toast} from "utils/common-utils"

const ContractsCreateContainer = () => {
  const navigate = useNavigate()
  const userId = useSelector(selectId)
  const nickname = useSelector(selectNickname)
  const userImage = useSelector(selectImage)
  const phone = useSelector(selectPhone)
  const opponentInfo = useSelector(selectOpponentInfo)
  // 동물 선택 상태에 따른 동물 컴포넌트 표시 - 상태 관리
  const [selectedAnimal, setSelectedAnimalId] = useState(null)
  const [selectedAnimalName, setSelectedAnimalName] = useState(null)
  const [selectedContracteeId, setSelectedContracteeId] = useState(null)
  const [contracteeInfo, setContracteeInfo] = useState({
    image: "",
    id: "",
    nickname: "",
  })
  const [contractFormData, setContractFormData] = useState({
    contractorId: "contractorId",
    contracteeId: "contracteeId",
    animalId: "animalId",
    month: "",
    payment: "",
    content: "",
  })
  // 서명 (전화번호) 인증 코드 관련 state
  const [isPhoneCodeSent, setIsPhoneCodeSent] = useState(false)
  const [isPhoneCodeChecked, setIsPhoneCodeChecked] = useState(false)
  const [phoneCode, setPhoneCode] = useState("")

  // 초기 로드시
  useEffect(() => {
    setContractFormData((prevData) => ({
      ...prevData,
      contractorId: userId,
    }))
  }, [])

  // 데이터 변경시
  useEffect(() => {
    setContractFormData((prevData) => ({
      ...prevData,
      animalId: selectedAnimal,
      contracteeId: Number(selectedContracteeId),
    }))
  }, [selectedAnimal, selectedContracteeId])

  // 상대 정보 상태 변경시
  useEffect(() => {
    const changeContracteeInfo = () => {
      setContracteeInfo({
        id: opponentInfo.id,
        image: opponentInfo.image,
        nickname: opponentInfo.nickname,
      })
    }

    changeContracteeInfo()
  }, [opponentInfo])

  // 제출 정보

  // 1 ~ 12개월 계약 기간 선택을 위한 숫자
  const monthsOption = Array.from({length: 12}, (_, index) => index + 1)

  // 동물 선택
  const handleAnimalSelect = (id) => {
    setSelectedAnimalId(id)
  }

  const handleAnimalNameSelect = (animalName) => {
    setSelectedAnimalName(animalName)
  }

  // 계약서 작성하기 클릭시 동작
  const onSubmitHandler = async () => {
    if (!isPhoneCodeChecked) {
      return
    }

    const result = await Swal.fire({
      title: "계약서를 작성하시겠습니까?",
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
    // 폼의 유효성 검사

    if (result.isConfirmed) {
      try {
        // 비동기 요청 (계약서 작성)
        const res = await postContract(contractFormData)
        console.log(res)
        Toast.fire({icon: "success", title: "계약서가 작성되었습니다."})
        navigate(`/users/${contractFormData.contractorId}/contracts`)
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "warning",
          title:
            "계약서 작성에 실패했습니다. 계약서 내용 확인 후 다시 시도해주세요.",
        })
      }
    }
  }

  // 입력값이 변경되면 행동할 Handler 정의
  const changeHandler = (event) => {
    const target = event.target
    const id = target.id

    // 입력 값과 FormData를 연동시킴
    setContractFormData({
      ...contractFormData,
      [id]: target.value,
    })
  }

  // 선택 드롭다운 값 변경시
  const onDataChangeHandler = (newData) => {
    setSelectedContracteeId(Number(newData))
  }

  // 서명하기 클릭시
  // 1. 서명 여부 확인창 클릭
  // 2. 서명 여부 확인시 문자 전송 + 인증코드 작성창 띄워줌
  // 3. 인증코드 입력 및 작성
  // 4. 인증코드 확인 완료시 제출 버튼 활성화
  const clickSignHandler = async () => {
    const result = await Swal.fire({
      title: "SMS 서명을 진행하시겠어요?",
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
    // 서명 버튼 클릭으로 SMS를 보낼지 확인
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
        Toast.fire({icon: "success", title: "SMS 인증 성공"})
        setIsPhoneCodeChecked(true)
      }
    } catch (error) {
      console.log(error)
      Toast.fire({icon: "fail", title: "인증 실패"})
    }
  }

  // State to manage tooltip visibility
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  // Handler to show tooltip on hover
  const handleMouseEnter = () => {
    if (!isPhoneCodeChecked) {
      setIsTooltipVisible(true)
    }
  }

  // Handler to hide tooltip when mouse leaves
  const handleMouseLeave = () => {
    setIsTooltipVisible(false)
  }

  return (
    <div
      className="my-5 flex w-[1000px] flex-col items-center space-y-10"
      onSubmit={onSubmitHandler}
    >
      <span className="my-5 text-4xl font-bold">입양 보내기</span>
      <section className="h-40 w-full">
        <div className="relative grid w-full grid-cols-4">
          {/* 입양 동물 정보란 */}
          <div className="col-span-2 rounded-l-xl p-2.5">
            <AnimalTag
              onSelectAnimalId={handleAnimalSelect}
              onSelectAnimalName={handleAnimalNameSelect}
            />
          </div>
          {/* 임보자 정보란 */}
          <ContractPerson
            imageSrc={userImage}
            title="보호자"
            nickname={nickname}
          />
          {/* 입양자 정보란 */}
          <SearchDropDown
            subtitle="입양자를 선택해주세요."
            placeholder="유저 닉네임으로 검색"
            itemName="유저"
            onDataChange={onDataChangeHandler}
          />
          <ContractPerson
            imageSrc={contracteeInfo.image}
            title="계약자"
            nickname={contracteeInfo.nickname}
          />
        </div>
      </section>

      {/* 계약서 작성 폼 */}
      <section className="flex w-full flex-col gap-4">
        <span className="my-3 text-4xl font-bold">계약서 정보</span>
        <div className="grid grid-cols-2">
          <div>
            <p className="font-bold">계약 이행 기간</p>
            <select
              name="month"
              id="month"
              className="relative h-12 w-40 appearance-none rounded-lg border-2 text-center font-bold"
              onChange={changeHandler}
            >
              <option value="" defaultValue="">
                선택 (1 ~ 12 개월)
              </option>
              {monthsOption.map((item) => (
                <option key={item} value={item}>
                  {item} 개월
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="font-bold">계약 금액 (원)</p>
            <input
              id="payment"
              type="number"
              placeholder="계약 금액"
              className="h-12 w-40 rounded-lg border-2 text-center font-bold"
              onChange={changeHandler}
            />
          </div>
        </div>
        <p className="font-bold">- 특약 사항</p>
        <textarea
          name="content"
          id="content"
          className="rounded-lg  border-2 p-2.5"
          placeholder="특약 내용"
          onChange={changeHandler}
        ></textarea>
      </section>
      {/* 계약서 미리보기란 */}
      <div
        className="flex w-full flex-col items-center bg-gray-100 p-5"
        style={{
          // backgroundImage: `url(${ContractBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.9,
        }}
      >
        <p className="my-16 text-4xl font-bold">계약서 미리보기</p>
        <ContractDetail
          contractorNickname={nickname}
          contracteeNickname={contracteeInfo.nickname}
          animalName={selectedAnimalName}
          month={contractFormData.month}
          payment={contractFormData.payment}
          content={contractFormData.content}
        />
      </div>
      {/* 서명란 */}
      <section className="h-60">
        <div className="flex h-40 w-full gap-10">
          {/* 보호자 서명 */}
          <div className="w-80">
            <ContractPerson
              imageSrc={userImage}
              title="보호자"
              nickname={nickname}
            />
            <div className="flex gap-4 py-2.5">
              <span className="my-3 font-bold">서명</span>
              {isPhoneCodeChecked ? (
                <button
                  disabled={true}
                  className={`rounded-2xl border bg-stroke p-2.5`}
                >
                  서명 완료
                </button>
              ) : isPhoneCodeSent ? (
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
                    className="grow rounded-2xl border px-2 hover:bg-mild"
                  >
                    확인
                  </button>
                </>
              ) : (
                <button
                  disabled={isPhoneCodeSent}
                  onClick={clickSignHandler}
                  className={`rounded-2xl border p-2.5 ${isPhoneCodeSent && "bg-stroke"}`}
                >
                  서명 하기
                </button>
              )}
            </div>
          </div>
          {/* 계약자 서명 */}
          <div className="w-80">
            <ContractPerson
              imageSrc={contracteeInfo.image}
              title="계약자"
              nickname={contracteeInfo.nickname}
            />
          </div>
        </div>
      </section>

      {/* 클릭시 form 제출 */}
      <div className="relative">
        <button
          type="button"
          onClick={onSubmitHandler}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={` ${isPhoneCodeChecked ? "bg-mild" : "bg-stroke"}  h-16 w-56 rounded-xl text-xl`}
        >
          계약서 작성하기
        </button>
        {isTooltipVisible && (
          <div className="absolute left-1/2 top-[-40px] -translate-x-1/2 rounded-md bg-black px-2 py-1 text-sm text-white">
            SMS 서명을 완료해주세요
          </div>
        )}
      </div>
      <div className="h-20"></div>
    </div>
  )
}

export default ContractsCreateContainer
