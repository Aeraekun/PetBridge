import {selectId, selectImage, selectNickname} from "features/user/users-slice"
import {useSelector} from "react-redux"
import ContractDetail from "components/contracts/ContractDetail"
import ContractAnimal from "components/contracts/ContractAnimal"
import ContractPerson from "components/contracts/ContractPerson"
import {useState} from "react"
import {postContract} from "api/contracts-api"
import {useNavigate} from "react-router-dom"
import SearchDropDown from "components/common/SearchDropDown"
import AnimalTag from "components/common/AnimalTag"
const ContractsCreateContainer = () => {
  const navigate = useNavigate()
  const nickname = useSelector(selectNickname)
  const userImage = useSelector(selectImage)
  // 동물 선택 상태에 따른 동물 컴포넌트 표시 - 상태 관리
  const [selectedAnimal, setSelectedAnimalId] = useState("")
  selectId
  const [isContracteeSelected] = useState(false)
  const [contractFormData, setContractFormData] = useState({
    contractorId: "contractorId",
    contracteeId: "contracteeId",
    animalId: "animalId",
    month: "month",
    payment: "payment",
    content: "content",
  })
  setContractFormData
  // 제출 정보

  // 1 ~ 12개월 계약 기간 선택을 위한 숫자
  const monthsOption = Array.from({length: 12}, (_, index) => index + 1)

  // 동물 선택
  const handleAnimalSelect = (id) => {
    setSelectedAnimalId(id)
  }
  // 입양 보낼 동물 선택 양식 정해야함
  // const onChangeIsSelectedContracteeHandler = (event) => {
  //   // 현재 select값이 선택하고 있는 option값
  //   const selectedContracteeId = event.target.value
  //   console.log(selectedContracteeId)
  //   setIsContracteeSelected()
  // }

  // 계약서 작성하기 클릭시 동작
  const onSubmitContractForm = async (event) => {
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

  // 날짜 선택시
  const onSelectMonthHandler = (event) => {
    console.log(event.target.value)
  }

  return (
    <form
      className="my-10 flex w-[1000px] flex-col items-center space-y-10"
      onSubmit={onSubmitContractForm}
    >
      <span className="text-4xl font-bold">입양 보내기</span>
      <section className="w-full">
        <div className="grid w-full grid-cols-4">
          {/* 입양 동물 정보란 */}
          {selectedAnimal ? (
            <div className="col-span-2 rounded-l-xl border p-2.5">
              <AnimalTag onSelectAnimalId={handleAnimalSelect} />
              <ContractAnimal
                isCreate={true}
                imageSrc="imgScr"
                name="name"
                kind="kind"
                age="3살"
              />
            </div>
          ) : (
            <div className="col-span-2 rounded-l-xl border p-2.5">
              아직 보호중인 동물을 선택하지 않았어요. 입양갈 동물을 선택해주세요
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
            <ContractPerson
              imageSrc="입양자 이미지"
              title="입양자"
              nickname="입양자 닉네임"
            />
          ) : (
            <div className="col-span-1 rounded-r-xl border p-2.5">
              아직 동물이 입양갈 곳을 찾지 못했어요. 입양자를 선택해주세요
              <div>
                <SearchDropDown
                  subtitle="유저를 선택해주세요."
                  placeholder="유저 닉네임으로 검색"
                  itemName="유저"
                />
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="w-full">
        <span className="text-4xl font-bold">계약서 작성 폼</span>
        <p className="font-bold">
          - 입양자가 계약을 이행할 시간을 선택해주세요.
        </p>
        <select
          name="monthSelect"
          id="monthSelect"
          className="rounded-lg border-2"
          onChange={onSelectMonthHandler}
        >
          {monthsOption.map((item) => (
            <option key={item} value={item}>
              <span>{item} 개월</span>
            </option>
          ))}
        </select>
        <p className="font-bold">- 계약 금액을 선택해주세요. (1 ~ 12 개월)</p>
        <input
          type="number"
          placeholder="계약 금액"
          className="rounded-lg border-2"
        />
        <p className="font-bold">
          - 추가적으로 이행할 특약 내용을 자유롭게 입력해주세요.
        </p>
        <textarea
          name="content"
          id="content"
          className="border-2"
          placeholder="특약 내용"
        ></textarea>
      </section>

      <div className="flex h-[600px] w-full flex-col items-center rounded-2xl bg-stroke p-5">
        <p className="my-10 text-4xl font-bold">계약서 미리보기</p>
        <ContractDetail
          contractorNickname="(보호자 닉네임)"
          contracteeNickname="(계약자 닉네임)"
          animalName="(동물 닉네임)"
          month="(선택 개월수)"
          payment="(계약 금액)"
          content="(특약 내용)"
        />
      </div>

      {/* 클릭시 form 제출 */}
      <button type="submit " className="h-10 w-40 rounded-xl border-2 bg-mild">
        계약서 작성하기
      </button>
    </form>
  )
}

export default ContractsCreateContainer
