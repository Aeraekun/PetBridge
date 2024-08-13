import {useNavigate} from "react-router-dom"
import Login from "assets/icons/icon-login.svg"

const LoginModalComponent = ({onClose}) => {
  const navigate = useNavigate()
  const loginHandler = () => {
    navigate("/users/login")
  }
  return (
    <div className="relative flex w-[300px] flex-col overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
      <div className="flex grow justify-center  bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex-col sm:items-start ">
          <div className="my-5 flex justify-center sm:w-full">
            <div className="mx-auto flex size-16 shrink-0 items-center justify-center rounded-full bg-point sm:mx-0 sm:size-16">
              <img src={Login} alt="Login Icon" />
            </div>
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left ">
            <h3
              className="my-12 text-center text-2xl font-bold leading-6 text-gray-900"
              id="modal-title"
            >
              로그인이 필요합니다
            </h3>
          </div>
        </div>
      </div>
      <div className="justify-center bg-gray-50 px-4 py-3 sm:flex sm:flex-row  sm:px-6">
        <button
          type="button"
          className="mr-3 inline-flex w-36 justify-center rounded-md bg-point p-3 text-base text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-36"
          onClick={loginHandler}
        >
          로그인 하러가기
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-36 justify-center rounded-md bg-white  py-3 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-36"
          onClick={onClose}
        >
          취소
        </button>
      </div>
    </div>
  )
}

export default LoginModalComponent
