import styled from 'styled-components';

const LogoutButton = ({ onLogout }) => {
  const handleLogout = async () => {
    const confirmLogout = window.confirm('정말 로그아웃하시겠습니까?');
    if (confirmLogout) {
      await onLogout();
    }
  };

  return (
    <Button onClick={handleLogout}>
      로그아웃
    </Button>
  );
};

const Button = styled.button`
  display: block;
  margin: 30px auto 0;
  padding: 12px 24px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    background-color: #ff5252;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default LogoutButton;