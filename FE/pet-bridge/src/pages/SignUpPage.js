import {Link} from "react-router-dom"
import Button from "components/common/Button"
import Input from "components/common/Input"

const SignUp = () => {
  return (
    <section className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
      <Link to="/">
        <Button text={"home"} />
      </Link>
      <div className="flex size-[600px] flex-col items-center rounded-lg border">
        <form className="flex h-[385px] w-[400px] flex-col">
          <Input type="email" placeholder="Email" id="email-input" />
          <Input type="password" placeholder="Password" id="password-input" />
        </form>
      </div>
    </section>
  )
}

export default SignUp
