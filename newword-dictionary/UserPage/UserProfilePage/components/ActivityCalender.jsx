import { useState, useEffect } from 'react';
import styled from 'styled-components';

const ActivityCalendar = ({ 
  onRetry 
}) => {
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // API에서 퀴즈 활동 데이터 가져오기
  const fetchActivityData = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('로그인이 필요합니다.');
      }

      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      
      const response = await fetch(`${API_BASE_URL}/api/quiz/activity`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('로그인이 필요합니다.');
        } else if (response.status === 404) {
          throw new Error('퀴즈 활동 기록을 찾을 수 없습니다.');
        } else if (response.status === 500) {
          throw new Error('서버 오류가 발생했습니다.');
        } else {
          throw new Error('퀴즈 활동 데이터를 불러오는데 실패했습니다.');
        }
      }

      const data = await response.json();
      console.log('퀴즈 활동 데이터:', data);

      // API 응답이 배열인지 확인
      const activities = Array.isArray(data) ? data : (data.activities || data.data || []);
      setActivityData(activities);

    } catch (err) {
      console.error('퀴즈 활동 데이터 로딩 실패:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchActivityData();
  }, []);

  // 재시도 함수
  const handleRetry = () => {
    fetchActivityData();
    if (onRetry) onRetry();
  };

  // 전체 퀴즈 푼 날 계산
  const totalSolvedDays = activityData ? 
    activityData.filter(day => day.solved).length : 0;

  // 연속 퀴즈 풀이 일수 계산
  const calculateStreak = () => {
    if (!activityData || activityData.length === 0) return 0;
    
    // solved가 true인 날짜들만 필터링하고 최신순으로 정렬
    const solvedDates = activityData
      .filter(item => item.solved)
      .map(item => item.date)
      .sort((a, b) => new Date(b) - new Date(a));
    
    if (solvedDates.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    
    // 오늘부터 역순으로 연속된 날짜 확인
    for (let i = 0; i < solvedDates.length; i++) {
      const currentDate = new Date(solvedDates[i]);
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      
      // 날짜를 YYYY-MM-DD 형식으로 비교
      const currentDateStr = currentDate.toISOString().split('T')[0];
      const expectedDateStr = expectedDate.toISOString().split('T')[0];
      
      if (currentDateStr === expectedDateStr) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  // 퀴즈 활동 캘린더 생성 (최근 1년)
  const generateActivityCalendar = () => {
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    const days = [];

    // 1년간의 날짜 생성
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0]; // YYYY-MM-DD 형식
      
      // API에서 받은 데이터에서 해당 날짜 찾기
      const activity = activityData.find((item) => item.date === dateStr);
      
      days.push({
        date: dateStr,
        solved: activity ? activity.solved : false,
      });
    }
    return days;
  };

  const currentStreak = calculateStreak();
  const activityCalendarData = generateActivityCalendar();

  return (
    <ActivitySection>
      <ActivityTitle>
        📅 일일 퀴즈 활동 기록
        <ActivityStats>
          {loading ? (
            "활동 기록 불러오는 중..."
          ) : (
            <>
              총 {totalSolvedDays}일 참여 | 연속 {currentStreak}일
            </>
          )}
        </ActivityStats>
      </ActivityTitle>

      {loading ? (
        <ActivityLoadingSection>
          <ActivitySpinner />
          <LoadingText>퀴즈 활동 기록을 불러오는 중...</LoadingText>
        </ActivityLoadingSection>
      ) : error ? (
        <ActivityErrorSection>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorText>{error}</ErrorText>
          <RetryButton onClick={handleRetry}>다시 시도</RetryButton>
        </ActivityErrorSection>
      ) : (
        <>
          <ActivityCalendarGrid>
            {activityCalendarData.map((day, index) => (
              <ActivityDay 
                key={`${day.date}-${index}`} 
                $solved={day.solved} 
                title={`${day.date}: ${day.solved ? '퀴즈 완료 ✅' : '퀴즈 미완료 ❌'}`} 
              />
            ))}
          </ActivityCalendarGrid>
          <ActivityLegend>
            <LegendItem>
              <LegendColor $solved={false} />
              <span>퀴즈 안 품</span>
            </LegendItem>
            <LegendItem>
              <LegendColor $solved={true} />
              <span>퀴즈 품</span>
            </LegendItem>
          </ActivityLegend>
          
          {/* 활동 데이터가 없을 때 안내 메시지 */}
          {activityData.length === 0 && (
            <EmptyMessage>
              아직 퀴즈 활동 기록이 없습니다. 퀴즈를 풀어보세요! 🎯
            </EmptyMessage>
          )}
        </>
      )}
    </ActivitySection>
  );
};

const ActivitySection = styled.div`
  margin: 30px 0;
`;

const ActivityTitle = styled.div`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  font-weight: bold;
`;

const ActivityStats = styled.div`
  font-size: 14px;
  color: #7fa6a5;
  margin-top: 5px;
`;

const ActivityLoadingSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  background-color: #f9f9f9;
  border-radius: 10px;
  gap: 15px;
`;

const ActivitySpinner = styled.div`
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #7fa6a5;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  color: #666;
  font-size: 14px;
`;

const ActivityErrorSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 10px;
  gap: 15px;
`;

const ErrorIcon = styled.span`
  font-size: 24px;
`;

const ErrorText = styled.div`
  color: #721c24;
  font-weight: bold;
  text-align: center;
`;

const RetryButton = styled.button`
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background: #c82333;
  }
`;

const ActivityCalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(53, 1fr);
  gap: 2px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  max-width: 100%;
  overflow-x: auto;
`;

const ActivityDay = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${(props) => 
    props.$solved ? '#7fa6a5' : '#eee' 
  };
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
`;

const ActivityLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
  font-size: 12px;
  color: #666;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${(props) => 
    props.$solved ? '#7fa6a5' : '#eee'
  };
  border-radius: 2px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #6c757d;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  margin-top: 15px;
  font-style: italic;
`;

export default ActivityCalendar;