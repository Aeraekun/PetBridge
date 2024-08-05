import axios from "axios"
const PETPICK_API_URL = "http://localhost:8080/api/petpicks"
const PETPICK_COMMENTS_API_URL =
  "https://i11b106.p.ssafy.io/api/short-comments/"

//펫픽 등록
export const registPetPick = async (formData) => {
  try {
    const res = await axios.post(`${PETPICK_API_URL}`, formData)
    console.log("registPetPick" + res.data)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//펫픽 수정
export const editPetPick = async (id, formData) => {
  try {
    const res = await axios.post(`${PETPICK_API_URL}/${id}`, formData)
    console.log("editPetPick" + res.data)
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
    const res = await axios.get(`${PETPICK_API_URL}`, {
      params: {initcommentsize: 3},
    })
    console.log("getRandomDetailPetPick", res.data)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//펫픽삭제
export const removePetPick = async (id) => {
  try {
    const res = await axios.post(`${PETPICK_API_URL}/${id}/disable`)
    console.log("removePetPick" + res)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

export const getPetpickComments = async ({petpickId, page, size}) => {
  try {
    const res = await axios.get(
      `${PETPICK_COMMENTS_API_URL}/${petpickId}?page=${page}&size=${size}`
    )
    console.log("getPetpickComments" + res)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//댓글 삭제
export const removePetpickComments = async ({petpickId}) => {
  try {
    const res = await axios.patch(
      `${PETPICK_COMMENTS_API_URL}/${petpickId}/disable`
    )
    console.log("removePetpickComments" + res)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}
