import { useState, useEffect } from "react";
import NoticeCard from "./components/NoticeCard";
import SlangListPage from "./components/SlangListPage";
import DailyQuizModal from "../components/DailyQuizModal";

const MainPage = () => {
  const [showQuizModal, setShowQuizModal] = useState(false);

  useEffect(() => {
    // 로그인 성공 후 하루에 한 번 퀴즈 모달 표시 여부 확인
    const checkDailyQuiz = () => {
      // 먼저 로그인 토큰 확인
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      
      if (!token) {
        // 토큰이 없으면 모달 표시하지 않음
        return;
      }
      
      // 토큰이 있으면 날짜 확인
      const today = new Date().toDateString();
      const lastQuizDate = localStorage.getItem('lastQuizDate');
      
      if (lastQuizDate !== today) {
        setShowQuizModal(true);
      }
    };

    checkDailyQuiz();
  }, []);

  const handleCloseQuiz = () => {
    setShowQuizModal(false);
    // 오늘 날짜를 localStorage에 저장
    localStorage.setItem('lastQuizDate', new Date().toDateString());
  };

  return (
    <div>
      <NoticeCard />
      <SlangListPage />
      
      {showQuizModal && (
        <DailyQuizModal onClose={handleCloseQuiz} />
      )}
    </div>
  );
};

export default MainPage;