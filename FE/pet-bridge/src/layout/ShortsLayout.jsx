// import {useNavigate} from "react-router-dom"
import Navbar from "components/header/Navbar"
import {useEffect, useState} from "react"
import data from "components/petpick/dummydata"
import PetpickComments from "components/petpick/PetpickComments"
import PetpickPage from "pages/PetpickPage"

const ShortsLayout = () => {
  // const navigate = useNavigate()
  // const [petpickList, setPetpickList] = useState([])
  const petpickList = data[0]
  const [isVisible, setIsVisible] = useState(true)
  // const getPetpickList = () => {
  //   setPetpickList(data)
  // }
  useEffect(() => {
    // getPetpickList()
    console.log(data[0])
    // const id = data[0].id
    // navigate(`/petpick/${id}/comments`)
  }, [])

  const toggleVisible = (visibility) => {
    setIsVisible(visibility)
  }

  return (
    <>
      <div className="h-screen">
        {isVisible && <Navbar />}
        <div className="mx-auto h-full min-w-[500px]  flex-1 rounded-r-lg border border-stroke">
          {!isVisible ? (
            <PetpickPage data={petpickList} />
          ) : (
            <PetpickComments data={petpickList} onVisible={toggleVisible} />
          )}

          {/* <Outlet context={{data: petpickList[0]}}></Outlet> */}
        </div>
      </div>
    </>
  )
}

export default ShortsLayout
