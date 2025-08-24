import { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProfileHeader = () => {
  const [displayName, setDisplayName] = useState('게스트');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const token = localStorage.getItem('token');
    
    if (email && token) {
      // 이메일 앞부분만 추출
      const name = email.split('@')[0];
      setDisplayName(name);
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingMessage>프로필 정보를 불러오는 중...</LoadingMessage>;
  }

  return (
    <Container>
      <ProfileTitle>사용자 프로필</ProfileTitle>
      <ProfileSection>
        <ProfileAvatar>👤</ProfileAvatar>
        <DisplayNameTag>{displayName}</DisplayNameTag>
      </ProfileSection>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 30px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #666;
  padding: 20px;
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
`;

const DisplayNameTag = styled.div`
  background-color: #7fa6a5;
  color: white;
  padding: 12px 28px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`;

export default ProfileHeader;