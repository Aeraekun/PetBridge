import axios from "axios"
const BASE_API_URL = process.env.REACT_APP_API_URL + "/animals"

const getListAnimalByUserId = async (userId) => {
  try {
    const res = await axios.get(`${BASE_API_URL}/user/${userId}`)
    console.log("getListAnimalByUserId" + res)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

const getDetailAnimal = async (id) => {
  try {
    const res = await axios.get(`${BASE_API_URL}/${id}`)
    console.log("getDetailAnimal" + res)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

/*동물 등록
{
    "userId": -1,
    "name": "흰둥이",
    "happenDt": 19990918,
    "kindCd": "[개] 시츄",
    "colorCd": "흰색",
    "age": "2023(년생)",
    "weight": "3(kg)",
    "noticeNo": null,
    "popfile": null,
    "processState": "보호중",
    "sexCd": "M",
    "neuterYn": "Y",
    "specialMark": "순함",
    "careAddr": "경상남도 거창군 남상면 수남로 1934-12",
    "noticeComment": "많관부"
    }
*/
const registAnimal = async (formData) => {
  try {
    const res = await axios.post(`${BASE_API_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    console.log("registAnimal" + res)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//동물 수정
const editAnimal = async (id, formData) => {
  try {
    const res = await axios.patch(`${BASE_API_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    console.log("editAnimal" + res)
    return res.data
  } catch (e) {
    console.error(e)
    return []
  }
}

//동물 삭제
// const removeAnimal = async (id) => {
//   try {
//     const res = await axios.patch(`${BASE_API_URL}/${id}/disable`)
//     console.log("removeAnimal" + res)
//     return res.data
//   } catch (e) {
//     console.error(e)
//     return []
//   }
// }
