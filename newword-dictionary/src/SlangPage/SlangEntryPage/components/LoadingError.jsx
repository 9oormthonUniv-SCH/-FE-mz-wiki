import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const LoadingSpinner = () => {
  <Container>
    <LoadingSpinnerMessage>
      <div>신조어 정보를 불러오는 중</div>
      <div>⏳</div>
    </LoadingSpinnerMessage>
  </Container>
};

export const ErrorMessage = ({ error }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <ErrorMessageStyle>
        <p>오류: {error}</p>
        <ErrorButtons>
          {/* 새로고침 버튼 */}
          <button onClick={() => window.location.reload()}>다시 시도</button>
          {/* 홈으로 이동 버튼 */}
          <button onClick={() => navigate("/")}>홈으로 돌아가기</button>
        </ErrorButtons>
      </ErrorMessageStyle>
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  color: black;
`;

const LoadingSpinnerMessage = styled.div`
  text-align: center;
  padding: 50px;
  
  div:first-child {
    font-size: 18px;
    color: #666;
    margin-bottom: 10px;
  }
  
  div:last-child {
    font-size: 24px;
  }
`;

const ErrorMessageStyle = styled.div`
  text-align: center;
  padding: 50px;
  color: #d32f2f;
  background: #ffebee;
  border-radius: 10px;
  border: 1px solid #ffcdd2;
  
  p {
    font-size: 16px;
    margin-bottom: 20px;
    font-weight: bold;
  }
`;

const ErrorButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  
  button {
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
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
