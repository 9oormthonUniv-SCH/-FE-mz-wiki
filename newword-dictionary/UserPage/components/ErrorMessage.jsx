import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ErrorMessage = ({ error }) => {
    const navigate = useNavigate();
  return (
    <ErrorContainer>
      <ErrorTitle>⚠️ 오류 발생</ErrorTitle>
      <ErrorText>{error}</ErrorText>
      <ErrorButtons>
        <RetryButton onClick={() => window.location.reload()}>
          다시 시도
        </RetryButton>
        <HomeButton onClick={() => navigate('/')}>
          홈으로 돌아가기
        </HomeButton>
      </ErrorButtons>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: #ffebee;
  border-radius: 15px;
  border: 2px solid #ffcdd2;
  margin: 40px 0;
`;

const ErrorTitle = styled.h2`
  color: #d32f2f;
  margin-bottom: 15px;
  font-size: 24px;
`;

const ErrorText = styled.p`
  color: #d32f2f;
  font-size: 16px;
  margin-bottom: 25px;
  line-height: 1.5;
`;

const ErrorButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const RetryButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  background: #007bff;
  color: white;

  &:hover {
    background: #0056b3;
  }
`;

const HomeButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  background: #6c757d;
  color: white;

  &:hover {
    background: #545b62;
  }
`;

export default ErrorMessage;