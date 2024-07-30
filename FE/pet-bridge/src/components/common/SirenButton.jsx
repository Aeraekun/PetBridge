import React, {useState} from "react"
import SirenModal from "./SirenModal"

const SirenButton = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }
  return (
    <>
      <button
        onClick={openModal}
        className="bg-alert rounded-3xl flex h-10 w-12 items-center justify-center "
      >
        <img src="/icons/icon-siren-white.svg" alt="Siren Icon" />
      </button>
      <SirenModal isOpen={modalOpen} onClose={closeModal} />
    </>
  )
}

export default SirenButton
