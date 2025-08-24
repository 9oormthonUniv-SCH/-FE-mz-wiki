import styled from "styled-components";

const ErrorMessage = ({error,onRetry}) => {
    return(
        <ErrorContainer>
            <ErrorIcon>⚠️</ErrorIcon>
            <ErrorText>{error}</ErrorText>
            <RetryButton onClick={onRetry}>
                다시 시도
            </RetryButton>
        </ErrorContainer>
    );
};

// 에러 상태 스타일 컴포넌트
const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 30px;
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const ErrorIcon = styled.span`
  font-size: 24px;
`;

const ErrorText = styled.span`
  font-weight: bold;
  flex: 1;
`;

// 다시 시도 버튼
const RetryButton = styled.button`
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #c82333;
  }
`;

export default ErrorMessage;