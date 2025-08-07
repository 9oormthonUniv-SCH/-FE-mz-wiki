import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UserProfilePage = () => {
  // 사용자 데이터 상태
  const [userData, setUserData] = useState({
    nickname: "닉네임",
    profileImage: null,
    activityData: [],
  });

  // 로딩 및 에러 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activityLoading, setActivityLoading] = useState(false);

  // 사용자 기본 정보 가져오기
  const fetchUserData = async () => {
    setLoading(true);

    setTimeout(() => {
      setUserData({
        nickname: "테스트유저",
        profileImage: null,
        activityData: [], // 초기에는 빈 배열
      });
      setLoading(false);
    }, 1000);
  };

  // 일일 퀴즈 활동 데이터 API 호출
  const fetchDailyQuizActivity = async () => {
    try {
      setActivityLoading(true);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('로그인이 필요합니다.');
      }

      console.log('일일 퀴즈 활동 데이터 요청');

      // 더미 데이터
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 1년간의 더미 데이터 생성
      const today = new Date();
      const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
      const dummyActivityData = [];

      for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split("T")[0];
        // 75% 확률로 퀴즈를 풀었다고 설정
        const solved = Math.random() < 0.75;
        
        // 일요일은 퀴즈를 안 푸는 경우가 많다고 가정
        if (d.getDay() === 0 && Math.random() < 0.4) {
          dummyActivityData.push({ date: dateStr, solved: false });
        } else {
          dummyActivityData.push({ date: dateStr, solved });
        }
      }

      // 사용자 데이터에 활동 데이터 추가
      setUserData(prev => ({
        ...prev,
        activityData: dummyActivityData
      }));

      /* 🔹 API 코드
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL';

      const response = await fetch(`${API_BASE_URL}/quiz/daily`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
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

      const activityData = await response.json();
      console.log('일일 퀴즈 활동 데이터:', activityData);

      // 받아온 데이터를 사용자 데이터에 추가
      setUserData(prev => ({
        ...prev,
        activityData: activityData
      }));
      */

    } catch (err) {
      console.error('일일 퀴즈 활동 데이터 로딩 실패:', err);
      // 에러가 발생해도 메인 페이지는 표시되도록 설정
      setError(err.message);
    } finally {
      setActivityLoading(false);
    }
  };

  // 컴포넌트 마운트 시 사용자 데이터 가져오기
  useEffect(() => {
    fetchUserData();
  }, []);

  // 사용자 기본 정보 로드 완료 후 퀴즈 활동 데이터 가져오기
  useEffect(() => {
    if (!loading) {
      fetchDailyQuizActivity();
    }
  }, [loading]);

  // 퀴즈 활동 캘린더 생성
  const generateActivityCalendar = () => {
    if (!userData.activityData || userData.activityData.length === 0) {
      // 데이터가 없으면 빈 배열 반환
      return [];
    }

    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    const days = [];

    // 1년간의 날짜 생성
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0]; // YYYY-MM-DD 형식
      const activity = userData.activityData.find((item) => item.date === dateStr);
      days.push({
        date: dateStr,
        solved: activity ? activity.solved : false, // 퀴즈를 풀었으면 true, 안 풀었으면 false
      });
    }
    return days;
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    // 서버에 로그아웃 요청
    if (token) {
      try {
        await fetch("/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("로그아웃 요청 실패:", error);
      }
    }

    // 로컬 데이터 삭제
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("lastQuizDate");

    alert("로그아웃되었습니다.");
    window.location.href = "/login";
  };

  // 전체 퀴즈 푼 날 계산
  const totalSolvedDays = userData.activityData ? userData.activityData.filter(day => day.solved).length : 0;

  // 연속 퀴즈 풀이 일수 계산
  const calculateStreak = () => {
    if (!userData.activityData || userData.activityData.length === 0) return 0;
    
    const sortedData = [...userData.activityData]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .filter(item => item.solved);
    
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < sortedData.length; i++) {
      const currentDate = new Date(sortedData[i].date);
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      
      if (sortedData[i].date === expectedDate.toISOString().split('T')[0]) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const currentStreak = calculateStreak();

  if (loading) {
    return <LoadingMessage>사용자 정보를 불러오는 중</LoadingMessage>;
  }

  if (error && !userData.nickname) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  const activityCalendarData = generateActivityCalendar();

  return (
    <Container>
      <ProfileCard>
        <ProfileTitle>사용자 프로필</ProfileTitle>

        {/* 프로필 이미지와 닉네임 */}
        <ProfileSection>
          <ProfileAvatar>{userData.profileImage ? <img src={userData.profileImage} alt="프로필" /> : "👤"}</ProfileAvatar>
          <NicknameTag>{userData.nickname}</NicknameTag>
        </ProfileSection>

        {/* 퀴즈 활동 캘린더 */}
        <ActivitySection>
          <ActivityTitle>
            📅 일일 퀴즈 활동 기록
            <ActivityStats>
              {activityLoading ? (
                "활동 기록 불러오는 중..."
              ) : (
                <>
                  총 {totalSolvedDays}일 참여 | 연속 {currentStreak}일
                </>
              )}
            </ActivityStats>
          </ActivityTitle>

          {activityLoading ? (
            <ActivityLoadingSection>
              <ActivitySpinner />
              <LoadingText>퀴즈 활동 기록을 불러오는 중...</LoadingText>
            </ActivityLoadingSection>
          ) : error && userData.activityData.length === 0 ? (
            <ActivityErrorSection>
              <ErrorIcon>⚠️</ErrorIcon>
              <ErrorText>{error}</ErrorText>
              <RetryButton onClick={fetchDailyQuizActivity}>다시 시도</RetryButton>
            </ActivityErrorSection>
          ) : (
            <>
              <ActivityCalendar>
                {activityCalendarData.map((day, index) => (
                  <ActivityDay 
                    key={index} 
                    $solved={day.solved} 
                    title={`${day.date}: ${day.solved ? '퀴즈 완료 ✅' : '퀴즈 미완료 ❌'}`} 
                  />
                ))}
              </ActivityCalendar>
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
            </>
          )}
        </ActivitySection>

        {/* 페이지 이동 버튼들 */}
        <NavigationButtons>
          <NavigationLink to="/user/liked">좋아요 목록</NavigationLink>
          <NavigationLink to="/user/recent-quiz">최근 푼 문제</NavigationLink>
          <NavigationLink to="/slangs/create">신조어 등록</NavigationLink>
          <NavigationLink to="/slangs/manage">신조어 관리</NavigationLink>
        </NavigationButtons>

        {/* 로그아웃 버튼 */}
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </ProfileCard>
    </Container>
  );
};

// 스타일 컴포넌트들
const Container = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
`;

const ProfileCard = styled.div`
  background: white;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const ProfileTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
  border-bottom: 2px solid #7fa6a5;
  padding-bottom: 10px;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin-bottom: 15px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const NicknameTag = styled.div`
  background-color: #7fa6a5;
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: bold;
`;

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

// 로딩 관련 스타일
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

// 에러 관련 스타일
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

const ActivityCalendar = styled.div`
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

const NavigationButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 30px 0;
`;

const NavigationLink = styled(Link)`
  padding: 12px 24px;
  border: 2px solid #7fa6a5;
  border-radius: 25px;
  background-color: white;
  color: #7fa6a5;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.2s;
  text-align: center;
  display: inline-block;

  &:hover {
    background-color: #7fa6a5;
    color: white;
  }
`;

const LogoutButton = styled.button`
  display: block;
  margin: 30px auto 0;
  padding: 12px 24px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ff5252;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #666;
  font-size: 18px;
  margin-top: 100px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #ff4444;
  font-size: 18px;
  margin-top: 100px;
  padding: 20px;
  background-color: #ffe6e6;
  border-radius: 10px;
  max-width: 500px;
  margin: 100px auto;
`;

export default UserProfilePage;