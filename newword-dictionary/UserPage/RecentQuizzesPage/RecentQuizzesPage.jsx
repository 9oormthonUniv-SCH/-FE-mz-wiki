import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import EmptyState from "./conponents/EmptyState";
import QuizCard from "./conponents/QuizCard";
import QuizStats from "./conponents/QuizStats";
import SortControls from "./conponents/SortControls";
import UserPageHeader from "../components/UserPageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const RecentQuizzesPage = () => {
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("latest"); // 정렬 옵션 : latest, oldest

  const navigate = useNavigate();

  useEffect(() => {
    const loadRecentQuizzes = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        console.log("최근 푼 문제 로드");

        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${API_BASE_URL}/quiz/history`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            alert("세션이 만료되었습니다. 다시 로그인해주세요.");
            localStorage.clear();
            window.location.href = "/login";
            return;
          } else if (response.status === 403) {
            throw new Error("접근 권한이 없습니다.");
          } else if (response.status === 404){
            throw new Error("최큰 퀴즈 목록을 찾을 수 없습니다.")
          }else {
            throw new Error(`서버 오류: ${response.status}`);
          }
        }

        const data = await response.json();
        const quizzesArray = Array.isArray(data) ? data : data.quizzes || data.data || [];
        setRecentQuizzes(quizzesArray);
      } catch (err) {
        console.log("최근 푼 문제 목록 로드 실패", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecentQuizzes();
  }, []);

  //정렬된 목록 반환
  const getSortedQuizzes = () => {
    let sorted = [...recentQuizzes];
    switch (sortBy) {
      case "latest":
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "oldest":
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        break;
    }
    return sorted;
  };
  // 정답률 계산
  const calculateStats = () => {
    const totalQuizzes = recentQuizzes.length;
    const correctCount = recentQuizzes.filter((quiz) => quiz.isCorrect).length;
    const accuracy = totalQuizzes > 0 ? Math.round((correctCount / totalQuizzes) * 100) : 0;

    return { totalQuizzes, correctCount, accuracy };
  };

  const sortedQuizzes = getSortedQuizzes();
  const stats = calculateStats();

  if (loading) return <LoadingSpinner message='최근 퀴즈 목록을 불러오는 중' icon='📝' />;

  if (error) return <ErrorMessage error={error} onRetry={() => window.location.reload()} />;

  return (
    <Container>
    {/* 헤더 */}
      <UserPageHeader 
      title="📝 최근 푼 문제" 
      onBack={() => navigate(-1)}
       />
       {/* 통계 */}
      <QuizStats stats={stats} />

      {/* 정렬 컨트롤 */}
      <SortControls 
        sortBy={sortBy} 
        onSortChange={setSortBy} 
        hasData={recentQuizzes.length > 0}
       />

       {/* 메인 컨텐츠 */}
      <ContentSection>
        {recentQuizzes.length === 0 ? (
          <EmptyState onGoHome={() => navigate("/")} />
        ) : (
          <QuizList>
            {sortedQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </QuizList>
        )}
      </ContentSection>

      {/* 결과 요약 */}
      {recentQuizzes.length > 0 && (
        <ResultSummary>
          총 {stats.totalQuizzes}개 문제 중 {stats.correctCount}개 정답 (정답률: {stats.accuracy}%)
        </ResultSummary>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
`;

const ContentSection = styled.div`
  min-height: 400px;
`;

const QuizList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 30px;
`;

const ResultSummary = styled.div`
  text-align: center;
  padding: 25px;
  background: #e9ecef;
  border-radius: 15px;
  color: #495057;
  font-weight: bold;
  font-size: 16px;
`;

export default RecentQuizzesPage;