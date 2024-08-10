import React, {useState} from "react"
import SirenModal from "./SirenModal"

const SirenButton = ({reportType, reportId}) => {
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
        className="flex h-10 w-12 items-center justify-center rounded-3xl bg-alert "
      >
        <img src="/icons/icon-siren-white.svg" alt="Siren Icon" />
      </button>
      <SirenModal
        isOpen={modalOpen}
        onClose={closeModal}
        reportType={reportType}
        reportId={reportId}
      />
    </>
  )
}

export default SirenButton
