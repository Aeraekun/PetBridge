import MyPageNav from "components/users/MyPageNav"

function MyPage() {
  return (
    <section className="flex h-[600px] w-[1000px] grid-cols-10 place-content-center items-center">
      <MyPageNav />
      <div className="h-full grow rounded-r-lg border bg-yellow">
        마이페이지
      </div>
    </section>
  )
}

export default MyPage
