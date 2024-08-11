const ContractAnimal = ({imageSrc, name, kind, age, isCreate}) => {
  return (
    <div className="col-span-2">
      <div className="flex">
        <p className="m-1 text-xl font-bold">입양 동물</p>
        {isCreate ? <p className="m-1">isCreate : true</p> : <p></p>}
      </div>
      <div className="flex h-28 items-center space-x-5 rounded-xl bg-green-50">
        <img src={imageSrc} alt={name} className="size-20 rounded-full" />
        <div className="flex flex-col justify-center">
          <div className=" flex ">
            <div className="mr-3 w-20">이름</div>
            <div className="w-full ">{name}</div>
          </div>
          <div className=" flex ">
            <div className="mr-3 w-20 ">품종</div>
            <div className="w-full ">{kind}</div>
          </div>
          <div className=" flex ">
            <div className="mr-3 w-20">나이</div>
            <div className="w-full ">{age} 년생</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContractAnimal
