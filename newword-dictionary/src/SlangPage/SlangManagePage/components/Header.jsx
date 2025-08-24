import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); //이전 페이지로 이동
  };

  return (
    <HeaderSection>
        <BackButton onClick={handleBackClick}>
            ← 뒤로가기
        </BackButton>

      <PageTitle>📝 내 신조어 관리</PageTitle>
    </HeaderSection>
  );
};

// Flexbox 레이아웃
const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #eee;
`;

// 버튼 스타일링과 hover 효과
const BackButton = styled.button`
  padding: 12px 20px;
  background: #f8f9fa;
  border: 2px solid #dee2e6;
  border-radius: 10px;
  cursor: pointer;
  color: #495057;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s;

/* hover 가상 선택자 */
  &:hover {
    background: #e9ecef;        
    transform: translateX(-2px);
`;

const PageTitle = styled.h1`
  font-size: 2.2em;
  color: #333;
  margin: 0;
  font-weight: bold;
`;

export default Header;
