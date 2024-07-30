import React from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css" // Quill's styles

const Editor = ({value, onChange}) => {
  const modules = {
    toolbar: [
      [{header: "1"}, {header: "2"}, {font: []}],
      [{list: "ordered"}, {list: "bullet"}],
      ["bold", "italic", "underline"],
      [{color: []}, {background: []}],
      [{align: []}],
      ["link", "image"],
      ["clean"],
    ],
  }
  const editorStyle = {
    height: "500px", // 원하는 높이로 설정
    width: "100%", // 원하는 너비로 설정
  }
  return (
    <div>
      <ReactQuill
        value={value}
        theme="snow"
        style={editorStyle}
        modules={modules}
        onChange={onChange}
      />
      {/* <div>
        <h3>Preview</h3>
        <div dangerouslySetInnerHTML={{__html: value}} />
      </div> */}
    </div>
  )
}

export default Editor
