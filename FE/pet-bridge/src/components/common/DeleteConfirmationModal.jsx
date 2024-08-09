import React from "react"
import trashbinIcon from "../../assets/icons/icon-trashbin.png"

const DeleteConfirmationModal = ({isOpen, onClose, onConfirm}) => {
  if (!isOpen) return null

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex-col sm:items-start">
                <div className="my-5 flex justify-center sm:w-full">
                  <div
                    className="mx-auto flex size-16 shrink-0 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "#A3A3A3",
                      width: "3rem", // 원하는 너비로 조정
                      height: "3rem", // 원하는 높이로 조정
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={trashbinIcon}
                      alt="Trash Bin Icon"
                      style={{
                        maxWidth: "80%", // 배경에 맞게 조정
                        maxHeight: "80%", // 배경에 맞게 조정
                        objectFit: "contain", // 이미지가 영역에 맞게 조정
                      }}
                    />
                  </div>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="my-5 text-center text-xl font-bold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    정말 삭제하시겠습니까?
                  </h3>
                </div>
              </div>
            </div>
            <div className="justify-center bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6">
              <button
                type="button"
                className="mr-3 inline-flex w-36 justify-center rounded-md p-3 text-sm text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-36"
                style={{backgroundColor: "#A3A3A3"}}
                onClick={onConfirm}
              >
                삭제
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-36 justify-center rounded-md bg-white py-3 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-36"
                onClick={onClose}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal
