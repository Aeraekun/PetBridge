import React, {useState} from "react"

const SECRET_KEY = process.env.REACT_APP_GPT_API_KEY
import AnimalBoardList from "components/recommendation/ProposedBoardList"
import foreverBuddyImg from "assets/image/함께하는 베프.png" // 예시로 PNG 파일로 대체
import chillGuardianImg from "assets/image/쿨한 독립러.png"
import cozyCompanionImg from "assets/image/편안한 소울메이트.png"
import affectionistaImg from "assets/image/애정 듬뿍러.png"

const images = {
  "함께하는 베프": foreverBuddyImg,
  "쿨한 독립러": chillGuardianImg,
  "편안한 소울메이트": cozyCompanionImg,
  "애정 듬뿍러": affectionistaImg,
}

const contents = {
  "함께하는 베프": "반려동물과 늘 함께하며 모든 순간을 함께 나누는 사람.",
  "쿨한 독립러":
    "반려동물과 서로의 독립성을 존중하며, 적당한 거리를 유지하는 사람.",
  "편안한 소울메이트":
    "반려동물과 집에서 편안하고 아늑한 시간을 보내는 것을 좋아하는 사람.",
  "애정 듬뿍러":
    "반려동물에게 아낌없이 사랑을 주며, 애정 표현을 중요시하는 사람.",
}

const detailContents = {
  "함께하는 베프": [
    "이 유형의 사람들은 반려동물을 가족의 일원으로 생각하며, 가능한 한 모든 활동을 반려동물과 함께 하려고 합니다.",
    "외출할 때도 반려동물을 동반하며, 여행, 산책, 쇼핑 등 어디든 함께 갑니다.",
    "반려동물의 건강과 행복을 최우선으로 생각하며, 정기적인 운동과 건강 관리에도 적극적입니다.",
    "강아지나 고양이와 같은 동물을 대상으로, 다양한 훈련이나 놀이를 통해 강한 유대감을 형성합니다.",
    "반려동물과의 교감을 중요시하며, 그들과의 시간을 소중히 여깁니다.",
  ],
  "쿨한 독립러": [
    "이 유형의 사람들은 반려동물과의 관계에서 독립성을 중요시합니다.",
    "반려동물에게 충분한 자유를 주며, 집 안에서나 밖에서 독립적으로 활동할 수 있는 환경을 제공합니다.",
    "반려동물이 혼자서도 잘 지낼 수 있도록 훈련하며, 스스로 시간을 보내는 것을 존중합니다.",
    "사람과 반려동물이 각자의 시간을 보낼 수 있도록 하면서도, 필요할 때 서로에게 다가가는 균형 잡힌 관계를 추구합니다.",
    "고양이나 독립성이 강한 견종을 선호하는 경향이 있습니다.",
  ],
  "편안한 소울메이트": [
    "이 유형의 사람들은 집에서 반려동물과 함께 보내는 조용하고 평화로운 시간을 즐깁니다.",
    "반려동물과 함께 책을 읽거나 영화를 보며, 소파에서 함께 쉬는 것을 좋아합니다.",
    "따뜻하고 아늑한 공간을 만들고, 반려동물이 편히 쉴 수 있는 침대나 쿠션을 준비해줍니다.",
    "활기찬 활동보다는 느긋하고 편안한 시간을 선호하며, 반려동물에게도 그러한 환경을 제공하려고 합니다.",
    "차분하고 온순한 성격의 반려동물을 선호하며, 그들과의 조용한 교감을 즐깁니다.",
  ],
  "애정 듬뿍러": [
    "이 유형의 사람들은 반려동물에게 끊임없는 사랑과 관심을 쏟으며, 애정 표현을 매우 중요하게 생각합니다.",
    "반려동물을 자주 안아주고 쓰다듬으며, 그들에게 말이나 행동으로 애정을 자주 표현합니다.",
    "반려동물과의 상호작용을 즐기며, 그들이 자신에게 보여주는 애정에도 크게 기뻐합니다.",
    "반려동물을 위한 특별한 간식이나 장난감을 자주 준비해 주고, 그들의 기분을 살피며 언제나 최선을 다해 돌봅니다.",
    "반려동물과의 깊은 유대감을 느끼며, 사랑스럽고 애교 많은 성격의 반려동물을 선호합니다.",
  ],
}

// 질문 리스트
const questions = [
  {
    id: 1,
    question: "어떤 종류의 반려동물을 입양하고 싶으신가요?",
    options: ["강아지", "고양이"],
  },
  {
    id: 2,
    question: "반려동물을 키운 경험이 있으신가요?",
    options: ["예, 많습니다", "조금 있습니다", "전혀 없습니다"],
  },
  {
    id: 3,
    question: "매일 반려동물과 함께 할 수 있는 시간은 어느 정도인가요?",
    options: ["3시간 미만", "3시간 ~ 6시간", "6시간 이상"],
  },
  {
    id: 4,
    question: "반려동물과 함께 지낼 생활 공간은 어느 정도인가요?",
    options: [
      "소형 (원룸, 소형 주택)",
      "중형 (일반적인 아파트, 주택)",
      "대형 (큰 주택, 마당 있는 집)",
    ],
  },
  {
    id: 5,
    question: "선호하시는 반려동물의 크기는 어느 정도인가요?",
    options: [
      "소형 (작고 귀여운 품종)",
      "중형 (적당한 크기의 품종)",
      "대형 (크고 당당한 품종)",
    ],
  },
  {
    id: 6,
    question: "반려동물의 성격 중 가장 중요하다고 생각하시는 부분은?",
    options: [
      "활발하고 외향적인 성격",
      "차분하고 독립적인 성격",
      "사랑스럽고 애교 많은 성격",
    ],
  },
]

