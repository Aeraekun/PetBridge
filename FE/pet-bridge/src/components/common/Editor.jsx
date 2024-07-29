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

  return (
    <div>
      <ReactQuill
        value={value}
        theme="snow"
        modules={modules}
        onChange={onChange}
      />
      <div>
        <h3>Preview</h3>
        <div dangerouslySetInnerHTML={{__html: value}} />
      </div>
    </div>
  )
}

export default Editor
