import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s;
  border: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    background-color: #f8f9fa;
  }
`;

const SlangHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  gap: 15px;
`;

const SlangTitle = styled.h4`
  font-size: 24px;
  font-weight: bold;
  color: #333333;
  margin: 0;
  line-height: 1.2;
`;

const SlangMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-end;
  white-space: nowrap;
`;

const LikeCount = styled.span`
  font-size: 14px;
  color: #e74c3c;
  font-weight: bold;
`;

const CreateDate = styled.span`
  font-size: 12px;
  color: #666;
`;

const SlangSummary = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReadMoreText = styled.span`
  color: #007bff;
  font-weight: bold;
  font-size: 14px;
  margin-top: 10px;
  display: inline-block;
`;

const EntryCard = ({ slang }) => {
  const navigate = useNavigate();

  // 예시 데이터
  const displayData = {
    id: slang.id,
    title: slang.title || slang.term || '신조어',
    summary: slang.summary || slang.meaning || '의미를 불러오는 중...',
    likeCount: slang.likeCount || 0,
    createdAt: slang.createdAt || new Date().toLocaleDateString('ko-KR')
  };

  return (
    <Card onClick={() => navigate(`/slangs/${displayData.id}`)}>
      <SlangHeader>
        <SlangTitle>{displayData.title}</SlangTitle>
        <SlangMeta>
          <LikeCount>❤️ {displayData.likeCount}</LikeCount>
          <CreateDate>{displayData.createdAt}</CreateDate>
        </SlangMeta>
      </SlangHeader>
      
      <SlangSummary>{displayData.summary}</SlangSummary>
      
      <ReadMoreText>자세히 보기 →</ReadMoreText>
    </Card>
  );
};

export default EntryCard;