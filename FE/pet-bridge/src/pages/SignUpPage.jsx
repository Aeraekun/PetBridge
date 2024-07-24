import SignUp from "components/users/SignUp"

const SignUpPage = () => {
  return (
    <section className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
      <div className="flex h-[700px] w-[600px] flex-col items-center rounded-lg border">
        <SignUp />
      </div>
    </section>
  )
}

export default SignUpPage
