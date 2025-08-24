import styled from 'styled-components';

const SignUpHeader = () => {
  return (
    <TitleSection>
      <Title>신조어 사전</Title>
      <Header>Sign up</Header>
    </TitleSection>
  );
};

const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #eeeeee;
  text-shadow: 2px 2px #3a3a3a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Header = styled.div`
  margin-bottom: 10px;
  text-align: center;
  font-family: monospace;
  font-size: 18px;
`;

export default SignUpHeader;