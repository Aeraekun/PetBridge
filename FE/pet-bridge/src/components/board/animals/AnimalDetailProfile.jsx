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
  const [error, setError] = useState(null)

  // 파일 선택 시 호출되는 함수
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    const maxSizeInBytes = 30 * 1024 * 1024 // 50MB 크기 제한
    if (file.size > maxSizeInBytes) {
      setError("파일 크기는 30MB를 초과할 수 없습니다.")
      return
    }
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
    <div className="grid w-full grid-cols-12 grid-rows-12 p-4 text-lg">
      {/* Animal Image */}
      <div className="col-span-6 row-span-6 flex flex-col">
        {isEditing ? (
          // 수정중 상태
          <div className="flex w-full flex-col items-center">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt="Uploaded Preview"
                className="max-h-96 max-w-96 rounded"
              />
            ) : animal.filename ? (
              <img
                src={animal.filename}
                alt="animal profile"
                className="h-96 w-full object-contain"
              />
            ) : (
              <div className="flex h-96 w-full items-center justify-center rounded-xl border border-gray-300">
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

            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        ) : (
          // 수정중 아닐때
          <div className="flex h-96 items-center justify-center border-gray-300">
            {isShelter ? (
              // 보호소 동물
              <img
                src={animal.popfile}
                alt="animal popfile"
                className="m-2 size-full rounded-xl object-cover"
              />
            ) : animal.filename ? (
              <img
                src={animal.filename}
                alt="animal profile"
                className="m-2 size-full rounded-xl object-cover"
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
      {filteredFields.map(({label, name, value, options, inttype}) => (
        <div
          key={name}
          className="col-span-6 m-1 flex rounded-xl border-none border-gray-100 shadow"
        >
          <label
            htmlFor={name}
            className="inline-flex w-40 shrink-0 items-center justify-start ps-5"
          >
            {label}
          </label>
          {/* 수정중일때 */}
          {isEditing ? (
            <>
              {options ? (
                <div className="relative inline-flex items-center">
                  <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleInputChange}
                    className="bg-mild rounded"
                  >
                    <option
                      key={"none"}
                      value={""}
                      className="bg-mild w-full rounded border px-2 py-1"
                    >
                      선택
                    </option>
                    {options.map((option) => (
                      <option
                        key={option.value}
                        value={option.label}
                        className="bg-mild w-full rounded border px-2 py-1"
                      >
                        {option.value ? option.label : option}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="relative inline-flex items-center">
                  <input
                    type={inttype ? "number" : "text"}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleInputChange}
                    className="bg-mild rounded border px-2 py-1"
                  />
                </div>
              )}
              {errors[name] && (
                <div className="mt-1 text-sm text-red-500">{errors[name]}</div>
              )}
            </>
          ) : (
            // 수정중 아닐 때
            <div
              id={name}
              name={name}
              className="inline-flex grow items-center px-5"
            >
              <span className="bg-mild rounded px-2 py-1">{value}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default AnimalDetailProfile
