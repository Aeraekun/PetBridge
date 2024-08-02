const AiEyes = () => {
  return (
    <>
      <p>안구 건강 진단하기</p>
      <span>사진 예시</span>
      <ul className="flex w-[600px] justify-between">
        <li>
          <div className="bg-mild size-[175px]"></div>1
        </li>
        <li>
          <div className="bg-mild size-[175px]"></div>2
        </li>
        <li>
          <div className="bg-mild size-[175px]"></div>3
        </li>
      </ul>
      <section className="flex w-full items-center justify-around">
        <img src="" alt="" className="bg-stroke size-[400px]" />
        <div className="bg-mild size-20"></div>
        <div className="flex h-full w-[400px] flex-col">
          <span>진단 결과</span>
          <span>진단 결과는 이렇습니다</span>
          <img src="" alt="" className="h-80 border-4" />
        </div>
      </section>
    </>
  )
}

export default AiEyes
