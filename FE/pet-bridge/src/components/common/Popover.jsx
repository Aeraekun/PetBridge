import React, {useState} from "react"
import AnimalProfile from "./AnimalProfile"
import TaggedArticleItem from "components/shorts/TaggedArticleItem"

const Popover = ({list, children, type, onSelectAnimal, onVisible}) => {
  const [visible, setVisible] = useState(false)
  const [selectedAnimalId, setSelectedAnimalId] = useState(null)

  const togglePopover = () => {
    setVisible((prev) => !prev)
    if (visible) {
      onVisible(true)
    } else {
      onVisible(false)
    }
  }

  const handleAnimalSelect = (id) => {
    setSelectedAnimalId(id)
    if (onSelectAnimal) {
      onSelectAnimal(id) // 선택된 동물 ID를 부모 컴포넌트로 전달
    }
    togglePopover()
  }
  const ResetselectedAnimal = () => {
    setSelectedAnimalId(null)
    togglePopover()
    onSelectAnimal(null)
  }

  return (
    <div className="relative inline-block">
      <button onClick={togglePopover}>{children}</button>
      {visible && (
        <div className="absolute left-0 top-10 z-50 mb-2 h-fit w-96 rounded-lg bg-white text-sm  shadow-lg">
          <li>
            <button
              className="mx-4 h-12 bg-gray-300 text-lg  "
              onClick={ResetselectedAnimal}
            >
              선택안함
            </button>
          </li>
          {list.map((item, index) => (
            <li key={index} className="h-fit w-full">
              {type === "animal" ? (
                <AnimalProfile
                  data={item}
                  isSelected={selectedAnimalId === item.user_id}
                  onSelect={() => handleAnimalSelect(item.user_id)}
                />
              ) : (
                <TaggedArticleItem data={item} />
              )}
            </li>
          ))}
        </div>
      )}
    </div>
  )
}

export default Popover
