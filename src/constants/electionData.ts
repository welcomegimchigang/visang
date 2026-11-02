export interface NavItem {
  label: string;
  href: string;
}

export interface IntroNode {
  id: string;
  label: string;
  subLabel: string;
  x: number;
  y: number;
  appearAt: number;
  isFinal?: boolean;
}

export interface IntroLine {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  startAt: number;
  endAt: number;
}

export interface Candidate {
  role: string;
  department: string;
  name: string;
  fullTitle: string;
  careers: string[];
}

export interface PledgeCategory {
  id: string;
  tabLabel: string;
  title: string;
  slogan: string;
  pledges: string[];
}

export interface SnsCard {
  id: string;
  title: string;
  description: string;
  actionText: string;
  url: string;
  toastMessage: string;
}

export interface ElectionInfo {
  badge: string;
  collegeBadge: string;
  teamHanja: string;
  teamKor: string;
  teamFullTitle: string;
  mainSlogan: string;
  bannerTopText: string;
  bannerBottomText: string;
}

export const ELECTION_INFO: ElectionInfo = {
  badge: "2027학년도 인천대학교 글로벌정경대학 학생회 선거",
  collegeBadge: "글로벌정경대학",
  teamHanja: "飛上",
  teamKor: "비상",
  teamFullTitle: "飛上 (비상)",
  mainSlogan: "비상: 함께 더 높이, 더 멀리",
  bannerTopText: "글로벌정경대학 학우들과 함께 날아오를 시간",
  bannerBottomText: "인천대학교 글로벌정경대학 학우를 위한 변화를 만들겠습니다",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "후보자", href: "#candidates" },
  { label: "공약", href: "#pledges" },
  { label: "SNS", href: "#sns" },
];

export const INTRO_NODES: IntroNode[] = [
  {
    id: "node-5",
    label: "5호관",
    subLabel: "자연과학대학",
    x: 66.8,
    y: 38.5,
    appearAt: 0.3,
  },
  {
    id: "node-13",
    label: "13호관",
    subLabel: "사회과학대학",
    x: 54.8,
    y: 26.2,
    appearAt: 1.2,
  },
  {
    id: "node-14",
    label: "14호관",
    subLabel: "글로벌정경대학·경영대학",
    x: 48.8,
    y: 20.2,
    appearAt: 2.1,
    isFinal: true,
  },
];

export const INTRO_LINES: IntroLine[] = [
  {
    id: "line-1",
    from: { x: 66.8, y: 38.5 },
    to: { x: 54.8, y: 26.2 },
    startAt: 0.5,
    endAt: 1.2,
  },
  {
    id: "line-2",
    from: { x: 54.8, y: 26.2 },
    to: { x: 48.8, y: 20.2 },
    startAt: 1.4,
    endAt: 2.1,
  },
];

export const CANDIDATES: Candidate[] = [
  {
    role: "정후보",
    department: "경제학과 21학번",
    name: "최우헌",
    fullTitle: "정후보 : 경제학과 21학번 최우헌",
    careers: [
      "2019년 일산대진고등학교 졸업",
      "2021년 인천대학교 경제학과 입학",
      "2023년 육군 제9사단 병장 만기전역",
      "2025년 인천대학교 경제학과 학생회장",
      "2025년 인천대학교 보궐선거 글로벌정경대학 중앙선거관리위원",
      "2025년 인천대학교 글로벌정경대학 비상대책위원장",
      "2026년 인천대학교 중앙동아리 인풋아웃풋 대외협력부장",
    ],
  },
  {
    role: "부후보",
    department: "정치외교학과 24학번",
    name: "손정현",
    fullTitle: "부후보 : 정치외교학과 24학번 손정현",
    careers: [
      "2024년 인천해송고등학교 졸업",
      "2024년 인천대학교 정치외교학과 입학",
      "2024년 인천대학교 정치외교학과 학생회 홍보국원",
      "2025년 인천대학교 정치외교학과 학생회 홍보국장",
      "2025년 인천대학교 정치외교학과 2과대",
      "2026년 인천대학교 정치외교학과 학생회장",
      "2026년 인천대학교 정치외교학과 선거관리위원",
    ],
  },
];

export const PLEDGE_CATEGORIES: PledgeCategory[] = [
  {
    id: "culture",
    tabLabel: "행사·문화·참여",
    title: "행사·문화·참여",
    slogan: "대학 생활을 더 풍성하게",
    pledges: [
      "글정경 개강총회 신설",
      "「글정경과 만남 추구」 신설",
      "타 단과대 연합행사 추진",
      "SSG 랜더스 단체관람 추진",
      "방학시즌 온라인 이벤트 신설",
      "체육대회 사전 홍보 강화 및 승부예측 이벤트 도입",
      "글정경 E-sports 대회 신설",
      "글정경 볼링대회 신설",
      "글정경 일일호프 확대",
      "글정경 할로윈 이벤트 개선",
      "글정경인의 밤 확대",
    ],
  },
  {
    id: "academic",
    tabLabel: "학업·진로",
    title: "학업·진로",
    slogan: "도전의 부담은 낮추고, 새로운 기회는 더 넓게",
    pledges: [
      "자격증 응시료 지원사업 추진",
      "영어졸업인증 응시료 지원사업 추진",
      "진로·산업 박람회 단체관람 지원",
      "진로·자격증 캘린더 운영",
    ],
  },
  {
    id: "welfare",
    tabLabel: "복지",
    title: "복지",
    slogan: "일상에서 체감할 수 있는 복지",
    pledges: [
      "「글정경 첫 명함」 지원사업 신설",
      "취업용 증명사진 촬영 지원사업 신설",
      "시험기간 밤샘키트 나눔 신설",
      "프린트 지원사업 신설",
      "학생물품 대여사업 재개 및 확대",
      "학위수여식 폴라로이드 사진 이벤트 확대",
      "예비군 알리미 유지 및 개선",
    ],
  },
  {
    id: "communication",
    tabLabel: "소통",
    title: "소통",
    slogan: "한 명 한 명의 목소리가 모여 만들어지는 글정경",
    pledges: [
      "1학년 학과(부) 대표자 정기간담회 신설",
      "학과 학생회와 학기별 정책간담회 신설",
      "글정경 익명 소통창구 신설",
      "융합자유전공대학 출신 학생 간담회 신설",
      "단과대운영위원회 회의록 공개",
      "글정경 익명 소통창구 개설",
    ],
  },
];

export const FLOATING_PDF = {
  pdfUrl: "",
  toastMessage: "공약안내서 PDF 준비 중입니다.",
};

export const SNS_CARDS: SnsCard[] = [
  {
    id: "instagram",
    title: "글로벌정경대학 선거운동본부 飛上",
    description: "공식 인스타그램 채널",
    actionText: "바로가기 >>>",
    url: "",
    toastMessage: "현재 오픈 준비 중입니다.",
  },
  {
    id: "pledge-pdf",
    title: "공약안내서",
    description: "요약은 홈페이지에서, 자세한 건 공약안내서에서 확인하세요",
    actionText: "바로가기 >>>",
    url: "",
    toastMessage: "현재 오픈 준비 중입니다.",
  },
  {
    id: "anonymous",
    title: "익명 소통창구",
    description: "학우 여러분의 소중한 의견을 들려주세요. 모든 의견은 익명입니다",
    actionText: "바로가기 >>>",
    url: "",
    toastMessage: "현재 오픈 준비 중입니다.",
  },
];

export const SNS_LINKS = {
  pdfUrl: "",
  cards: SNS_CARDS,
};
