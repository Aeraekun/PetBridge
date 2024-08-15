import React, {useState, useEffect} from "react"
import {useLocation, useNavigate} from "react-router-dom"

import {useSelector} from "react-redux"
import {selectId, selectRole} from "features/user/users-slice"
import {removeAnimal} from "api/animals-api"
import AnimalDetailProfile from "./AnimalDetailProfile"
import Button from "components/common/Button"
import DeleteConfirmationModal from "components/common/DeleteConfirmationModal"
import Profile from "components/common/Profile"
import ArticleItem from "../articles/ArticleItem"

const AnimalDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false) // 모달 열림 상태
  const [animalToDelete, setAnimalToDelete] = useState(null) // 삭제할 동물 정보
  const [animalArticle, setAnimalArticle] = useState([])
  const [isShelter, setIsShelter] = useState(false)

  const currentUserId = useSelector(selectId)
  const location = useLocation()
  const animal = location.state.animal || {}

  useEffect(() => {
    console.log("Animal data received:", location.state.animal)
  }, [location.state.animal])

  useEffect(() => {
    console.log(animal)
    const id = animal.desertionNo ? animal.desertionNo : animal.id
    if (id > 40000000) {
      setIsShelter(true)
    } else {
      setAnimalArticle(animal.boards.content)
    }
  }, [animal])

  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const goAnimalModify = (animal) => {
    const id = animal.desertionNo ? animal.desertionNo : animal.id
    navigate(`/shelter/modify/${id}`, {state: {animal}})
  }

  const openDeleteModal = () => {
    setAnimalToDelete(animal) // 삭제할 동물 정보를 설정
    setIsModalOpen(true) // 모달 열기
  }

  const closeDeleteModal = () => {
    setIsModalOpen(false) // 모달 닫기
    setAnimalToDelete(null) // 삭제할 동물 정보 초기화
  }

  const confirmDelete = async () => {
    if (animalToDelete) {
      await removeAnimal(animalToDelete.id) // 동물 삭제 API 호출
      navigate(`/shelter/1`) // 삭제 후 이동할 페이지
    }
    closeDeleteModal() // 모달 닫기
  }

  const goDetail = (article) => {
    const id = article.id
    let path = `/communities/details/${id}`
    navigate(path)
  }

  const isAdmin = useSelector(selectRole) === "ADMIN"

  return (
    <>
      <button onClick={goBack} className="relative  flex justify-start">
        돌아가기
      </button>
      <hr />
      {!isShelter && (
        <>
          <Profile
            image={animal.userImage}
            nickname={animal.userNickname}
            isMe={Number(currentUserId) === Number(animal.userId)}
          />
          <hr />
        </>
      )}

      <AnimalDetailProfile
        animal={animal}
        isEditing={false}
        isShelter={isShelter}
      />
      {!isShelter && (
        <div className="relative bottom-[250px] flex flex-col text-lg ">
          <div>
            <span className="font-semibold">{animal.name}</span>과 관련된 글
          </div>
          <ul className="relative  flex w-full flex-wrap justify-start gap-x-10">
            {animalArticle ? (
              animalArticle.map((article) => (
                <li key={article.id} className="w-[300px] grow">
                  <ArticleItem data={article} onSelectArticle={goDetail} />
                </li>
              ))
            ) : (
              <div>등록된 게시글이 없습니다.</div>
            )}
            <li className="w-[300px] grow"></li>
            <li className="w-[300px] grow"></li>
            <li className="w-[300px] grow"></li>
          </ul>
        </div>
      )}

      {(!isShelter && Number(currentUserId) === Number(animal.userId)) ||
      isAdmin ? (
        <div className="m-3 flex justify-end">
          <Button text={"수정하기"} onClick={() => goAnimalModify(animal)} />
          <Button text={"삭제하기"} onClick={openDeleteModal} />
        </div>
      ) : (
        <div className="flex justify-end"></div>
      )}

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </>
  )
}

export default AnimalDetail
