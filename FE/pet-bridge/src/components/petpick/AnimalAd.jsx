import React, {forwardRef, useEffect} from "react"

import {useInView} from "react-intersection-observer"
import {useNavigate} from "react-router-dom"

const AnimalAd = forwardRef(({animal, nowindex, onInView}, ref) => {
  const {ref: observerRef, inView} = useInView({
    threshold: 0.51, // Trigger when 20% of the item is visible
  })

  useEffect(() => {
    if (inView) {
      onInView(nowindex)
    }
  }, [inView, onInView, nowindex])
  // const [petpick, setPetpick] = useState([])
  // const petpick = []
  const navigate = useNavigate()

  //댓글리스트 불러올때 필요

  // const status = useSelector(selectPetpickStatus)
  // const error = useSelector(selectPetpickError)

  // const [petpickId, setPetpickId] = useState(0)

  const goAnimalDetail = (animal) => {
    return (e) => {
      e.stopPropagation() // Prevents the event from bubbling up, if needed
      console.log(animal)
      const id = animal.desertionNo
      let path = `/shelter/details/${id}`
      navigate(path, {state: {animal}})
    }
  }

  const isShelter = true

  const getFilteredFields = () => {
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
        value: animal.sexCd,
        options: ["M", "F", "Q"],
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
        value: animal.neuterYn,
        options: ["N", "Y"],
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

    return fields.filter(({showIf}) => showIf)
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
      className=" z-50 mx-auto flex h-screen w-[1000px] snap-center flex-row justify-center py-[50px] sm:w-11/12"
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
        className="flex h-screen w-[800px] justify-between overflow-hidden bg-gray-50 "
        onClick={goAnimalDetail(animal)}
      >
        <div className="max-w-[400px] items-center justify-center border border-gray-300">
          {animal.filename ? (
            <img
              src={animal.popfile}
              alt="animal profile"
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              이미지 없음
            </div>
          )}

          {shelterInfo.map(({label, name, value}) => (
            <div key={name} className="flex items-center">
              <label htmlFor={name} className="w-32">
                {label}
              </label>
              <div
                id={name}
                name={name}
                className="w-full rounded border bg-mild p-2"
              >
                {value}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex w-full flex-col space-y-4 lg:mt-0 lg:w-1/2 lg:pl-4">
          {field.map(({label, name, value}) => (
            <div key={name} className="flex items-center">
              <label htmlFor={name} className="w-32">
                {label}
              </label>
              <div
                id={name}
                name={name}
                className="w-full rounded border bg-mild p-2"
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
