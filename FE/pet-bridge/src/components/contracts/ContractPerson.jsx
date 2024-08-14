import DefaultUser150 from "assets/icons/icon-default-user-150.svg"

const ContractPerson = ({title, nickname, imageSrc}) => {
  return (
    <div className="col-span-1 flex h-full flex-col justify-between p-2.5">
      <p className="text-xl font-bold">{title}</p>
      <div className="flex h-28 items-center space-x-5 rounded-2xl border border-green-300 bg-green-50 p-2">
        <img
          src={imageSrc ? imageSrc : DefaultUser150}
          alt={nickname}
          className="size-16 rounded-full border"
        />
        <div className="flex h-full items-center font-bold">
          <span>{nickname}</span>
        </div>
      </div>
      <div />
    </div>
  )
}

export default ContractPerson
