import styled from "styled-components";

const LoadingSpinner = ({
  message = '로딩 중', 
  icon = '⌛'
}) => {
  return (
    <SpinnerContainer>
      <LoadingText>{message}</LoadingText>
      <Icon>{icon}</Icon>
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.div`
  text-align: center;
  padding: 80px 20px;
`;

const LoadingText = styled.div`
  font-size: 18px;
  color: #666;
  margin-bottom: 15px;
`;
const Icon = styled.div`
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
