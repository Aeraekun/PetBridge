import React, {useState, useEffect} from "react"
import Button from "components/common/Button"
import Editor from "components/common/Editor"
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import {selectImage, selectNickname} from "features/user/users-slice"
import {registArticle} from "api/boards-api"
import markerImg from "../../assets/image/marker.png"

const {kakao} = window

const Profile = ({nickname}) => {
  return (
    <div className="mb-4 flex items-center space-x-4">
      <img
        src="https://via.placeholder.com/50"
        alt="Author Avatar"
        className="size-12 rounded-full border"
      />
      <div>
        <p className="text-lg font-semibold">{nickname}</p>
      </div>
    </div>
  )
}

const Report = () => {
  const [title, setTitle] = useState("")
  const [editorContent, setEditorContent] = useState("")
  const [imageSrc, setImageSrc] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [position, setPosition] = useState(null)
  const navigate = useNavigate()

  const currentUserImage = useSelector(selectImage)
  const currentUserNickname = useSelector(selectNickname)

  useEffect(() => {
    const container = document.getElementById("map")
    const defaultCenter = new kakao.maps.LatLng(36.355383, 127.298445)
    const options = {
      center: defaultCenter,
      level: 3,
    }

    const map = new kakao.maps.Map(container, options)

    const imageSize = new kakao.maps.Size(50, 50)
    const imageOption = {offset: new kakao.maps.Point(25, 50)}

    const markerImage = new kakao.maps.MarkerImage(
      markerImg,
      imageSize,
      imageOption
    )
    const marker = new kakao.maps.Marker({
      position: map.getCenter(),
      image: markerImage,
    })
    marker.setMap(map)

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      const latlng = mouseEvent.latLng
      marker.setPosition(latlng)
      setPosition(latlng)
    })
  }, [])

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImageSrc(url)
      setImageFile(file)
    }
  }

  const writeArticle = async () => {
    if (editorContent.trim() === "") {
      alert("내용을 입력해주세요.")
      return
    }
    if (title.trim() === "") {
      alert("제목을 입력해주세요.")
      return
    }
    if (!imageSrc) {
      alert("대표사진을 입력하세요.")
      return
    }
    if (!position) {
      alert("지도를 클릭하여 위치를 선택하세요.")
      return
    }

    const newArticle = {
      title: title,
      type: "LOST",
      content: editorContent,
      lat: position.getLat(),
      lon: position.getLng(),
    }

    const formData = new FormData()
    formData.append(
      "boardRegistRequestDto",
      new Blob([JSON.stringify(newArticle)], {type: "application/json"})
    )
    if (imageFile) {
      formData.append("thumbnail", imageFile)
    }

    try {
      await registArticle(formData)
      alert("글이 작성되었습니다.")
      navigate(`/lost-and-found`)
    } catch (e) {
      console.error(e)
      alert("글 작성에 실패했습니다.")
    }
  }

  const resetImage = () => {
    setImageSrc(null)
    setImageFile(null)
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500 hover:underline"
      >
        &larr; 돌아가기
      </button>
      <input
        className="mb-4 w-full rounded-lg border border-gray-300 p-4 text-2xl font-bold placeholder:text-gray-500"
        placeholder="제목을 입력하세요"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <hr className="my-4" />
      <Profile nickname={currentUserNickname} image={currentUserImage} />
      <hr className="my-4" />

      <div className="mb-4">
        <h2 className="mb-2 text-xl font-semibold">대표사진</h2>
        {imageSrc ? (
          <div className="relative">
            <img
              src={imageSrc}
              alt="Uploaded Preview"
              className="max-h-96 w-full rounded border object-contain"
            />
            <button
              onClick={resetImage}
              className="absolute right-2 top-2 rounded-full border bg-white p-1 shadow-lg hover:bg-gray-100"
            >
              ✖
            </button>
          </div>
        ) : (
          <div className="flex h-64 w-full items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
            <p className="text-gray-500">대표사진을 입력해주세요.</p>
          </div>
        )}
        <div className="mt-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none"
          />
        </div>
      </div>

      <div id="map" className="mb-4 h-64 w-full rounded border"></div>

      <div className="mb-6 min-h-72 w-full">
        <Editor value={editorContent} onChange={setEditorContent} />
      </div>

      <div className="flex justify-end space-x-2">
        <Button text={"작성하기"} onClick={writeArticle} />
        <Button text={"삭제하기"} onClick={() => navigate(-1)} />
      </div>
    </div>
  )
}

export default Report
