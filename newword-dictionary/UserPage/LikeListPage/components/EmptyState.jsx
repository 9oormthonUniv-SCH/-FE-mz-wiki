// components/EmptyState.jsx
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EmptyState = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <EmptyIcon>💔</EmptyIcon>
      <EmptyTitle>아직 좋아요한 신조어가 없어요</EmptyTitle>
      <EmptyDescription>마음에 드는 신조어를 찾아서 좋아요를 눌러보세요!</EmptyDescription>
      <ActionButtons>
        <ExploreButton onClick={() => navigate("/")}>신조어 둘러보기</ExploreButton>
        <SearchButton onClick={() => navigate("/search")}>신조어 검색하기</SearchButton>
      </ActionButtons>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: #f8f9fa;
  border-radius: 20px;
  border: 2px dashed #dee2e6;
`;

const EmptyIcon = styled.div`
  font-size: 4em;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.h2`
  color: #495057;
  margin-bottom: 15px;
  font-size: 1.8em;
`;

const EmptyDescription = styled.p`
  color: #6c757d;
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

const ExploreButton = styled.button`
  background: linear-gradient(45deg, #007bff, #0056b3);
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
  }
`;

const SearchButton = styled.button`
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
  }
`;

export default EmptyState;