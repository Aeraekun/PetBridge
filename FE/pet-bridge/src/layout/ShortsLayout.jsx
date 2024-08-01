import {Outlet, useLocation, useNavigate} from "react-router-dom"
import Navbar from "components/header/Navbar"
import {useEffect, useState} from "react"
import data from "components/petpick/dummydata"
import PetpickIconContainer from "components/petpick/PetpickIconContainer"

const ShortsLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [inMain, setInMain] = useState(false)
  const [petpickList, setPetpickList] = useState([])
  const getPetpickList = () => {
    setPetpickList(data)
  }
  useEffect(() => {
    const isMain = () => {
      if (location.pathname === "/petpick") {
        const id = 1
        getPetpickList()
        navigate(`/petpick/${id}`)
        setInMain(true)
      } else {
        setInMain(false)
      }
    }

    isMain()
    console.log(`isMain: ${inMain}, pathname: ${location.pathname}`)
  }, [location.pathname, inMain, navigate])

  return (
    <>
      {!inMain && <Navbar />}
      <main className="min-w-[1000px]flex-row mx-auto flex h-screen max-w-[1000px] justify-center sm:w-11/12">
        <div className="border-1 w-fullflex-row my-8 flex h-fit rounded-lg border border-stroke">
          {!inMain ? (
            <div className="max-h-[700px] w-full min-w-[500px] flex-1 rounded-r-lg">
              <Outlet id={petpickList[0]}></Outlet>
            </div>
          ) : (
            <div className="flex flex-col justify-end">
              <PetpickIconContainer direct={"col"} />
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default ShortsLayout
