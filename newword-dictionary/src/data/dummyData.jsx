// 🔹 신조어 데이터
export const dummySlangs = [
  {
    id: 1,
    title: "킹받다",
    summary: "매우 열받다, 화가 난다",
    tag: "유행어",
    definition: "매우 화가 나거나 짜증이 날 때 사용하는 표현. '킹'은 최고를 의미하는 접두사로 사용됨",
    examples: ["시험 망쳤어, 진짜 킹받네", "버스 놓쳐서 킹받는다"],
    pronunciation: "킹받다",
    origin: "온라인 커뮤니티에서 시작된 표현",
    likes: 152,
    isLiked: false,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "잼민이",
    summary: "어린 아이 또는 철없는 사람",
    tag: "유행어",
    definition: "재미있다는 뜻의 '잼'과 어린이를 뜻하는 '민이'를 합친 말. 주로 게임에서 어린 사용자를 가리킬 때 사용",
    examples: ["게임에 잼민이들이 너무 많아", "잼민이 같은 소리 하지 마"],
    pronunciation: "잼민이",
    origin: "온라인 게임 커뮤니티",
    likes: 98,
    isLiked: true,
    createdAt: "2024-01-14",
  },
  {
    id: 3,
    title: "ㅋㅋ",
    summary: "웃음을 표현하는 말",
    tag: "인터넷",
    definition: "키보드의 'ㅋ'을 반복하여 웃음을 표현하는 인터넷 용어",
    examples: ["그거 진짜 웃기네 ㅋㅋㅋ", "ㅋㅋ 맞다"],
    pronunciation: "크크, 키키",
    origin: "PC통신 시대부터 사용",
    likes: 203,
    isLiked: false,
    createdAt: "2024-01-13",
  },
  {
    id: 4,
    title: "갓생",
    summary: "God + 생활, 완벽한 삶",
    tag: "유행어",
    definition: "'갓(God)'과 '생활'을 합친 말로, 매우 완벽하고 이상적인 생활을 의미",
    examples: ["오늘부터 갓생 살아야지", "갓생러가 되고 싶어"],
    pronunciation: "갓생",
    origin: "소셜미디어에서 확산",
    likes: 189,
    isLiked: true,
    createdAt: "2024-01-12",
  },
  {
    id: 5,
    title: "힘듦",
    summary: "힘들다의 줄임말",
    tag: "인터넷",
    definition: "'힘들다'를 줄여서 표현한 인터넷 용어",
    examples: ["오늘 하루 너무 힘듦", "과제하기 힘듦"],
    pronunciation: "힘듦",
    origin: "온라인 채팅, 댓글에서 사용",
    likes: 67,
    isLiked: false,
    createdAt: "2024-01-11",
  },
  {
    id: 6,
    title: "YOLO",
    summary: "You Only Live Once",
    tag: "Z세대",
    definition: "인생은 한 번뿐이라는 의미로, 현재를 즐기자는 철학을 담은 표현",
    examples: ["YOLO! 오늘은 맛있는 거 먹자", "YOLO 정신으로 여행 떠났어"],
    pronunciation: "욜로",
    origin: "서구 문화에서 유입",
    likes: 134,
    isLiked: true,
    createdAt: "2024-01-10",
  },
  {
    id: 7,
    title: "TMI",
    summary: "Too Much Information",
    tag: "Z세대",
    definition: "너무 많은 정보, 또는 굳이 알려주지 않아도 될 개인적인 정보를 의미",
    examples: ["TMI지만 오늘 라면 먹었어", "이건 TMI인가?"],
    pronunciation: "티엠아이",
    origin: "영어 줄임말에서 유래",
    likes: 176,
    isLiked: false,
    createdAt: "2024-01-09",
  },
  {
    id: 8,
    title: "소확행",
    summary: "소소하지만 확실한 행복",
    tag: "유행어",
    definition: "작고 소소하지만 확실하게 느낄 수 있는 행복을 의미",
    examples: ["아침 커피 한 잔이 나의 소확행", "소확행을 찾는 중"],
    pronunciation: "소확행",
    origin: "일본 소설에서 유래",
    likes: 245,
    isLiked: true,
    createdAt: "2024-01-08",
  },
];

// 🔹 태그 데이터
export const dummyTags = [
  { id: 1, name: "유행어", count: 4 },
  { id: 2, name: "인터넷", count: 2 },
  { id: 3, name: "Z세대", count: 2 },
];

// 🔹 사용자 데이터
export const dummyUser = {
  id: 1,
  nickname: "테스트유저",
  email: "test@example.com",
  profileImage: null,
  joinDate: "2023-12-01",
  activityData: [
    { date: "2024-01-20", solved: true },
    { date: "2024-01-19", solved: false },
    { date: "2024-01-18", solved: true },
    { date: "2024-01-17", solved: true },
    { date: "2024-01-16", solved: false },
    { date: "2024-01-15", solved: true },
    { date: "2024-01-14", solved: true },
    { date: "2024-01-13", solved: false },
    { date: "2024-01-12", solved: true },
    { date: "2024-01-11", solved: true },
    { date: "2024-01-10", solved: false },
    { date: "2024-01-09", solved: true },
    { date: "2024-01-08", solved: true },
    { date: "2024-01-07", solved: false },
    { date: "2024-01-06", solved: true },
  ],
};

