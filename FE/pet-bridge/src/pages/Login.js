import {Link} from "react-router-dom"

const Login = () => {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <section className="flex flex-col items-center">
        <div className="size-[600px] rounded-lg border	">
          <Link to="/">Home</Link>
        </div>
      </section>
    </div>
  )
}

export default Login
