import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CreatePageHeader = () => {
  const navigate = useNavigate();

  return (
    <HeaderSection>
      <BackButton onClick={() => navigate(-1)}>← 뒤로가기</BackButton>

      <PageTitle>✏️ 신조어 등록</PageTitle>
    </HeaderSection>
  );
};

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #eee;
`;

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

  &:hover {
    background: #e9ecef;
    transform: translateX(-2px);  /* 호버 시 왼쪽으로 살짝 이동 */
  }
`;

const PageTitle = styled.h1`
  font-size: 2.2em;
  color: #333;
  margin: 0;
  font-weight: bold;
`;

export default CreatePageHeader;