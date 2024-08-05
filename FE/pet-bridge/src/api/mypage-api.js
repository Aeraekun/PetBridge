import axios from "axios"
import axiosInstance from "api/axios-instance"

// 보호소 동물 조회
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

// 내가 팔로우중인 동물 조회
export const getFollowingAnimals = async (searchParams) => {
  const params = {
    page: searchParams.page,
    size: searchParams.size,
  }
  try {
    const res = await axiosInstance.get("/animals/follow", {
      params: params,
    })
    return res
  } catch (error) {
    console.log(error)
    return error
  }
}

// 내가 보호중인 동물 조회
export const getMyAnimals = async (searchParams) => {
  const params = {
    page: searchParams.page - 1,
    size: searchParams.size,
  }
  try {
    const res = await axiosInstance.get("/animals/user", {
      params: params,
    })
    return res
  } catch (error) {
    console.log(error)
    return error
  }
}

// 내가 작성한 펫픽 조회
export const getMyPetPics = async (searchParams) => {
  const params = {
    page: searchParams.page,
    size: searchParams.size,
    initcommentsize: 12,
  }
  try {
    const res = await axiosInstance.get("/petpicks/my", {
      params: params,
    })
    return res
  } catch (error) {
    console.log(error)
    return error
  }
}

// 내가 좋아요한 펫픽 조회
export const getMyLikes = async (searchParams) => {
  const params = {
    page: searchParams.page,
    size: searchParams.size,
    initcommentsize: 0,
  }
  try {
    const res = await axiosInstance.get("/petpicks/like", {
      params: params,
    })
    return res
  } catch (error) {
    console.log(error)
    return error
  }
}
