import MainShelterContainer from "components/main/MainShelterContainer"
import MainSlideshow from "components/main/MainSlideshow"
import MainAiBanner from "components/main/MainAiBanner"
import MainLostAndFoundBanner from "components/main/MainLostAndFoundBanner"
import MainUccBanner from "components/main/MainUccBanner"
import MainArticleBanner from "components/main/MainArticleBanner"
import TopButton from "components/common/TopButton"

const MainPage = () => {
  return (
    <main className="flex w-[1000px] flex-col space-y-5">
      <div className="my-10 flex justify-center text-center text-6xl font-bold">
        <p>견우와 직묘</p>
      </div>
      <section className="h-[450px] w-full">
        <MainSlideshow />
      </section>
      <div className="my-10 flex justify-center text-center text-4xl font-bold">
        <p>보호자와 입양자를 연결하는 든든한 오작교</p>
      </div>
      <section className="flex flex-col items-center">
        <MainShelterContainer />
      </section>
      <section className="flex h-[450px] flex-col items-center">
        <MainAiBanner />
      </section>
      <section className="flex h-[450px] flex-col items-center">
        <MainLostAndFoundBanner />
      </section>
      <section className="flex h-[450px] w-full flex-col items-center">
        <MainUccBanner />
      </section>
      <section className="flex h-[450px] w-full flex-col items-center">
        <MainArticleBanner />
      </section>
      <TopButton />
    </main>
  )
}

export default MainPage
