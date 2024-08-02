import axios from "axios"

export const getShelterAnimals = async (searchParams) => {
  const params = {
    serviceKey:
      "g5vQ++oXb4/6B8IvamxV9Vzg1V9U880MIrl02T7y3P9aAeVTHujkgA3wbTaMxcfyyJpmN8nNJBOmF/M21ApXlw==",
    pageNo: searchParams.pageNo,
    numOfRows: searchParams.numOfRows,
    _type: "json",
  }

  const res = await axios.get(
    "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic",
    {params: params}
  )

  return res
}
