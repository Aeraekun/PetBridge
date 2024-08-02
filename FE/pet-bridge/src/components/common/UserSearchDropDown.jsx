const UserSearchDropDown = () => {
  return (
    <div className=" flex h-80 w-60 flex-col divide-y rounded-2xl border shadow-2xl">
      <span className="flex items-center justify-center">유저 검색</span>
      <span className="col-span-5 flex items-center justify-center border">
        <span>검색</span>
        <input type="text rounded-lg mx-2" />
      </span>
      <div className="row-span-5 w-full"></div>
    </div>
  )
}

export default UserSearchDropDown
