const AnimalDetailProfile = ({
  animal,
  isEditing,
  onInputChange,
  onFileChange,
}) => {
  const handleRemoveImage = () => {
    onFileChange({target: {files: []}})
  }

  const getFilteredFields = () => {
    const fields = [
      {label: "공고번호", name: "noticeNo", value: animal.noticeNo},
      {label: "성별", name: "sexCd", value: animal.sexCd, options: ["M", "F"]}, // 성별을 셀렉트 박스로 변경
      {label: "나이", name: "age", value: animal.age},
      {
        label: "특징",
        name: "noticeComment",
        value: animal.noticeComment || "정보 없음",
      },
      {label: "종류", name: "kindCd", value: animal.kindCd},
      {label: "색상", name: "colorCd", value: animal.colorCd},
      {label: "체중", name: "weight", value: animal.weight},
      {
        label: "보호 상태",
        name: "processState",
        value: animal.processState,
        options: ["보호중", "종료(반환)"], // 보호 상태를 셀렉트 박스로 변경
      },
      {
        label: "중성화 여부",
        name: "neuterYn",
        value: animal.neuterYn,
        options: ["Y", "N"],
      }, // 중성화 여부를 셀렉트 박스로 변경
      {label: "주소", name: "careAddr", value: animal.careAddr},
      {label: "보호소 명", name: "careNm", value: animal.careNm},
      {label: "보호소 전화", name: "careTel", value: animal.careTel},
      {label: "담당 지역", name: "chargeNm", value: animal.chargeNm},
      {label: "발견 장소", name: "happenPlace", value: animal.happenPlace},
      {label: "발견 일자", name: "happenDt", value: animal.happenDt},
      {label: "공지 시작일", name: "noticeSdt", value: animal.noticeSdt},
      {label: "공지 종료일", name: "noticeEdt", value: animal.noticeEdt},
      {label: "전화번호", name: "officetel", value: animal.officetel},
      {label: "기관명", name: "orgNm", value: animal.orgNm},
      {label: "특별 마크", name: "specialMark", value: animal.specialMark},
    ]

    if (!isEditing) {
      return fields.filter(({value}) => value && value.trim() !== "")
    }

    return fields
  }

  const filteredFields = getFilteredFields()

  return (
    <div className="flex w-full flex-wrap p-4">
      {/* Animal Image */}
      <div className="flex w-full flex-col lg:w-1/2">
        {isEditing ? (
          <div className="flex w-full flex-col items-center">
            {animal.filename ? (
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
              onChange={onFileChange}
              className="mt-2"
            />
            {onFileChange && (
              <button onClick={handleRemoveImage} className="mt-2 text-red-500">
                ✖
              </button>
            )}
          </div>
        ) : (
          <div className="flex h-96 w-full items-center justify-center border border-gray-300">
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
          </div>
        )}
      </div>

      {/* Animal Details */}
      <div className="mt-4 flex w-full flex-col space-y-4 lg:mt-0 lg:w-1/2 lg:pl-4">
        {filteredFields.map(({label, name, value, options}) => (
          <div key={name} className="flex items-center">
            <label htmlFor={name} className="w-32">
              {label}
            </label>
            {isEditing ? (
              options ? (
                <select
                  id={name}
                  name={name}
                  value={value}
                  onChange={onInputChange}
                  className="bg-mild w-full rounded border p-2"
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  id={name}
                  name={name}
                  value={value}
                  onChange={onInputChange}
                  className="bg-mild w-full rounded border p-2"
                />
              )
            ) : (
              <div
                id={name}
                name={name}
                className="bg-mild w-full rounded border p-2"
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
