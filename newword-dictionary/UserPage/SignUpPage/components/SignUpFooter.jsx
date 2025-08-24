import styled from 'styled-components';
import { StyledLink } from '../styles/SignUpStyles';

const SignUpFooter = () => {
  return (
    <Divider>
      <StyledLink to="/login">이미 계정이 있으신가요? 로그인</StyledLink>
    </Divider>
  );
};

const Divider = styled.div`
  margin: 35px 0 10px 0;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

export default SignUpFooter;