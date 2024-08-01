import MainShelterContainer from "components/main/MainShelterContainer"

const MainPage = () => {
  return (
    <main className="flex w-[1000px] flex-col space-y-5">
      <p className="my-10 text-center text-6xl font-bold">견우와 직묘</p>
      <div className="h-[400px] bg-mild"></div>
      <section className="flex flex-col items-center">
        <MainShelterContainer />
      </section>
    </main>
  )
}

export default MainPage
