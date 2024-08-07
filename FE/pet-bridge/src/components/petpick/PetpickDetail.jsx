import {useEffect, useState} from "react"
import {getDetailPetPick} from "api/petpicks-api"
import PetpickComments from "./PetpickComments"
import {Link, useParams} from "react-router-dom"

const PetpickDetail = () => {
  const [petpick, setPetpick] = useState(null) // 초기 데이터 상태
  const handleInView = (visibleIndex) => {
    visibleIndex
    // console.log(list.length)
  }
  const {petpickId} = useParams()
  useEffect(() => {
    const fetchAnimalDetail = async (petpickId) => {
      const getpetpick = await getDetailPetPick(petpickId)
      if (getpetpick) {
        setPetpick(getpetpick)
      }
      console.log(getpetpick)
    }
    fetchAnimalDetail(petpickId)
  }, [])

  return (
    <div className="relative flex flex-col sm:w-11/12">
      <Link className="top-30 right-20" to={`/petpick`}>
        더 보러 가기{" "}
      </Link>
      <PetpickComments pet={petpick} onInView={handleInView} />
    </div>
  )
}

export default PetpickDetail
