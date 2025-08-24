import styled from "styled-components";

// 컴포넌트들
import ProfileHeader from './components/ProfileHeader';
import ActivityCalendar from "./components/ActivityCalender";
import NavigationMenu from './components/NavigationMenu';
import LogoutButton from './components/LogoutButton';

const UserProfilePage = () => {
  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      // 로컬 데이터 삭제
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("authToken");
      localStorage.removeItem("lastQuizDate");
      localStorage.removeItem("userInfo");

      console.log("로그아웃 완료");
      alert("로그아웃되었습니다.");
      window.location.href = "/login";
      
    } catch (error) {
      console.error("로그아웃 처리 실패:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <ProfileCard>
        {/* 프로필 헤더 (이메일 표시) */}
        <ProfileHeader />

        {/* 퀴즈 활동 캘린더 */}
        <ActivityCalendar />

        {/* 네비게이션 메뉴 */}
        <NavigationMenu />

        {/* 로그아웃 버튼 */}
        <LogoutButton onLogout={handleLogout} />
      </ProfileCard>
    </Container>
  );
};

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

  @media (max-width: 768px) {
    padding: 20px;
    margin: 10px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    padding: 15px;
    margin: 5px;
  }
`;

export default UserProfilePage;