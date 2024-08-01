import {selectId, selectImage, selectNickname} from "features/user/users-slice"
import {useSelector} from "react-redux"

const {default: ContractAnimal} = require("./ContractAnimal")
const {default: ContractPerson} = require("./ContractPerson")

const ContractsCreateContainer = () => {
  const nickname = useSelector(selectNickname)
  const userImage = useSelector(selectImage)
  ContractAnimal
  ContractPerson
  useSelector
  selectId
  selectNickname
  selectImage
  return (
    <div className="my-10 flex w-[1000px] flex-col items-center space-y-10">
      <span className="text-4xl font-bold">입양 보내기</span>
      <div className="grid h-32 w-full grid-cols-4">
        {/* 입양 동물 정보란 */}
        <ContractAnimal
          isCreate={true}
          imageSrc="imgScr"
          name="name"
          kind="kind"
          age="3살"
        />
        {/* 임보자 정보란 */}
        <ContractPerson
          imageSrc={userImage}
          title="보호자"
          nickname={nickname}
        />
        {/* 입양자 정보란 */}
        <ContractPerson
          imageSrc="입양자 이미지"
          title="입양자"
          nickname="입양자 닉네임"
        />
      </div>
    </div>
  )
}

export default ContractsCreateContainer
