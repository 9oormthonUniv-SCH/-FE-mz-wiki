import styled from "styled-components";

const LoadingSpinner = ({message = "데이터를 불러오는 중"}) => {
  return (
    <SpinnerContainer>
        <Spinner />
        <LoadingText>{message}</LoadingText>
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  font-size: 18px;
  color: #666;
  margin-bottom: 15px;
`;
const HeartIcon = styled.div`
  font-size: 32px;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;

export default LoadingSpinner;
