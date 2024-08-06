import MainShelterContainer from "components/main/MainShelterContainer"
import MainBanner from "components/main/MainBanner"
import MainSlideshow from "components/main/MainSlideshow"
import MainAiBanner from "components/main/MainAiBanner"
import MainLostAndFoundBanner from "components/main/MainLostAndFoundBanner"
import MainUccBanner from "components/main/MainUccBanner"
import MainArticleBanner from "components/main/MainArticleBanner"
import TopButton from "components/common/TopButton"

const MainPage = () => {
  return (
    <>
      <section className="flex w-[1423px] flex-col">
        <MainSlideshow />
      </section>
      <main className="flex w-[1000px] flex-col space-y-5">
        <section className="mt-10 flex flex-col items-center">
          <MainBanner />
        </section>
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
    </>
  )
}

export default MainPage
