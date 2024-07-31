const ContractPerson = ({title, nickname, imageSrc}) => {
  return (
    <div className="col-span-1 flex flex-col justify-between border p-2.5">
      <p className="text-xl font-bold">{title}</p>
      <div className="flex space-x-5">
        <img
          src={imageSrc}
          alt={nickname}
          className="size-16 rounded-full border"
        />
        <div className="flex h-full items-center font-bold">
          <span>{nickname}</span>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default ContractPerson
