import { Link } from "react-router-dom";
import styled from "styled-components";

const Logo = () => {
    return(
        <LogoSection>
            <LogoLink to="/">신조어 사전</LogoLink>
        </LogoSection>
    );
};

const LogoSection = styled.div`
  font-family: "Gowun Batang", serif;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  transition: color 0.3s ease;
  
  &:hover {
    color: black;
  } 
`;

export default Logo;