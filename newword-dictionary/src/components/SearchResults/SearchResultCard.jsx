import styled from "styled-components";

const SearchResultCard = ({ slang, onCardClick }) => {
  const handleClick = () => {
    if (onCardClick) {
      onCardClick(slang);
    }
  };

  return (
    <Card onClick={handleClick} clickable={!!onCardClick}>
      <CardHeader>
        <SlangTerm>{slang.term}</SlangTerm>
        <LikeCount>❤️ {slang.likeCount}</LikeCount>
      </CardHeader>
      
      <SlangMeaning>{slang.meaning}</SlangMeaning>
      
      <SlangExample>
        <strong>사용 예시:</strong> "{slang.example}"
      </SlangExample>
    </Card>
  );
};

const Card = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};

  ${props => props.clickable && `
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    }
  `}
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const SlangTerm = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  margin: 0;
`;

const LikeCount = styled.span`
  font-size: 14px;
  color: #e74c3c;
  font-weight: bold;
`;

const SlangMeaning = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin: 0 0 15px 0;
`;

const SlangExample = styled.div`
  padding: 12px 16px;
  background-color: #f5f5edff;
  border-left: 4px solid #ffc107;
  border-radius: 5px;
  font-size: 14px;
  color: #856404;
  line-height: 1.5;

  strong {
    color: #533f03;
  }
`;

export default SearchResultCard;