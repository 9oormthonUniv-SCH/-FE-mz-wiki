import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RelatedSlangs = ({ relatedSlangs, tagName }) => {
  const navigate = useNavigate();

  const handleRelatedSlangClick = (slangId) => {
    navigate(`/slangs/${slangId}`);
  };

  if (relatedSlangs.length === 0) return null;

  return (
    <RecommendSection>
      <SectionTitle>🔗 '{tagName}' 관련 신조어</SectionTitle>
      <RecommendGrid>
        {relatedSlangs.map((relatedSlang) => (
          <RecommendCard
            key={relatedSlang.id}
            onClick={() => handleRelatedSlangClick(relatedSlang.id)}
          >
            <RecommendTitle>{relatedSlang.title}</RecommendTitle>
            <RecommendSummary>{relatedSlang.summary}</RecommendSummary>
            <RecommendLikes>❤️ {relatedSlang.likes || 0}</RecommendLikes>
          </RecommendCard>
        ))}
      </RecommendGrid>
    </RecommendSection>
  );
};

const RecommendSection = styled.div`
  margin-top: 50px;
  padding: 35px;
  background: #f8f9fa;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

const RecommendGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 25px;
`;

const RecommendCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 3px 12px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    border-color: #007bff;
  }
`;

const RecommendTitle = styled.h4`
  margin: 0 0 12px 0;
  color: #333;
  font-size: 1.2em;
  font-weight: bold;
`;

const RecommendSummary = styled.p`
  margin: 0 0 15px 0;
  color: #666;
  font-size: 0.95em;
  line-height: 1.5;
`;

const RecommendLikes = styled.div`
  color: #007bff;
  font-size: 0.9em;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export default RelatedSlangs;