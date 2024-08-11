import React, {useState} from "react"
import SirenModal from "./SirenModal"

const SirenIcon = ({reportType, reportId}) => {
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
        <img src="/icons/icon-siren.svg" alt="Siren Icon" />
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

export default SirenIcon
