import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EntryCard = ({ slang, onLikeToggle }) => {
  const navigate = useNavigate();

  // 신조어 클릭 핸들러
  const handleSlangClick = () => {
    console.log("신조어 클릭", slang);
    navigate(`/slangs/${slang.id}`);
  };

  // 좋아요 클릭 핸들러 (이벤트 버블링 방지)
  const handleLikeClick = (e) => {
    e.stopPropagation();
    onLikeToggle(slang.id);
  };

  return (
    <SlangCard onClick={handleSlangClick}>
      <SlangContent>
        <SlangTitle>{slang.title}</SlangTitle>
        <SlangSummary>{slang.summary}</SlangSummary>
      </SlangContent>

      <LikeSection>
        <HeartButton 
          onClick={handleLikeClick}
          title={slang.isLiked ? "좋아요 취소" : "좋아요"}
        >
          {slang.isLiked ? "❤️" : "🤍"}
        </HeartButton>
        <LikeCount>{slang.likes}</LikeCount>
      </LikeSection>
    </SlangCard>
  );
};

// 스타일드 컴포넌트
const SlangCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fafafa;
  min-height: 80px;

  &:hover {
    background: #f0f4ff;
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SlangContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SlangTitle = styled.h4`
  margin: 0;
  color: #333;
  font-size: 18px;
  font-weight: bold;
`;

const SlangSummary = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
  line-height: 1.4;
`;

const LikeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 60px;
`;

const HeartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  transition: all 0.3s ease;
  padding: 5px;
  border-radius: 50%;
  
  &:hover {
    background: rgba(255, 107, 107, 0.1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const LikeCount = styled.span`
  color: #666;
  font-size: 14px;
  font-weight: bold;
`;

export default EntryCard;