import {useState} from "react"

const AnimalDetailProfile = ({
  animal,
  isEditing,
  onInputChange,
  onFileChange,
  isShelter,
  errors,
}) => {
  const [imageSrc, setImageSrc] = useState(null)

  const handleRemoveImage = () => {
    onFileChange({target: {files: []}})
    setImageSrc(null)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImageSrc(url)
      onFileChange(event)
    }
  }

  const handleInputChange = (event) => {
    onInputChange(event)
  }

  const getFilteredFields = () => {
    const fields = [
      {
        label: "공고번호",
        name: "noticeNo",
        value: animal.noticeNo,
        showIf: isShelter,
      },
      // {
      //   label: "축종",
      //   name: "species",
      //   value: animal.species,
      //   showIf: !isShelter,
      // },
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
      {label: "색상", name: "colorCd", value: animal.colorCd, showIf: true},
      {
        label: "체중(kg)",
        name: "weight",
        value: animal.weight,
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
      {
        label: "공고시작일",
        name: "noticeSdt",
        value: animal.noticeSdt,
        showIf: isShelter,
      },
      {
        label: "공고종료일",
        name: "noticeEdt",
        value: animal.noticeEdt,
        showIf: isShelter,
      },
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

    // if (!isEditing) {
    //   return fields.filter(
    //     ({value, showIf}) => showIf && value && value.trim() !== ""
    //   )
    // }

    return fields.filter(({showIf}) => showIf)
  }

  const filteredFields = getFilteredFields()

  return (
    <div className="flex w-full justify-center p-4">
      {/* Animal Image */}
      <div className="flex max-w-[400px] flex-col lg:w-1/2">
        {isEditing ? (
          <div className="flex w-full flex-col items-center">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt="Uploaded Preview"
                className="max-h-96 max-w-96 rounded border"
              />
            ) : animal.filename ? (
              <img
                src={animal.filename}
                alt="animal profile"
                className="h-96 w-full object-contain"
              />
            ) : (
              <div className="flex h-96 w-full items-center justify-center border border-gray-300">
                이미지 없음
              </div>
            )}
            <input
              type="file"
              id="filename"
              name="filename"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2"
            />
            {imageSrc && (
              <button onClick={handleRemoveImage} className="mt-2 text-red-500">
                ✖
              </button>
            )}
          </div>
        ) : (
          <div className="flex h-96 w-full items-center justify-center border border-gray-300">
            {isShelter ? (
              <img
                src={animal.popfile}
                alt="animal popfile"
                className="size-full object-cover"
              />
            ) : animal.filename ? (
              <img
                src={animal.filename}
                alt="animal profile"
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full  flex-col items-center justify-center">
                이미지 없음
              </div>
            )}
          </div>
        )}
      </div>
      {/* Animal Details */}
      <div className="mt-4 flex w-full flex-col space-y-4 lg:mt-0 lg:w-1/2 lg:pl-4">
        {filteredFields.map(({label, name, value, options, inttype}) => (
          <div key={name} className="flex items-center">
            <label htmlFor={name} className="w-32">
              {label}
            </label>
            {isEditing ? (
              <>
                {options ? (
                  <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleInputChange}
                    className="w-full rounded border bg-mild p-2"
                  >
                    <option key={"none"} value={""}>
                      선택
                    </option>
                    {options.map((option) => (
                      <option key={option.value} value={option.label}>
                        {option.value ? option.label : option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={inttype ? "number" : "text"}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleInputChange}
                    className="w-full rounded border bg-mild p-2"
                  />
                )}
                {errors[name] && (
                  <div className="mt-1 text-sm text-red-500">
                    {errors[name]}
                  </div>
                )}
              </>
            ) : (
              <div
                id={name}
                name={name}
                className="w-full rounded border bg-mild p-2"
              >
                {value}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnimalDetailProfile
