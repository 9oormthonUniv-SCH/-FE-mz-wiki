import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EmptyState = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/slangs/creat');
    }

    return(
        <EmptyContainer>
            <EmptyIcon>📝</EmptyIcon>
            <EmptyTitle>등록된 신조어가 없습니다</EmptyTitle>
            <EmptyDescription>새로운 신조어를 등록해보세요!</EmptyDescription>
            <CreateButton onClick={handleClick}>
                신조어 등록하기
            </CreateButton>
        </EmptyContainer>
    );
};

// 중앙 정렬 레이아웃
const EmptyContainer = styled.div`
  text-align: center;        /* 텍스트 중앙 정렬 */
  padding: 100px 20px;       /* 상하 100px, 좌우 20px */
`;

const EmptyIcon = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
`;

const EmptyDescription = styled.p`
  font-size: 16px;
  color: #666; 
  margin-bottom: 30px;
`;

// 그라데이션과 호버 애니메이션
const CreateButton = styled.button`
  padding: 15px 30px;
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: linear-gradient(45deg, #218838, #1ca085);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(40,167,69,0.3);
  }
`;

export default EmptyState;