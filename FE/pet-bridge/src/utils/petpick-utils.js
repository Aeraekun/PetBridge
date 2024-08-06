import {removePetPick} from "api/petpicks-api"

// 쇼츠 삭제하기
export const goDeletePetpick = async (petpickId) => {
  await removePetPick(petpickId)
}
