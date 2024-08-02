import MainShelterContainer from "components/main/MainShelterContainer"

const MainPage = () => {
  return (
    <main className="flex w-[1000px] flex-col space-y-5">
      <div className="my-10 flex justify-center text-center text-6xl font-bold">
        <p>견우와 직묘</p>
      </div>
      <div className="bg-mild h-[400px]"></div>
      <section className="flex flex-col items-center">
        <MainShelterContainer />
      </section>
    </main>
  )
}

export default MainPage