// Chatbot 컴포넌트
const Chatbot = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [showMore, setShowMore] = useState(false) // 더보기 상태
  const [selectedBreed, setSelectedBreed] = useState("") // 선택된 품종 상태

  const apiEndpoint = "https://api.openai.com/v1/chat/completions"

  const handleAnswerSelection = (option) => {
    const updatedAnswers = [
      ...answers,
      {question: questions[currentQuestion].question, answer: option},
    ]
    setAnswers(updatedAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleSendToGPT(updatedAnswers)
    }
  }

  const handleSendToGPT = async (answers) => {
    setLoading(true)
    const userMessage = answers
      .map((ans, index) => `[${index + 1}] ${ans.question}: ${ans.answer}`)
      .join("\n")

    const fullMessage = `${userMessage}\n\n해당 설문을 바탕으로, "함께하는 베프", "쿨한 독립러", "편안한 소울메이트", "애정 듬뿍러" 중 어울리는 유형을 하나 선택 해 주고, 추가로 나에게 맞는 반려동물 품종들을 추천해줘. 단, 추천 품종은 반드시 5종 이여야 하고, 그 중 포메라니안은 항상 포함되어야 해. 답변 형식은 json 형식으로 받고 싶어. "personality": "함께하는 베프", "kinds": 동물 종들 식으로. 예를 들어, 너가 줘야할 답변은 "{ "personality": "산책 러버", "kinds": [ "비숑프리제", "요크셔테리어", "보스턴테리어", "푸들", "파피용" ] }" 이런 식이야. 단, kinds의 동물 품종에서 띄어쓰기는 제외해줘. "비숑 프리제"면 "비숑프리제" 이런 식으로 들어오도록.`

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SECRET_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{role: "user", content: fullMessage}],
          max_tokens: 1024,
          temperature: 1,
        }),
      })

      const data = await response.json()
      const aiResponse = data.choices?.[0]?.message?.content || "No response"

      try {
        const parsedResponse = JSON.parse(aiResponse)
        console.log(parsedResponse)
        setResult(parsedResponse)
      } catch (error) {
        console.error("JSON parsing error:", error)
        setResult("오류 발생!")
      }
    } catch (error) {
      console.error("오류 발생!", error)
      setResult("오류 발생!")
    } finally {
      setLoading(false)
    }
  }

  const handleBreedSelection = (breed) => {
    setSelectedBreed(breed) // 선택된 품종명 설정
  }

  return (
    <div
      id="Chatbot"
      className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100"
    >
      <h1 className="mb-8 text-center text-6xl font-bold">집사 유형 검사</h1>
      {result ? (
        <>
          <div>
            <div className="flex w-full max-w-6xl rounded-lg bg-white p-8 text-center shadow-lg">
              {/* 왼쪽에 이미지 */}
              <div className="flex w-1/2 items-center justify-center">
                {result.personality && images[result.personality] && (
                  <img
                    src={images[result.personality]}
                    alt={result.personality}
                    className="w-112 h-112 object-cover"
                  />
                )}
              </div>
              {/* 오른쪽에 텍스트 정보 */}
              <div className="w-1/2 pl-8 text-left">
                <h3 className="mb-4 text-center text-3xl font-semibold">
                  ⭐{result.personality}⭐
                </h3>
                <p className="mb-6 text-2xl font-medium text-gray-800">
                  {contents[result.personality]}
                </p>
                {/* detailContents 출력 */}
                <ul className="mb-6 list-inside list-disc text-xl font-medium text-gray-700">
                  {detailContents[result.personality].map((detail, index) => (
                    <li key={index} className="mb-2">
                      {detail}
                    </li>
                  ))}
                </ul>
                {/* kinds 리스트 출력 */}
                <h3 className="mb-4 text-center text-3xl font-semibold">
                  추천 반려동물 품종
                </h3>
                <p className="text-center text-xl font-medium text-gray-800">
                  {result.kinds.join(", ")}
                </p>
              </div>
            </div>
            {/* 더보기 버튼과 내용 */}
            <div className="w-full max-w-6xl rounded-lg bg-white p-8 text-center shadow-lg">
              <button
                onClick={() => setShowMore(!showMore)}
                className="mt-4 rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
              >
                ▼ 등록 공고 확인
              </button>
              {/* 더보기 내용 */}
              {showMore && (
                <div className="mt-4 border-t border-gray-300 p-4">
                  <div className="flex flex-wrap justify-center gap-4">
                    {result.kinds.map((breed, index) => (
                      <button
                        key={index}
                        onClick={() => handleBreedSelection(breed)}
                        className="rounded-md bg-gray-200 px-4 py-2 text-lg text-gray-800 hover:bg-gray-300"
                      >
                        {breed}
                      </button>
                    ))}
                  </div>
                  {/* 선택된 품종명 표시 */}
                  {selectedBreed && (
                    <div className="mt-4">
                      <AnimalBoardList breed={selectedBreed} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="w-full max-w-6xl rounded-lg bg-white p-8 shadow-lg">
          {loading ? (
            <span className="text-2xl font-medium text-gray-600">
              추천 결과를 생성 중입니다...
            </span>
          ) : (
            <>
              {questions[currentQuestion] && (
                <>
                  <h2 className="mb-8 text-4xl font-semibold">
                    {questions[currentQuestion].question}
                  </h2>
                  <ul className="w-full">
                    {questions[currentQuestion].options.map((option, index) => (
                      <li key={index} className="mb-4">
                        <button
                          onClick={() => handleAnswerSelection(option)}
                          className="w-full rounded-md bg-blue-600 px-6 py-4 text-2xl text-white hover:bg-blue-700"
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Chatbot
