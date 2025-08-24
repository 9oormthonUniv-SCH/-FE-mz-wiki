// components/NavigationMenu.jsx
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavigationMenu = () => {
  const menuItems = [
    { to: '/user/liked', label: '좋아요 목록' },
    { to: '/user/recent-quiz', label: '최근 푼 문제' },
    { to: '/slangs/create', label: '신조어 등록' },
    { to: '/slangs/manage', label: '신조어 관리' },
  ];

  return (
    <NavigationButtons>
      {menuItems.map((item, index) => (
        <NavigationLink key={index} to={item.to}>
          {item.label}
        </NavigationLink>
      ))}
    </NavigationButtons>
  );
};

const NavigationButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 30px 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NavigationLink = styled(Link)`
  padding: 12px 24px;
  border: 2px solid #7fa6a5;
  border-radius: 25px;
  background-color: white;
  color: #7fa6a5;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.2s;
  text-align: center;
  display: inline-block;

  &:hover {
    background-color: #7fa6a5;
    color: white;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 200px;
  }
`;

export default NavigationMenu;