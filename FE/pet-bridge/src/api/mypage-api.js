import axiosInstance from "api/axios-instance"

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

// 내가 팔로우중인 동물 조회
export const getProtectingAnimals = async (searchParams) => {
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
