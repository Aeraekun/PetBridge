const ContractStamp = ({idx, text}) => {
  return (
    <div>
      <div className="col-span-1 m-3 flex size-[120px] items-center justify-center rounded-full border-4 border-mild text-mild">
        {text}
      </div>
      <p className="text-center">{idx} 번째 스탬프</p>
    </div>
  )
}

export default ContractStamp
