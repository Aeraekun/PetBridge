import axiosInstance from "./axios-instance"

export const getUserContracts = (userId) => {
  const res = axiosInstance.get(`/contracts/user/${userId}`)
  return res
}
