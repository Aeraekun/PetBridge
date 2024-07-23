import React, {useState} from "react"
import Siren from "../../assets/image/Siren-white.png"
import SirenModal from "./SirenModal"

const SireWhitenIcon = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <button onClick={openModal}>
        <img src={Siren} alt="Siren Icon" />
      </button>
      <SirenModal isOpen={modalOpen} onClose={closeModal} />
    </>
  )
}

export default SireWhitenIcon
