const Profile = ({nickname, image}) => {
  return (
    <div className="flex h-12 items-center justify-around space-x-2.5">
      <img
        src={image}
        alt="프로필사진"
        className="size-12 rounded-full border "
      />
      <div className="flex-1">
        <p className="text-lg font-semibold">{nickname}</p>
      </div>
    </div>
  )
}
export default Profile
