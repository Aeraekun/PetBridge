import axiosInstance from "./axios-instance"

// 유저의 모든 계약서 정보 조회
export const getUserContracts = (userId) => {
  const res = axiosInstance.get(`/contracts/user/${userId}`)
  return res
}

// 계약서 상세 정보 조회
export const getContractDetail = (contractId) => {
  const res = axiosInstance.get(`/contracts/${contractId}`)
  return res
}

// 계약서 도장 찍기 요청
export const patchContractCheck = async (contractInfo) => {
  const res = await axiosInstance.patch(
    `/contract-checks/${contractInfo.contractId}`,
    contractInfo
  )
  return res
}

// 계약서 작성 요청
export const postContract = async (contractFormData) => {
  const res = await axiosInstance.post("contracts", contractFormData)

  return res
}
