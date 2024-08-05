import {
  selectId,
  selectImage,
  selectNickname,
  selectPhone,
} from "features/user/users-slice"
import {useSelector} from "react-redux"
import ContractDetail from "components/contracts/ContractDetail"
// import ContractAnimal from "components/contracts/ContractAnimal"
import ContractPerson from "components/contracts/ContractPerson"
import {useEffect, useState} from "react"
import {postContract} from "api/contracts-api"
import {useNavigate} from "react-router-dom"
import SearchDropDown from "components/common/SearchDropDown"
import AnimalTag from "components/common/AnimalTag"
import {selectOpponentInfo} from "features/chat/chat-slice"
import {postPhoneCheck, postPhoneVerificationCode} from "api/users-api"
const ContractsCreateContainer = () => {
  const navigate = useNavigate()
  const userId = useSelector(selectId)
  const nickname = useSelector(selectNickname)
  const userImage = useSelector(selectImage)
  const phone = useSelector(selectPhone)
  const opponentInfo = useSelector(selectOpponentInfo)
  // 동물 선택 상태에 따른 동물 컴포넌트 표시 - 상태 관리
  const [selectedAnimal, setSelectedAnimalId] = useState(null)
  const [selectedContracteeId, setSelectedContracteeId] = useState(null)
  const [isContracteeSelected, setIsContracteeSelected] = useState(false)
  const [contracteeInfo, setContracteeInfo] = useState({
    image: "",
    id: "",
    nickname: "",
  })
  const [contractFormData, setContractFormData] = useState({
    contractorId: "contractorId",
    contracteeId: "contracteeId",
    animalId: "animalId",
    month: "month",
    payment: "payment",
    content: "content",
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

  // 계약서 작성하기 클릭시 동작
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    console.log(contractFormData)
    // 폼의 유효성 검사
    try {
      // 비동기 요청 (계약서 작성)
      const res = await postContract(contractFormData)
      console.log(res)
      if (res.data) {
        // 비동기 요청 결과로, 성공시 마이페이지 계약서 목록으로 라우팅
        navigate(`/users/${contractFormData.contractorId}`)
      }
    } catch (error) {
      console.log(error)
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
    if (newData) {
      setIsContracteeSelected(true)
    }
  }

  // 서명하기 클릭시
  // 1. 서명 여부 확인창 클릭
  // 2. 서명 여부 확인시 문자 전송 + 인증코드 작성창 띄워줌
  // 3. 인증코드 입력 및 작성
  // 4. 인증코드 확인 완료시 제출 버튼 활성화
  const clickSignHandler = async () => {
    // 서명 버튼 클릭으로 SMS를 보낼지 확인
    if (confirm("SMS 서명하시겠습니까? ")) {
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
      }
    } catch (error) {
      console.log(error)
      alert("인증 실패")
    }
  }

  return (
    <div
      className="my-5 flex w-[1000px] flex-col items-center space-y-10"
      onSubmit={onSubmitHandler}
    >
      <span className="my-20 text-4xl font-bold">입양 보내기</span>
      <section className="h-40 w-full">
        <div className="grid w-full grid-cols-4">
          {/* 입양 동물 정보란 */}
          {selectedAnimal ? (
            <div className="col-span-2 rounded-l-xl border p-2.5">
              <AnimalTag onSelectAnimalId={handleAnimalSelect} />
              {/* <ContractAnimal
                isCreate={true}
                imageSrc="imgScr"
                name="name"
                kind="kind"
                age="3살"
              /> */}
            </div>
          ) : (
            <div className="col-span-2 rounded-l-xl border p-2.5">
              <div>
                <AnimalTag onSelectAnimalId={handleAnimalSelect} />
              </div>
            </div>
          )}

          {/* 임보자 정보란 */}
          <ContractPerson
            imageSrc={userImage}
            title="보호자"
            nickname={nickname}
          />
          {/* 입양자 정보란 */}
          {isContracteeSelected ? (
            <>
              <ContractPerson
                imageSrc={contracteeInfo.image}
                title="계약자"
                nickname={contracteeInfo.nickname}
              />
            </>
          ) : (
            <div className="col-span-1 flex flex-col justify-between border p-2.5">
              <div>
                <SearchDropDown
                  subtitle="입양자를 선택해주세요."
                  placeholder="유저 닉네임으로 검색"
                  itemName="유저"
                  onDataChange={onDataChangeHandler}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 계약서 작성 폼 */}
      <section className="flex w-full flex-col gap-4">
        <span className="text-4xl font-bold">계약서 작성 폼</span>
        <p className="font-bold">- 계약 이행 기간 (1 ~ 12 개월)</p>
        <select
          name="month"
          id="month"
          className="h-12 w-40 rounded-lg border-2 text-center font-bold"
          onChange={changeHandler}
        >
          {monthsOption.map((item) => (
            <option key={item} value={item} selected={item === 12}>
              {item} 개월
            </option>
          ))}
        </select>
        <p className="font-bold">- 계약 금액</p>
        <input
          id="payment"
          type="number"
          placeholder="계약 금액"
          className="h-12 w-40 rounded-lg border-2 text-center font-bold"
          onChange={changeHandler}
        />
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
      <div className="flex h-[600px] w-full flex-col items-center rounded-2xl bg-stroke p-5">
        <p className="my-10 text-4xl font-bold">계약서 미리보기</p>
        <ContractDetail
          contractorNickname={nickname}
          contracteeNickname={contracteeInfo.nickname}
          animalName={contractFormData.animalName}
          month={contractFormData.month}
          payment={contractFormData.payment}
          content={contractFormData.content}
        />
      </div>
      {/* 서명란 */}
      <section className="">
        <p className="my-4 text-center font-bold">- 서명</p>
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
              {isPhoneCodeSent ? (
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
            <div className="flex gap-4 p-2.5">
              <p className="my-3 font-bold">서명</p>
              <button className={`rounded-2xl border p-2.5 ${isPhoneCodeSent}`}>
                {isPhoneCodeChecked ? "서명 완료" : "서명 하기"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 클릭시 form 제출 */}
      <button
        disabled={!isPhoneCodeChecked}
        type="button"
        onClick={onSubmitHandler}
        className="h-10 w-40 rounded-xl border-2 bg-mild"
      >
        계약서 작성하기
      </button>
    </div>
  )
}

export default ContractsCreateContainer
