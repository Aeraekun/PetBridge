import MainShelterCard from "./MainShelterCard"

const MainShelterContainer = () => {
  const items = [
    {
      desertionNo: "429360202400644",
      filename:
        "http://www.animal.go.kr/files/shelter/2024/07/202408011708270_s.jpg",
      happenDt: "20240801",
      happenPlace: "서구 풍암동",
      kindCd: "[고양이] 한국 고양이",
      colorCd: "검정+갈색+흰색",
      age: "2024(60일미만)(년생)",
      weight: "0.13(Kg)",
      noticeNo: "광주-서구-2024-00254",
      noticeSdt: "20240731",
      noticeEdt: "20240731",
      popfile:
        "http://www.animal.go.kr/files/shelter/2024/07/202408011708270.jpg",
      processState: "보호중",
      sexCd: "M",
      neuterYn: "N",
      specialMark: "24-7683",
      careNm: "광주 동물보호소",
      careTel: "062-571-2808",
      careAddr: "광주광역시 북구 본촌마을길 27 (본촌동) 광주광역시 동물보호소",
      orgNm: "광주광역시 서구",
      chargeNm: "광주광역시 서구",
      officetel: "0623607684",
    },
    {
      desertionNo: "429360202400643",
      filename:
        "http://www.animal.go.kr/files/shelter/2024/07/202408011708769_s.jpg",
      happenDt: "20240801",
      happenPlace: "서구 풍암동",
      kindCd: "[고양이] 한국 고양이",
      colorCd: "검정+갈색+흰색",
      age: "2024(60일미만)(년생)",
      weight: "0.16(Kg)",
      noticeNo: "광주-서구-2024-00253",
      noticeSdt: "20240731",
      noticeEdt: "20240731",
      popfile:
        "http://www.animal.go.kr/files/shelter/2024/07/202408011708769.jpg",
      processState: "보호중",
      sexCd: "M",
      neuterYn: "U",
      specialMark: "24-7682",
      careNm: "광주 동물보호소",
      careTel: "062-571-2808",
      careAddr: "광주광역시 북구 본촌마을길 27 (본촌동) 광주광역시 동물보호소",
      orgNm: "광주광역시 서구",
      chargeNm: "광주광역시 서구",
      officetel: "0623607684",
    },
    {
      desertionNo: "429362202400705",
      filename:
        "http://www.animal.go.kr/files/shelter/2024/07/202407311707854[1]_s.jpg",
      happenDt: "20240731",
      happenPlace: "북구 각화동",
      kindCd: "[고양이] 한국 고양이",
      colorCd: "흰색+노랑",
      age: "2024(60일미만)(년생)",
      weight: "0.44(Kg)",
      noticeNo: "광주-북구-2024-00465",
      noticeSdt: "20240730",
      noticeEdt: "20240730",
      popfile:
        "http://www.animal.go.kr/files/shelter/2024/07/202407311707854[1].jpg",
      processState: "보호중",
      sexCd: "M",
      neuterYn: "N",
      specialMark: "24-7680",
      careNm: "광주 동물보호소",
      careTel: "062-571-2808",
      careAddr: "광주광역시 북구 본촌마을길 27 (본촌동) 광주광역시 동물보호소",
      orgNm: "광주광역시 북구",
      chargeNm: "김이연",
      officetel: "062-410-6557",
    },
    {
      desertionNo: "429359202400339",
      filename:
        "http://www.animal.go.kr/files/shelter/2024/07/202407311707854_s.jpg",
      happenDt: "20240731",
      happenPlace: "동구 동명동",
      kindCd: "[고양이] 한국 고양이",
      colorCd: "검정+갈색+흰색",
      age: "2024(60일미만)(년생)",
      weight: "0.67(Kg)",
      noticeNo: "광주-동구-2024-00142",
      noticeSdt: "20240730",
      noticeEdt: "20240730",
      popfile:
        "http://www.animal.go.kr/files/shelter/2024/07/202407311707854.jpg",
      processState: "보호중",
      sexCd: "M",
      neuterYn: "N",
      specialMark: "24-7679",
      careNm: "광주 동물보호소",
      careTel: "062-571-2808",
      careAddr: "광주광역시 북구 본촌마을길 27 (본촌동) 광주광역시 동물보호소",
      orgNm: "광주광역시 동구",
      chargeNm: "동구",
      officetel: "0626082706",
    },
    {
      desertionNo: "429361202400351",
      filename:
        "http://www.animal.go.kr/files/shelter/2024/07/20240731130794_s.jpg",
      happenDt: "20240731",
      happenPlace: "남구 진월동",
      kindCd: "[고양이] 한국 고양이",
      colorCd: "검정+갈색+흰색",
      age: "2024(년생)",
      weight: "0.7(Kg)",
      noticeNo: "광주-남구-2024-00253",
      noticeSdt: "20240730",
      noticeEdt: "20240730",
      popfile:
        "http://www.animal.go.kr/files/shelter/2024/07/20240731130794.jpg",
      processState: "보호중",
      sexCd: "F",
      neuterYn: "N",
      specialMark: "24-7678/기립불가",
      careNm: "광주 동물보호소",
      careTel: "062-571-2808",
      careAddr: "광주광역시 북구 본촌마을길 27 (본촌동) 광주광역시 동물보호소",
      orgNm: "광주광역시 남구",
      chargeNm: "나소은",
      officetel: "062-607-2754",
    },
    {
      desertionNo: "429362202400702",
      filename:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301807405_s.jpg",
      happenDt: "20240730",
      happenPlace: "북구 유동",
      kindCd: "[고양이] 한국 고양이",
      colorCd: "검정+노랑+흰색",
      age: "2024(60일미만)(년생)",
      weight: "0.15(Kg)",
      noticeNo: "광주-북구-2024-00462",
      noticeSdt: "20240729",
      noticeEdt: "20240729",
      popfile:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301807405.jpg",
      processState: "보호중",
      sexCd: "M",
      neuterYn: "N",
      specialMark: "24-7677",
      careNm: "광주 동물보호소",
      careTel: "062-571-2808",
      careAddr: "광주광역시 북구 본촌마을길 27 (본촌동) 광주광역시 동물보호소",
      orgNm: "광주광역시 북구",
      chargeNm: "김이연",
      officetel: "062-410-6557",
    },
    {
      desertionNo: "429362202400701",
      filename:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301807703_s.jpg",
      happenDt: "20240730",
      happenPlace: "북구 유동",
      kindCd: "[고양이] 한국 고양이",
      colorCd: "검정+갈색+흰색",
      age: "2024(60일미만)(년생)",
      weight: "0.15(Kg)",
      noticeNo: "광주-북구-2024-00461",
      noticeSdt: "20240729",
      noticeEdt: "20240729",
      popfile:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301807703.jpg",
      processState: "보호중",
      sexCd: "M",
      neuterYn: "N",
      specialMark: "24-7676",
      careNm: "광주 동물보호소",
      careTel: "062-571-2808",
      careAddr: "광주광역시 북구 본촌마을길 27 (본촌동) 광주광역시 동물보호소",
      orgNm: "광주광역시 북구",
      chargeNm: "김이연",
      officetel: "062-410-6557",
    },
    {
      desertionNo: "429362202400700",
      filename:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301807794_s.jpg",
      happenDt: "20240730",
      happenPlace: "북구 유동",
      kindCd: "[고양이] 한국 고양이",
      colorCd: "검정+노랑+흰색",
      age: "2024(60일미만)(년생)",
      weight: "0.13(Kg)",
      noticeNo: "광주-북구-2024-00460",
      noticeSdt: "20240729",
      noticeEdt: "20240729",
      popfile:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301807794.jpg",
      processState: "보호중",
      sexCd: "M",
      neuterYn: "N",
      specialMark: "24-7675",
      careNm: "광주 동물보호소",
      careTel: "062-571-2808",
      careAddr: "광주광역시 북구 본촌마을길 27 (본촌동) 광주광역시 동물보호소",
      orgNm: "광주광역시 북구",
      chargeNm: "김이연",
      officetel: "062-410-6557",
    },
    {
      desertionNo: "429362202400699",
      filename:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301707721_s.jpg",
      happenDt: "20240730",
      happenPlace: "북구 유동",
      kindCd: "[고양이] 한국 고양이",
      colorCd: "검정+갈색+흰색",
      age: "2024(60일미만)(년생)",
      weight: "0.13(Kg)",
      noticeNo: "광주-북구-2024-00459",
      noticeSdt: "20240729",
      noticeEdt: "20240729",
      popfile:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301707721.jpg",
      processState: "보호중",
      sexCd: "M",
      neuterYn: "N",
      specialMark: "24-7674",
      careNm: "광주 동물보호소",
      careTel: "062-571-2808",
      careAddr: "광주광역시 북구 본촌마을길 27 (본촌동) 광주광역시 동물보호소",
      orgNm: "광주광역시 북구",
      chargeNm: "김이연",
      officetel: "062-410-6557",
    },
    {
      desertionNo: "429362202400698",
      filename:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301707893_s.jpg",
      happenDt: "20240730",
      happenPlace: "북구 유동",
      kindCd: "[고양이] 한국 고양이",
      colorCd: "검정+갈색+흰색",
      age: "2024(60일미만)(년생)",
      weight: "0.14(Kg)",
      noticeNo: "광주-북구-2024-00458",
      noticeSdt: "20240729",
      noticeEdt: "20240729",
      popfile:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301707893.jpg",
      processState: "보호중",
      sexCd: "M",
      neuterYn: "N",
      specialMark: "24-7673",
      careNm: "광주 동물보호소",
      careTel: "062-571-2808",
      careAddr: "광주광역시 북구 본촌마을길 27 (본촌동) 광주광역시 동물보호소",
      orgNm: "광주광역시 북구",
      chargeNm: "김이연",
      officetel: "062-410-6557",
    },
    {
      desertionNo: "429363202400827",
      filename:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301707159_s[1].jpg",
      happenDt: "20240730",
      happenPlace: "광산구 비아동",
      kindCd: "[고양이] 한국 고양이",
      colorCd: "흰색+노랑",
      age: "2024(년생)",
      weight: "1.1(Kg)",
      noticeNo: "광주-광산-2024-00520",
      noticeSdt: "20240729",
      noticeEdt: "20240729",
      popfile:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301707159.jpg",
      processState: "보호중",
      sexCd: "M",
      neuterYn: "N",
      specialMark: "24-7671",
      careNm: "광주 동물보호소",
      careTel: "062-571-2808",
      careAddr: "광주광역시 북구 본촌마을길 27 (본촌동) 광주광역시 동물보호소",
      orgNm: "광주광역시 광산구",
      chargeNm: "박샘",
      officetel: "062-960-8513",
    },
    {
      desertionNo: "429361202400350",
      filename:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301707812_s.jpg",
      happenDt: "20240730",
      happenPlace: "남구 화장동",
      kindCd: "[고양이] 한국 고양이",
      colorCd: "검정+노랑+흰색",
      age: "2024(60일미만)(년생)",
      weight: "0.28(Kg)",
      noticeNo: "광주-남구-2024-00252",
      noticeSdt: "20240729",
      noticeEdt: "20240729",
      popfile:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301707812.jpg",
      processState: "보호중",
      sexCd: "F",
      neuterYn: "N",
      specialMark: "24-7670",
      careNm: "광주 동물보호소",
      careTel: "062-571-2808",
      careAddr: "광주광역시 북구 본촌마을길 27 (본촌동) 광주광역시 동물보호소",
      orgNm: "광주광역시 남구",
      chargeNm: "나소은",
      officetel: "062-607-2754",
    },
    {
      desertionNo: "429361202400349",
      filename:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301707520[1]_s.jpg",
      happenDt: "20240730",
      happenPlace: "남구 화장동",
      kindCd: "[고양이] 한국 고양이",
      colorCd: "노랑+흰색",
      age: "2024(60일미만)(년생)",
      weight: "0.24(Kg)",
      noticeNo: "광주-남구-2024-00251",
      noticeSdt: "20240729",
      noticeEdt: "20240729",
      popfile:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301707520[1].jpg",
      processState: "보호중",
      sexCd: "F",
      neuterYn: "N",
      specialMark: "24-0669",
      careNm: "광주 동물보호소",
      careTel: "062-571-2808",
      careAddr: "광주광역시 북구 본촌마을길 27 (본촌동) 광주광역시 동물보호소",
      orgNm: "광주광역시 남구",
      chargeNm: "나소은",
      officetel: "062-607-2754",
    },
    {
      desertionNo: "429361202400348",
      filename:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301707886_s.jpg",
      happenDt: "20240730",
      happenPlace: "남구 화장동",
      kindCd: "[고양이] 한국 고양이",
      colorCd: "흰색+노랑+검정",
      age: "2024(60일미만)(년생)",
      weight: "0.28(Kg)",
      noticeNo: "광주-남구-2024-00250",
      noticeSdt: "20240729",
      noticeEdt: "20240729",
      popfile:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301707886.jpg",
      processState: "보호중",
      sexCd: "F",
      neuterYn: "N",
      specialMark: "24-7668",
      careNm: "광주 동물보호소",
      careTel: "062-571-2808",
      careAddr: "광주광역시 북구 본촌마을길 27 (본촌동) 광주광역시 동물보호소",
      orgNm: "광주광역시 남구",
      chargeNm: "나소은",
      officetel: "062-607-2754",
    },
    {
      desertionNo: "445473202400484",
      filename:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301607683_s.jpg",
      happenDt: "20240730",
      happenPlace: "진안읍 평촌길 1-19 부근",
      kindCd: "[고양이] 믹스묘",
      colorCd: "검갈색",
      age: "2024(60일미만)(년생)",
      weight: "0.5(Kg)",
      noticeNo: "전북-진안-2024-00145",
      noticeSdt: "20240729",
      noticeEdt: "20240729",
      popfile:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301607683.jpg",
      processState: "보호중",
      sexCd: "Q",
      neuterYn: "U",
      specialMark: "피부염약간",
      careNm: "진안군유기동물보호소",
      careTel: "063-430-8174",
      careAddr: "전북특별자치도 진안군 진안읍 예리길 36  .",
      orgNm: "전북특별자치도 진안군",
      chargeNm: "최고은",
      officetel: "063-430-8174",
    },
    {
      desertionNo: "429359202400337",
      filename:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301207974_s.jpg",
      happenDt: "20240730",
      happenPlace: "동구 대의동",
      kindCd: "[고양이] 한국 고양이",
      colorCd: "흰색",
      age: "2024(60일미만)(년생)",
      weight: "0.7(Kg)",
      noticeNo: "광주-동구-2024-00140",
      noticeSdt: "20240729",
      noticeEdt: "20240729",
      popfile:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301207974.jpg",
      processState: "보호중",
      sexCd: "F",
      neuterYn: "N",
      specialMark: "24-7667 /우측 전지 손실",
      careNm: "광주 동물보호소",
      careTel: "062-571-2808",
      careAddr: "광주광역시 북구 본촌마을길 27 (본촌동) 광주광역시 동물보호소",
      orgNm: "광주광역시 동구",
      chargeNm: "동구",
      officetel: "0626082706",
    },
    {
      desertionNo: "429359202400336",
      filename:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301207909_s.jpg",
      happenDt: "20240730",
      happenPlace: "동구 대의동",
      kindCd: "[고양이] 한국 고양이",
      colorCd: "갈색",
      age: "2024(60일미만)(년생)",
      weight: "0.8(Kg)",
      noticeNo: "광주-동구-2024-00139",
      noticeSdt: "20240729",
      noticeEdt: "20240729",
      popfile:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301207909.jpg",
      processState: "보호중",
      sexCd: "F",
      neuterYn: "N",
      specialMark: "24-7666",
      careNm: "광주 동물보호소",
      careTel: "062-571-2808",
      careAddr: "광주광역시 북구 본촌마을길 27 (본촌동) 광주광역시 동물보호소",
      orgNm: "광주광역시 동구",
      chargeNm: "동구",
      officetel: "0626082706",
    },
    {
      desertionNo: "429359202400335",
      filename:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301207802_s.jpg",
      happenDt: "20240730",
      happenPlace: "동구 대의동",
      kindCd: "[고양이] 한국 고양이",
      colorCd: "흰색",
      age: "2024(년생)",
      weight: "1.8(Kg)",
      noticeNo: "광주-동구-2024-00138",
      noticeSdt: "20240729",
      noticeEdt: "20240729",
      popfile:
        "http://www.animal.go.kr/files/shelter/2024/07/202407301207802.jpg",
      processState: "보호중",
      sexCd: "M",
      neuterYn: "N",
      specialMark: "24-7665",
      careNm: "광주 동물보호소",
      careTel: "062-571-2808",
      careAddr: "광주광역시 북구 본촌마을길 27 (본촌동) 광주광역시 동물보호소",
      orgNm: "광주광역시 동구",
      chargeNm: "동구",
      officetel: "0626082706",
    },
  ]

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5)
  }

  const shuffledItems = shuffleArray([...items])

  return (
    <div>
      {/* 보호소 동물 */}
      <section className="flex flex-col items-center">
        <p className="text-4xl font-bold">가족을 기다리고 있어요</p>
        <ul className="flex h-[450px] w-[1000px] flex-col flex-wrap space-x-5 overflow-y-hidden overflow-x-scroll p-5">
          {items.map((item) => (
            <MainShelterCard
              key={item.desertionNo}
              noticeNo={item.noticeNo}
              sexCd={item.sexCd}
              filename={item.filename}
              kindCd={item.kindCd}
              cardNm={item.cardNm}
            />
          ))}
        </ul>
      </section>
      {/* 펫픽 */}
      <section className="flex flex-col items-center">
        <p className="text-4xl font-bold">펫픽</p>
        <ul className="flex h-[450px] w-[1000px] flex-col flex-wrap-reverse space-x-5 overflow-y-hidden overflow-x-scroll p-5">
          {items.map((item) => (
            <MainShelterCard
              key={item.desertionNo}
              noticeNo={item.noticeNo}
              sexCd={item.sexCd}
              filename={item.filename}
              kindCd={item.kindCd}
              cardNm={item.cardNm}
            />
          ))}
        </ul>
      </section>
      {/* 임시 보호 동물 */}
      <section className="flex flex-col items-center">
        <p className="text-4xl font-bold">새 가족을 찾고 있어요</p>
        <ul className="flex h-[450px] w-[1000px] flex-col flex-wrap space-x-5 overflow-y-hidden overflow-x-scroll p-5">
          {shuffledItems.map((item) => (
            <MainShelterCard
              key={item.desertionNo}
              noticeNo={item.noticeNo}
              sexCd={item.sexCd}
              filename={item.filename}
              kindCd={item.kindCd}
              cardNm={item.cardNm}
            />
          ))}
        </ul>
      </section>
    </div>
  )
}

export default MainShelterContainer
