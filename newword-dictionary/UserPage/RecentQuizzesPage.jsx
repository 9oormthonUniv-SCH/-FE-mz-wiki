import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// 더미 데이터 import
import { dummyRecentQuizzes } from '../src/data/dummyData';

const RecentQuizzesPage = () => {
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('latest'); // 정렬 옵션: latest, oldest
  
  const navigate = useNavigate();

  // 🎯 더미 데이터로 최근 푼 문제 목록 가져오기
  useEffect(() => {
    const fetchRecentQuizzes = async () => {
      try {
        setLoading(true);
        setError('');

        // 더미 데이터 시뮬레이션을 위한 딜레이
        await new Promise(resolve => setTimeout(resolve, 800));

        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('로그인이 필요합니다.');
        }

        console.log('더미 데이터로 최근 푼 문제 목록 로드');

        // 🎯 더미 데이터 사용
        setRecentQuizzes(dummyRecentQuizzes);

        /* 🔹 실제 API 코드 (주석 처리)
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
        
        const response = await fetch(`${API_BASE_URL}/api/quiz/history`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
            throw new Error('로그인이 필요합니다.');
          } else if (response.status === 403) {
            throw new Error('접근 권한이 없습니다.');
          } else {
            throw new Error(`서버 오류: ${response.status}`);
          }
        }

        const data = await response.json();
        const quizzesArray = Array.isArray(data) ? data : (data.quizzes || data.data || []);
        setRecentQuizzes(quizzesArray);
        */

      } catch (err) {
        console.error('최근 푼 문제 목록 로드 실패:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentQuizzes();
  }, [navigate]);

  // 🎯 정렬된 목록 반환
  const getSortedQuizzes = () => {
    let sorted = [...recentQuizzes];

    // 정렬
    switch (sortBy) {
      case 'latest':
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        break;
    }

    return sorted;
  };

  // 🎯 프론트엔드에서 정답률 계산
  const calculateStats = () => {
    const totalQuizzes = recentQuizzes.length;
    const correctCount = recentQuizzes.filter(quiz => quiz.isCorrect).length;
    const accuracy = totalQuizzes > 0 ? Math.round((correctCount / totalQuizzes) * 100) : 0;
    
    return {
      totalQuizzes,
      correctCount,
      accuracy
    };
  };

  const sortedQuizzes = getSortedQuizzes();
  const stats = calculateStats();

  // 로딩 상태
  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <div>최근 푼 문제를 불러오는 중...</div>
          <div>📝</div>
        </LoadingSpinner>
      </Container>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <Container>
        <ErrorMessage>
          <h2>⚠️ 오류 발생</h2>
          <p>{error}</p>
          <ErrorButtons>
            <button onClick={() => window.location.reload()}>다시 시도</button>
            <button onClick={() => navigate('/')}>홈으로 돌아가기</button>
          </ErrorButtons>
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      {/* 헤더 섹션 */}
      <HeaderSection>
        <BackButton onClick={() => navigate(-1)}>← 뒤로가기</BackButton>
        <PageTitle>📝 최근 푼 문제</PageTitle>
      </HeaderSection>

      {/* 통계 섹션 */}
      {recentQuizzes.length > 0 && (
        <StatsSection>
          <StatCard>
            <StatNumber>{stats.totalQuizzes}</StatNumber>
            <StatLabel>총 문제 수</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.correctCount}</StatNumber>
            <StatLabel>정답 수</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.accuracy}%</StatNumber>
            <StatLabel>정답률</StatLabel>
          </StatCard>
        </StatsSection>
      )}

      {/* 정렬 컨트롤 */}
      {recentQuizzes.length > 0 && (
        <SortSection>
          <SortTitle>정렬:</SortTitle>
          <SortButtons>
            <SortButton 
              $active={sortBy === 'latest'} 
              onClick={() => setSortBy('latest')}
            >
              최신순
            </SortButton>
            <SortButton 
              $active={sortBy === 'oldest'} 
              onClick={() => setSortBy('oldest')}
            >
              오래된순
            </SortButton>
          </SortButtons>
        </SortSection>
      )}

      {/* 문제 목록 */}
      <ContentSection>
        {recentQuizzes.length === 0 ? (
          <EmptyState>
            <EmptyIcon>📭</EmptyIcon>
            <EmptyTitle>아직 푼 문제가 없어요</EmptyTitle>
            <EmptyDescription>
              일일 퀴즈를 풀어보세요!
            </EmptyDescription>
            <GoHomeButton onClick={() => navigate('/')}>
              퀴즈 풀러 가기
            </GoHomeButton>
          </EmptyState>
        ) : (
          <QuizList>
            {sortedQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} $isCorrect={quiz.isCorrect}>
                <QuizHeader>
                  <QuizInfo>
                    <QuizDate>{new Date(quiz.date).toLocaleDateString()}</QuizDate>
                    <WordTitle>관련 신조어: {quiz.wordTitle}</WordTitle>
                  </QuizInfo>
                  <ResultBadge $isCorrect={quiz.isCorrect}>
                    {quiz.isCorrect ? '✅ 정답' : '❌ 오답'}
                  </ResultBadge>
                </QuizHeader>

                <QuizContent>
                  <QuestionSection>
                    <QuestionTitle>문제</QuestionTitle>
                    <QuestionText>{quiz.question}</QuestionText>
                  </QuestionSection>

                  <AnswerSection>
                    <AnswerRow>
                      <AnswerLabel>내 답:</AnswerLabel>
                      <UserAnswer $isCorrect={quiz.isCorrect}>
                        {quiz.userAnswer}
                      </UserAnswer>
                    </AnswerRow>
                    
                    <AnswerRow>
                      <AnswerLabel>정답:</AnswerLabel>
                      <CorrectAnswer>
                        {quiz.correctAnswer}
                      </CorrectAnswer>
                    </AnswerRow>
                  </AnswerSection>
                </QuizContent>
              </QuizCard>
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

// 스타일 컴포넌트들
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 80px 20px;
  
  div:first-child {
    font-size: 18px;
    color: #666;
    margin-bottom: 15px;
  }
  
  div:last-child {
    font-size: 32px;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: #ffebee;
  border-radius: 15px;
  border: 2px solid #ffcdd2;
  margin: 40px 0;

  h2 {
    color: #d32f2f;
    margin-bottom: 15px;
    font-size: 24px;
  }

  p {
    color: #d32f2f;
    font-size: 16px;
    margin-bottom: 25px;
    line-height: 1.5;
  }
`;

const ErrorButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;

  button {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;

    &:first-child {
      background: #007bff;
      color: white;

      &:hover {
        background: #0056b3;
      }
    }

    &:last-child {
      background: #6c757d;
      color: white;

      &:hover {
        background: #545b62;
      }
    }
  }
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #eee;
`;

const BackButton = styled.button`
  padding: 12px 20px;
  background: #f8f9fa;
  border: 2px solid #dee2e6;
  border-radius: 10px;
  cursor: pointer;
  color: #495057;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s;

  &:hover {
    background: #e9ecef;
    transform: translateX(-2px);
  }
`;

const PageTitle = styled.h1`
  font-size: 2.2em;
  color: #333;
  margin: 0;
  font-weight: bold;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 0.9em;
  opacity: 0.9;
`;

const SortSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

const SortTitle = styled.h3`
  margin: 0;
  color: #495057;
  font-size: 16px;
  font-weight: bold;
`;

const SortButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const SortButton = styled.button`
  padding: 10px 20px;
  border: 2px solid ${props => props.$active ? '#007bff' : '#e9ecef'};
  background: ${props => props.$active ? '#007bff' : 'white'};
  color: ${props => props.$active ? 'white' : '#495057'};
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #007bff;
    background: ${props => props.$active ? '#0056b3' : '#e7f3ff'};
  }
`;

const ContentSection = styled.div`
  min-height: 400px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: #f8f9fa;
  border-radius: 20px;
  border: 2px dashed #dee2e6;
`;

const EmptyIcon = styled.div`
  font-size: 4em;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.h2`
  color: #495057;
  margin-bottom: 15px;
  font-size: 1.8em;
`;

const EmptyDescription = styled.p`
  color: #6c757d;
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const GoHomeButton = styled.button`
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(40,167,69,0.3);
  }
`;

const QuizList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 30px;
`;

const QuizCard = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border-left: 6px solid ${props => props.$isCorrect ? '#28a745' : '#dc3545'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
`;

const QuizHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px 15px 25px;
  border-bottom: 1px solid #f1f3f4;
`;

const QuizInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const QuizDate = styled.div`
  color: #6c757d;
  font-size: 14px;
  font-weight: bold;
`;

const WordTitle = styled.div`
  color: #495057;
  font-size: 13px;
`;

const ResultBadge = styled.span`
  background: ${props => props.$isCorrect ? '#d4edda' : '#f8d7da'};
  color: ${props => props.$isCorrect ? '#155724' : '#721c24'};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
`;

const QuizContent = styled.div`
  padding: 20px 25px;
`;

const QuestionSection = styled.div`
  margin-bottom: 25px;
`;

const QuestionTitle = styled.h4`
  color: #495057;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: bold;
`;

const QuestionText = styled.p`
  color: #333;
  font-size: 18px;
  line-height: 1.6;
  padding: 18px 22px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #007bff;
  margin: 0;
`;

const AnswerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const AnswerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const AnswerLabel = styled.span`
  font-weight: bold;
  color: #495057;
  min-width: 60px;
  font-size: 15px;
`;

const UserAnswer = styled.span`
  padding: 10px 18px;
  border-radius: 25px;
  font-weight: bold;
  background: ${props => props.$isCorrect ? '#d4edda' : '#f8d7da'};
  color: ${props => props.$isCorrect ? '#155724' : '#721c24'};
  font-size: 15px;
`;

const CorrectAnswer = styled.span`
  padding: 10px 18px;
  background: #d4edda;
  color: #155724;
  border-radius: 25px;
  font-weight: bold;
  font-size: 15px;
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