import React, {forwardRef, useEffect} from "react"
import {useInView} from "react-intersection-observer"
import {useNavigate} from "react-router-dom"

const AnimalAd = forwardRef(({animal, location, nowindex, onInView}, ref) => {
  const {ref: observerRef, inView} = useInView({
    threshold: 0.51, // Trigger when 51% of the item is visible
  })

  useEffect(() => {
    if (inView) {
      onInView(nowindex)
    }
    console.log(location)
  }, [inView, onInView, nowindex])

  const navigate = useNavigate()

  const goAnimalDetail = (animal) => (e) => {
    e.stopPropagation() // Prevents the event from bubbling up, if needed
    console.log(animal)
    const id = animal.desertionNo
    let path = `/shelter/details/${id}`
    navigate(path, {state: {animal}})
  }

  const isShelter = true

  const getFilteredFields = () => {
    // 성별과 중성화 여부의 변환 함수
    const translateSex = (sex) => {
      switch (sex) {
        case "M":
          return "수컷"
        case "F":
          return "암컷"
        case "Q":
          return "미상"
        default:
          return "미상"
      }
    }

    const translateNeuter = (neuter) => {
      switch (neuter) {
        case "Y":
          return "예"
        case "N":
          return "아니오"
        default:
          return "미상"
      }
    }

    const fields = [
      {
        label: "공고번호",
        name: "noticeNo",
        value: animal.noticeNo,
        showIf: isShelter,
      },
      {label: "품종", name: "kindCd", value: animal.kindCd, showIf: true},
      {
        label: "이름",
        name: "name",
        value: animal.name,
        showIf: !isShelter,
      },
      {
        label: "성별",
        name: "sexCd",
        value: translateSex(animal.sexCd), // 변환된 성별 값
        showIf: true,
      },
      {
        label: "나이(출생년도)",
        name: "age",
        value: animal.age,
        showIf: true,
        inttype: true,
      },
      {
        label: "중성화 여부",
        name: "neuterYn",
        value: translateNeuter(animal.neuterYn), // 변환된 중성화 여부 값
        showIf: true,
      },
      // 보호소 전용 필드
      {
        label: "보호 상태",
        name: "processState",
        value: animal.processState,
        options: ["보호중", "종료(반환)"],
        showIf: isShelter,
      },
      {
        label: "발견 장소",
        name: "happenPlace",
        value: animal.happenPlace,
        showIf: isShelter,
      },
      {
        label: "접수일",
        name: "happenDt",
        value: animal.happenDt,
        showIf: isShelter,
      },
      {
        label: "특징",
        name: "specialMark",
        value: animal.specialMark,
        showIf: isShelter,
      },
      // 임시 보호 전용 필드
      {
        label: "종류",
        name: "species",
        value: animal.species,
        showIf: !isShelter,
        options: ["개", "고양이", "기타"],
      },
      {
        label: "설명",
        name: "specialMark",
        value: animal.specialMark,
        showIf: !isShelter,
      },
    ]

    // 빈값이 아닌 필드만 반환
    return fields
      .filter(({showIf, value}) => showIf && value && value.trim() !== "")
      .map((field) => {
        // 특수 변환이 필요한 경우
        if (field.name === "sexCd") {
          return {...field, value: translateSex(field.value)}
        }
        if (field.name === "neuterYn") {
          return {...field, value: translateNeuter(field.value)}
        }
        return field
      })
  }

  const field = getFilteredFields()

  const shelterInfo = [
    {
      label: "보호소이름",
      name: "careNm",
      value: animal.careNm,
      showIf: isShelter,
    },
    {
      label: "보호소 전화번호",
      name: "careTel",
      value: animal.careTel,
      showIf: isShelter,
    },
    {
      label: "보호장소",
      name: "careAddr",
      value: animal.careAddr,
      showIf: true,
    },
    {
      label: "관할기관",
      name: "orgNm",
      value: animal.orgNm,
      showIf: isShelter,
    },
    {
      label: "담당자",
      name: "chargeNm",
      value: animal.chargeNm,
      showIf: isShelter,
    },
    {
      label: "담당자연락처",
      name: "officetel",
      value: animal.officetel,
      showIf: isShelter,
    },
  ]

  return (
    <div
      className="z-40 mx-auto flex  h-screen w-[1000px] snap-center  flex-row justify-center  pb-[100px] pt-[10px] sm:w-11/12"
      ref={(node) => {
        if (node) {
          if (ref && typeof ref === "object" && "current" in ref) {
            ref.current = node
          }
        }
        observerRef(node)
      }}
    >
      <button
        className="flex w-[800px] max-w-full  overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105 lg:flex-row"
        onClick={goAnimalDetail(animal)}
      >
        <div className="flex w-full flex-col space-y-4 p-4 md:w-1/2">
          {animal.filename ? (
            <img
              src={animal.popfile}
              alt="animal profile"
              className="h-64 w-full rounded-lg object-contain"
            />
          ) : (
            <div className="flex h-64 items-center justify-center text-gray-500">
              이미지 없음
            </div>
          )}
          <div className="rounded-lg bg-blue-100 p-4 shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">보호소 정보</h2>
            {shelterInfo
              .filter(({showIf}) => showIf)
              .map(({label, name, value}) => (
                <div key={name} className="mt-2 grid  grid-cols-6 gap-2">
                  <div className="col-span-2 font-medium  text-gray-700">
                    {label}
                  </div>
                  <div className="col-span-4 text-left text-gray-800">
                    {value}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="size-full shrink-0 border-b border-gray-300 bg-mild p-4 sm:w-1/2 sm:border-b-0 sm:border-r">
          {location && (
            <div className="text-shadow m-4 w-full text-left text-lg text-white">
              현재위치{" "}
              <span className="text-point text-xl font-bold">{location}</span>{" "}
              의 보호동물 입니다
            </div>
          )}
          {field.map(({label, name, value}) => (
            <div key={name} className="mt-2 flex items-center">
              <label htmlFor={name} className="w-1/3 font-semibold text-white">
                {label}
              </label>
              <div
                id={name}
                name={name}
                className="bg-mild w-2/3 rounded-lg border border-gray-300 p-2 text-gray-800"
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </button>
    </div>
  )
})

AnimalAd.displayName = "AnimalAd"

export default AnimalAd
