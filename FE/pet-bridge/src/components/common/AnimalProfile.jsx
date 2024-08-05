/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

// const TagAnimalItem = ({data, isSelected, onSelect}) => {
//   return (
//     <card
//       className={`flex h-24 w-full justify-between space-x-2 bg-gray-400 p-3 hover:bg-gray-700  ${isSelected ? "bg-gray-700" : "bg-gray-400"}`}
//       onClick={onSelect}
//     >
//       <div className="flex w-full space-x-3">
//         <div className="flex flex-col justify-center">
//           <img
//             src={data.filename}
//             className="w-16  object-cover"
//             alt="animalImage"
//           />
//         </div>
//         <tr className=" flex flex-col space-y-0 overflow-hidden">
//           <div className=" flex ">
//             <div className="mr-3 w-20">이름</div>
//             <div className="w-full ">{data.name}</div>
//           </div>
//           <div className=" flex ">
//             <div className="mr-3 w-20 ">공고번호</div>
//             <div className="w-full ">{data.notice_no}</div>
//           </div>
//           <div className=" flex ">
//             <div className="mr-3 w-20">성별</div>
//             <div className="w-full ">{data.sex_cd}</div>
//           </div>
//           <div className=" flex ">
//             <div className="mr-3 w-20">나이</div>
//             <div className="w-full ">{data.age}</div>
//           </div>
//           <div className=" flex ">
//             <div className="mr-3 w-20">특징</div>
//             <div className="w-full ">{data.notice_comment}</div>
//           </div>
//         </tr>
//       </div>
//     </card>
//   )
// }

const AnimalProfile = ({data, isSelected, onSelect}) => {
  return (
    <div className="p-4">
      <div className="mb-4 flex h-8 items-center justify-around space-x-2.5 ">
        <div
          className={`flex h-24 w-full justify-between space-x-2 rounded bg-gray-300 p-3 hover:bg-gray-700  ${isSelected ? "bg-red-700" : "bg-gray-300"}`}
          onClick={onSelect}
        >
          <div className="flex w-full space-x-3">
            <div className="flex flex-col justify-center">
              <img
                src={data.filename}
                className="w-16  object-cover"
                alt="animalImage"
              />
            </div>
            <div className=" flex flex-col space-y-0 overflow-hidden">
              <div className=" flex ">
                <div className="mr-3 w-20">이름</div>
                <div className="w-full ">{data.name}</div>
              </div>
              <div className=" flex ">
                <div className="mr-3 w-20 ">공고번호</div>
                <div className="w-full ">{data.notice_no}</div>
              </div>
              <div className=" flex ">
                <div className="mr-3 w-20">성별</div>
                <div className="w-full ">{data.sex_cd}</div>
              </div>
              <div className=" flex ">
                <div className="mr-3 w-20">나이</div>
                <div className="w-full ">{data.age}</div>
              </div>
              <div className=" flex ">
                <div className="mr-3 w-20">특징</div>
                <div className="w-full ">{data.notice_comment}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" text-overflow hover:text-clip">{data.title}</div>
    </div>
  )
}
export default AnimalProfile
