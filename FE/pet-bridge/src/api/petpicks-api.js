import axios from "axios"
import axiosInstance from "./axios-instance"

const PETPICK_API_URL = process.env.REACT_APP_API_URL + "/petpicks"
const PETPICK_COMMENTS_API_URL =
  process.env.REACT_APP_API_URL + "/petpick-comments"
const PETPICK_LIKE_API_URL = process.env.REACT_APP_API_URL + "/petpick-likes"
const PETPICK_FOLLOW_API_URL = process.env.REACT_APP_API_URL + "/follows"

//펫픽 등록
export const registPetPick = async (formData) => {
  try {
    const res = await axiosInstance.post(`${PETPICK_API_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    console.log("registPetPick" + res.data)
    return res.data
  } catch (e) {
    if (e.response) {
      // 서버가 응답을 했지만 상태 코드가 2xx 범위가 아닌 경우
      switch (e.response.status) {
        case 400:
          console.error("Bad Request: ", e.response.data)
          break
        case 401:
          console.error("Unauthorized: ", e.response.data)
          break
        case 403:
          console.error("Forbidden: ", e.response.data)
          break
        default:
          console.error("An error occurred: ", e.response.data)
      }
    } else if (e.request) {
      // 요청이 이루어졌으나 응답을 받지 못한 경우
      console.error("No response received: ", e.request)
    } else {
      // 요청을 설정하는 중에 오류가 발생한 경우
      console.error("Error setting up request: ", e.message)
    }
  }
}

//펫픽 수정
export const editPetPick = async (id, formData) => {
  try {
    const res = await axiosInstance.patch(
      `${PETPICK_API_URL}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    console.log("editPetPick", res.data)
    return res.data
  } catch (e) {
    if (e.response) {
      // 서버가 응답을 했지만 상태 코드가 2xx 범위가 아닌 경우
      switch (e.response.status) {
        case 400:
          console.error("Bad Request: ", e.response.data)
          break
        case 401:
          console.error("Unauthorized: ", e.response.data)
          break
        case 403:
          console.error("Forbidden: ", e.response.data)
          break
        default:
          console.error("An error occurred: ", e.response.data)
      }
    } else if (e.request) {
      // 요청이 이루어졌으나 응답을 받지 못한 경우
      console.error("No response received: ", e.request)
    } else {
      // 요청을 설정하는 중에 오류가 발생한 경우
      console.error("Error setting up request: ", e.message)
    }
    return null
  }
}

//펫픽랜덤조회
export const getRandomDetailPetPick = async () => {
  try {
    const res = await axiosInstance.get(`${PETPICK_API_URL}`, {
      params: {initcommentsize: 3},
    })
    console.log("getRandomDetailPetPick", res.data)
    return res.data
  } catch (e) {
    console.error(e)
    return e
  }
}

export const getDetailPetPick = async (petpickId) => {
  try {
    const res = await axiosInstance.get(
      `${PETPICK_API_URL}/detail/${petpickId}`,
      {
        params: {initcommentsize: 3},
      }
    )
    console.log("getDetailPetPick", res.data)
    return res.data
  } catch (e) {
    console.error(e)
    return e
  }
}
//펫픽삭제
// export const removePetPick = async (id) => {
//   try {
//     const res = await axiosInstance.delete(`${PETPICK_API_URL}/${id}`)
//     console.log("removePetPick" + res)
//     alert("삭제완료")
//     return res.data
//   } catch (e) {
//     console.error(e)
//     return []
//   }
// }

export const removePetPick = async (id) => {
  if (confirm("정말 삭제하시겠습니까?")) {
    try {
      const res = await axiosInstance.delete(`${PETPICK_API_URL}/${id}`)
      console.log("removePetPick" + res)
      alert("삭제완료")
      return res.data
    } catch (e) {
      console.error(e)
      return []
    }
  }
}


//댓글 조회
export const getPetpickComments = async (petpickId, page, size) => {
  const params = {page: page, size: size}
  try {
    const res = await axios.get(`${PETPICK_COMMENTS_API_URL}/${petpickId}`, {
      params,
    })
    console.log("getPetpickComments", res.data)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//댓글 삭제
export const removePetpickComments = async (petpickCommentId) => {
  try {
    const res = await axiosInstance.delete(
      `${PETPICK_COMMENTS_API_URL}/${petpickCommentId}`
    )
    console.log("removePetpickComments" + res)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//댓글 작성
export const registPetPickComment = async (comment) => {
  try {
    const res = await axiosInstance.post(`${PETPICK_COMMENTS_API_URL}`, comment)
    console.log("registPetPickComment" + res)
    alert("댓글 작성")
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

// 공통 에러 처리 함수
const handleApiError = (error) => {
  if (error.response) {
    // 서버가 응답했지만 상태 코드가 2xx 범위가 아닌 경우
    const {status, data} = error.response
    console.error(`Error ${status}: `, data)
    throw new Error(data.message || "An error occurred")
  } else if (error.request) {
    // 요청이 이루어졌으나 응답을 받지 못한 경우
    console.error("No response received: ", error.request)
    throw new Error("No response received")
  } else {
    // 요청을 설정하는 중에 오류가 발생한 경우
    console.error("Error setting up request: ", error.message)
    throw new Error("Error setting up request")
  }
}

// 좋아요 등록
export const registPetPickLike = async (petpickId) => {
  const params = {petPickId: petpickId}
  try {
    const res = await axiosInstance.post(`${PETPICK_LIKE_API_URL}`, params)
    console.log("registPetPickLike", res.data)
    return res.data
  } catch (error) {
    handleApiError(error)
  }
}

// 좋아요 삭제
export const deletePetPickLike = async (petpickId) => {
  const params = {petPickId: petpickId}
  try {
    const res = await axiosInstance.delete(`${PETPICK_LIKE_API_URL}`, {
      data: params,
    })
    console.log("deletePetPickLike", res)
    return res.data
  } catch (error) {
    handleApiError(error)
  }
}

// 팔로우 등록
export const registFollow = async (animalId) => {
  const params = {animalId: animalId}
  try {
    const res = await axiosInstance.post(`${PETPICK_FOLLOW_API_URL}`, params)
    console.log("registFollow", res.data)
    return res.data
  } catch (error) {
    handleApiError(error)
  }
}

// 팔로우 삭제
export const deleteFollow = async (animalId) => {
  const params = {animalId: animalId}
  try {
    const res = await axiosInstance.delete(`${PETPICK_FOLLOW_API_URL}`, {
      data: params,
    })
    console.log("deleteFollow", res)
    return res.data
  } catch (error) {
    handleApiError(error)
  }
}

//펫핏좋아요 조회
export const getDetailPetPickLike = async (petPickId) => {
  try {
    const res = await axiosInstance.get(`${PETPICK_LIKE_API_URL}/${petPickId}`)

    console.log("res" + res.data)
    if (res.status === 404) {
      // console.log("종아요 안누름")
    }
    return res
  } catch (error) {
    return []
  }
}

//동물 팔로우 조회

export const getDetailFollow = async (animalId) => {
  try {
    const res = await axiosInstance.get(`${PETPICK_FOLLOW_API_URL}/${animalId}`)
    if (res.status === 404) {
      // console.log("팔로우 안누름")
    }
    return res
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // console.log("팔로우 안누름")
      return false // 404 상태에서는 false 반환
    }
    console.error("Request failed:", error)
    return [] // 그 외의 오류에서는 빈 배열 반환
  }
}
