import { Link } from "react-router-dom";
import styled from "styled-components";
import ProfileIcon from "./components/ProfileIcon";

const ProfileSection = () => {
    return(
        <ProfileWrapper to="/user">
            <ProfileIcon size={40}/>
        </ProfileWrapper>
    );
};

const ProfileWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #e0e0e0;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d0d0d0;
  }
`;

export default ProfileSection;