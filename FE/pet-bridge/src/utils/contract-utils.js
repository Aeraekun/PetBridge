const {patchContractCheck} = require("api/contracts-api")

export const patchThisMonthStamp = async (contractInfo) => {
  const res = await patchContractCheck(contractInfo)

  return res
}
