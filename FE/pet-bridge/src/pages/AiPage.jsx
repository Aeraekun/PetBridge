import {NavLink, Outlet} from "react-router-dom"

const AiPage = () => {
  let itemId = 0
  const navItems = [
    {id: itemId++, category: "안구 건강 진단하기", to: "eyes"},
    {id: itemId++, category: "피부 건강 진단하기", to: "skin"},
  ]
  return (
    <section className="flex min-h-[1000px] w-[1000px] flex-col items-center">
      <span className="text-6xl font-bold">AiPage</span>
      <p>키우고 있거나 입양을 하려는 반려동물의 건강이 염려되시나요?</p>
      <p>AI를 통해 동물의 건강을 진단해보세요</p>
      <nav className="m-5 flex space-x-5">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            className={({isActive}) =>
              `p-2.5 rounded-xl ${isActive ? "bg-yellow" : ""}`
            }
          >
            {item.category}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </section>
  )
}

export default AiPage
