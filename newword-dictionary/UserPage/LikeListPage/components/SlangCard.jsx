import styled from "styled-components";

const SlangCard = ({ slang, onSlangClick, onUlike }) => {
  const handleCardClick = () => {
    onSlangClick(slang.id);
  };

  const handleUnlikeClick = (e) => {
    e.stopPropagation(); // 카드 클릭 방지
    onUnlike(slang.id, slang.title);
  };

  return (
    <Card>
      <CardHeader>
        <TagBadge>{slang.tag}</TagBadge>
        <UnLikeButton onClick={handleUnlikeClick}>💔</UnLikeButton>
      </CardHeader>

      <CardContent onClick={handleCardClick}>
        <SlangTitle>{slang.title}</SlangTitle>
        <SlangSummary>{slang.summary}</SlangSummary>
      </CardContent>

      <CardFooter>
        <LikeInfo>♥️ {slang.likes || 0}</LikeInfo>
        {slang.likedAt && (
          <LikedDate>
            {/*slang에 등록 된 날짜를 사용자가 보기 편하게 변환해서 출력*/}
            좋아요:{new Date(slang.likedAt).toLocaleDateString()}
          </LikedDate>
        )}
      </CardFooter>
    </Card>
  );
};

const Card = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  border: 2px solid #f8f9fa;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    border-color: #007bff;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px 10px 20px;
`;

const TagBadge = styled.span`
  background: linear-gradient(45deg, #007bff, #0056b3);
  color: white;
  padding: 6px 14px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
`;

const UnLikeButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s;

  &:hover {
    background: #ffebee;
    transform: scale(1.2);
  }
`;

const CardContent = styled.div`
  padding: 0 20px 20px 20px;
  cursor: pointer;
`;

const SlangTitle = styled.h3`
  color: #333;
  margin-bottom: 12px;
  font-size: 1.5em;
  font-weight: bold;
`;

const SlangSummary = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 1.05em;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #f1f3f4;
`;

const LikeInfo = styled.div`
  color: #ff6b6b;
  font-weight: bold;
  font-size: 15px;
`;

const LikedDate = styled.div`
  color: #adb5bd;
  font-size: 13px;
`;

export default SlangCard;