// 🔹 일일 퀴즈 데이터
export const dummyQuizzes = [
  {
    id: 1,
    date: "1월 20일 퀴즈",
    question: "다음 중 '갓생'의 의미로 올바른 것은?",
    options: [
      "신과 같은 삶",
      "갓 태어난 삶",
      "완벽한 삶",
      "새로운 삶"
    ],
    correctAnswer: "완벽한 삶",
    explanation: "'갓생'은 '갓(God) + 생활'의 줄임말로, 완벽하고 이상적인 삶을 의미합니다.",
    wordId: 4,
  },
  {
    id: 2,
    date: "1월 19일 퀴즈",
    question: "다음 중 'TMI'의 정확한 뜻은?",
    options: [
      "Tell Me Information",
      "Too Much Information",
      "Time Management Issue",
      "Technical Method Info"
    ],
    correctAnswer: "Too Much Information",
    explanation: "TMI는 'Too Much Information'의 줄임말로, 굳이 알려주지 않아도 될 개인적인 정보를 의미합니다.",
    wordId: 7,
  },
];

// 🔹 사용자가 좋아요 누른 신조어 목록
export const dummyLikedSlangs = [
  {
    id: 2,
    title: "잼민이",
    summary: "어린 아이 또는 철없는 사람",
    tag: "유행어",
    likedAt: "2024-01-18",
  },
  {
    id: 4,
    title: "갓생",
    summary: "God + 생활, 완벽한 삶", 
    tag: "유행어",
    likedAt: "2024-01-17",
  },
  {
    id: 6,
    title: "YOLO",
    summary: "You Only Live Once",
    tag: "Z세대",
    likedAt: "2024-01-15",
  },
  {
    id: 8,
    title: "소확행",
    summary: "소소하지만 확실한 행복",
    tag: "유행어",
    likedAt: "2024-01-14",
  },
];

// 🔹 사용자가 최근에 푼 퀴즈 목록
export const dummyRecentQuizzes = [
  {
    id: 1,
    date: "2024-01-20",
    question: "다음 중 '갓생'의 의미로 올바른 것은?",
    userAnswer: "완벽한 삶",
    correctAnswer: "완벽한 삶",
    isCorrect: true,
    wordTitle: "갓생",
    wordId: 4,
  },
  {
    id: 2,
    date: "2024-01-18",
    question: "다음 중 'TMI'의 정확한 뜻은?",
    userAnswer: "Tell Me Information",
    correctAnswer: "Too Much Information", 
    isCorrect: false,
    wordTitle: "TMI",
    wordId: 7,
  },
  {
    id: 3,
    date: "2024-01-17",
    question: "'킹받다'는 어떤 의미로 사용되는가?",
    userAnswer: "매우 화가 난다",
    correctAnswer: "매우 화가 난다",
    isCorrect: true,
    wordTitle: "킹받다",
    wordId: 1,
  },
];

// 🔹 더미 데이터 유틸리티 함수들
export const dummyDataUtils = {
  // 특정 태그로 신조어 필터링
  getSlangsByTag: (tag) => {
    return dummySlangs.filter(slang => slang.tag === tag);
  },

  // ID로 신조어 찾기
  getSlangById: (id) => {
    return dummySlangs.find(slang => slang.id === parseInt(id));
  },

  // 검색어로 신조어 찾기
  searchSlangs: (keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    return dummySlangs.filter(slang => 
      slang.title.toLowerCase().includes(lowerKeyword) ||
      slang.summary.toLowerCase().includes(lowerKeyword) ||
      slang.definition.toLowerCase().includes(lowerKeyword)
    );
  },

  // 랜덤 퀴즈 가져오기
  getRandomQuiz: () => {
    const randomIndex = Math.floor(Math.random() * dummyQuizzes.length);
    return dummyQuizzes[randomIndex];
  },

  // 사용자 통계 계산
  getUserStats: () => {
    const totalSolvedDays = dummyUser.activityData.filter(day => day.solved).length;
    const totalQuizzes = dummyRecentQuizzes.length;
    const correctAnswers = dummyRecentQuizzes.filter(quiz => quiz.isCorrect).length;
    const accuracy = totalQuizzes > 0 ? Math.round((correctAnswers / totalQuizzes) * 100) : 0;
    
    return {
      totalSolvedDays,
      totalQuizzes,
      correctAnswers,
      accuracy,
      totalLiked: dummyLikedSlangs.length,
    };
  },

  // 활동 캘린더용 데이터 생성
  generateYearActivity: () => {
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    const days = [];

    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0];
      const activity = dummyUser.activityData.find((item) => item.date === dateStr);
      days.push({
        date: dateStr,
        solved: activity ? activity.solved : Math.random() > 0.7, // 30% 확률로 퀴즈 완료
      });
    }
    return days;
  },
};

// 🔹 API 시뮬레이션 함수들
export const dummyAPI = {
  // 로그인 시뮬레이션
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "test@example.com" && password === "password123") {
          resolve({
            success: true,
            token: "dummy-jwt-token-12345",
            user: dummyUser,
          });
        } else {
          reject({
            success: false,
            message: "이메일 또는 비밀번호가 올바르지 않습니다.",
          });
        }
      }, 1000);
    });
  },

  // 회원가입 시뮬레이션
  signup: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "exist@example.com") {
          reject({
            success: false,
            message: "이미 가입된 이메일입니다.",
          });
        } else {
          resolve({
            success: true,
            message: "회원가입이 완료되었습니다.",
          });
        }
      }, 1500);
    });
  },

  // 사용자 프로필 가져오기
  getUserProfile: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: dummyUser,
        });
      }, 800);
    });
  },

  // 일일 퀴즈 가져오기
  getDailyQuiz: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: dummyDataUtils.getRandomQuiz(),
        });
      }, 600);
    });
  },
};

export default {
  dummySlangs,
  dummyTags,
  dummyUser,
  dummyQuizzes,
  dummyLikedSlangs,
  dummyRecentQuizzes,
  dummyDataUtils,
  dummyAPI,
};