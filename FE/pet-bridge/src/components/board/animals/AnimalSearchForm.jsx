/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import "react-datepicker/dist/react-datepicker.css"

import React, {useEffect, useState} from "react"
import {getBreedAPI, getSidoAPI, getSigunguAPI} from "api/animals-api"
import DatePicker from "react-datepicker"
import {format} from "date-fns"

const AnimalSearchForm = ({searchParams, isShelter}) => {
  const [sido, setSido] = useState([])
  const [selectedSido, setSelectedSido] = useState("")
  const [sigungu, setSigungu] = useState([])
  const [selectedSigungu, setSelectedSigungu] = useState("")
  const [breed, setBreed] = useState([])
  const [selectedKind, setSelectedKind] = useState("")
  const [selectedUpKindCd, setSelectedUpKindCd] = useState("")
  const [params, setParams] = useState({})
  const [bgnde, setBgnde] = useState(new Date())
  const [endde, setEndde] = useState(new Date())

  useEffect(() => {
    console.log(params)
    setParams(params)
  }, [params])

  //시도
  useEffect(() => {
    // 시도 데이터 가져오기
    const fetchSido = async () => {
      const res = await getSidoAPI()
      if (res.data) {
        const data = res.data.response.body.items.item

        if (data) {
          setSido(data)
        } else {
          console.error("시도 데이터 형식이 올바르지 않습니다:", data)
        }
      } else {
        console.error("시도 데이터 가져오기 오류:", res)
      }
    }
    fetchSido()
  }, [])

  //시군구
  useEffect(() => {
    const fetchSigungu = async (selectedSido) => {
      try {
        const res = await getSigunguAPI(selectedSido)
        if (res.data) {
          const data = res.data.response.body.items.item
          if (Array.isArray(data)) {
            setSigungu(data)
          } else {
            console.error("시군구 데이터 형식이 올바르지 않습니다:", data)
          }
        } else {
          console.error("시군구 데이터 가져오기 오류:", res)
        }
      } catch (error) {
        console.error("시군구 데이터 가져오기 오류:", error)
      }
    }
    if (selectedSido !== "" && selectedSido !== null) {
      //시도 데이터가 있으면 시군구가져오기
      fetchSigungu(selectedSido)
    }
  }, [selectedSido])

  //축종 개 고양이
  useEffect(() => {
    const fetchBreed = async (selectedUpKindCd) => {
      try {
        const res = await getBreedAPI(selectedUpKindCd)
        if (res.data) {
          const data = res.data.response.body.items.item
          if (Array.isArray(data)) {
            setBreed(data)
          } else {
            console.error("품종 데이터 형식이 올바르지 않습니다:", data)
          }
        } else {
          console.error("품종 데이터 가져오기 오류:", res)
        }
      } catch (error) {
        console.error("품종 데이터 가져오기 오류:", error)
      }
    }
    console.log("upkind", selectedUpKindCd)
    if (selectedUpKindCd > 0) {
      fetchBreed(selectedUpKindCd)
    }
  }, [selectedUpKindCd])

  //품종
  useEffect(() => {
    console.log(selectedKind)
  }, [selectedKind])

  const formatDateToYYYYMMDD = (date) => {
    if (!date) return ""
    return format(date, "yyyyMMdd")
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formattedBgnDate = formatDateToYYYYMMDD(bgnde)
    const formattedEndDate = formatDateToYYYYMMDD(bgnde)

    console.log(
      formattedBgnDate,
      formattedEndDate,
      selectedSido,
      selectedSigungu,
      selectedUpKindCd,
      selectedKind
    )
    let obj = {
      bgnde: formattedBgnDate,
      endde: formattedEndDate,
      upr_cd: selectedSido,
      org_cd: selectedSigungu,
      upkind: selectedUpKindCd, //축종코드 개, 고양이
      kind: selectedKind, //품종코드
    }

    function cleanObject(obj) {
      const entries = Object.entries(obj)

      // Filter entries based on the value
      const filteredEntries = entries.filter(([value]) => value > 0)
      filteredEntries
      return obj
      // return Object.fromEntries(filteredEntries)
    }

    // Call the function to get the cleaned object
    const filteredData = cleanObject(obj)
    console.log("fil", obj)
    // Perform your API call or further processing with filteredData
    if (filteredData) {
      searchParams(filteredData)
    }
    setBreed(null)
    setSelectedSido(null)
    setSelectedSigungu(null)
    setEndde(null)
    setBgnde(null)
    setParams(null)
    setSelectedUpKindCd(null)
    setSelectedKind(null)
  }

  return (
    <div className="p-4">
      {isShelter ? (
        <div>
          <h1 className="mb-4 text-2xl font-bold">보호소 동물 검색</h1>
          <div className="mb-4 flex space-x-4">
            <DatePicker
              id="bgnde"
              selected={bgnde}
              onChange={(date) => setBgnde(date)}
              dateFormat="yyyy/MM/dd"
              className="rounded-md border border-[#D9D9D9] p-2"
              placeholderText="검색시작일"
            />
            <DatePicker
              id="endde"
              selected={endde}
              onChange={(date) => setEndde(date)}
              dateFormat="yyyy/MM/dd"
              className="rounded-md border border-[#D9D9D9] p-2"
              placeholderText="검색종료일"
            />
          </div>
        </div>
      ) : (
        <div className="mb-4 text-xl font-semibold">임시보호동물 검색</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="sido" className="mb-1 block">
              시도:
            </label>
            <select
              id="sido"
              value={selectedSido}
              onChange={(e) => setSelectedSido(e.target.value)}
              className="w-full rounded-md border border-[#D9D9D9] p-2"
            >
              <option value="">선택</option>
              {sido &&
                sido.map((item, index) => (
                  <option key={index} value={parseInt(item.orgCd)}>
                    {item.orgdownNm}
                  </option>
                ))}
            </select>
          </div>

          {selectedSido && (
            <div className="flex-1">
              <label htmlFor="sigungu" className="mb-1 block">
                시군구:
              </label>
              <select
                id="sigungu"
                value={selectedSigungu}
                onChange={(e) => setSelectedSigungu(e.target.value)}
                className="w-full rounded-md border border-[#D9D9D9] p-2"
              >
                <option value="">선택</option>
                {sigungu &&
                  sigungu.map((item) => (
                    <option key={item.orgCd} value={parseInt(item.orgCd)}>
                      {item.orgdownNm}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="kind" className="mb-1 block">
              종류:
            </label>
            <select
              id="kind"
              value={selectedUpKindCd}
              onChange={(e) =>
                setSelectedUpKindCd(parseInt(e.target.value, 10))
              }
              className="w-full rounded-md border border-[#D9D9D9] p-2"
            >
              <option value="">선택</option>
              <option value="417000">개</option>
              <option value="422400">고양이</option>
              <option value="429900">기타</option>
            </select>
          </div>

          {selectedUpKindCd > 0 && isShelter && (
            <div className="flex-1">
              <label htmlFor="breed" className="mb-1 block">
                품종:
              </label>
              <select
                id="breed"
                value={selectedKind}
                onChange={(e) => setSelectedKind(e.target.value)}
                className="w-full rounded-md border border-[#D9D9D9] p-2"
              >
                <option value="">선택</option>
                {breed &&
                  breed.map((item) => (
                    <option key={item.kindCd} value={item.kindCd}>
                      {item.knm}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="rounded-md bg-green-200 px-4 py-2 text-black"
          >
            검색
          </button>
        </div>
      </form>
    </div>
  )
}

export default AnimalSearchForm
