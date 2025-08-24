import styled from "styled-components";

const SlangDetails = ({ slangData }) => {
  return (
    <>
      <DetailSection>
        <SectionTitle>📖 상세 설명</SectionTitle>
        <Description>{slangData.definition}</Description>
      </DetailSection>

      {slangData.examples && slangData.examples.length > 0 && (
        <ExampleSection>
          <SectionTitle>💬 사용 예시</SectionTitle>
          <ExampleList>
            {slangData.examples.map((example, index) => (
              <ExampleItem key={index}>"{example}"</ExampleItem>
            ))}
          </ExampleList>
        </ExampleSection>
      )}

      <InfoSection>
        {slangData.createdAt && (
          <InfoItem>
            <InfoLabel>등록일:</InfoLabel>
            <InfoValue>
              {/* 날짜 포맷팅 */}
              {new Date(slangData.createdAt).toLocaleDateString()}
            </InfoValue>
          </InfoItem>
        )}
      </InfoSection>
    </>
  );
};

const DetailSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  color: #333;
  margin-bottom: 15px;
  font-size: 1.4em;
  font-weight: bold;
`;

const Description = styled.p`
  line-height: 1.8;
  color: #444;
  padding: 20px;
  background: #f9f9f9;
  border-left: 4px solid #007bff;
  border-radius: 8px;
  font-size: 1.1em;
`;

const ExampleSection = styled.div`
  margin-bottom: 30px;
`;

const ExampleList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ExampleItem = styled.li`
  padding: 15px 20px;
  margin-bottom: 12px;
  background: #fff8e1;
  border-left: 4px solid #ffc107;
  border-radius: 8px;
  font-size: 1.05em;
  line-height: 1.5;
  transition: all 0.3s;

  &:hover {
    background: #fff3c4;
    transform: translateX(5px);
  }
`;

const InfoSection = styled.div`
  background: #f9f9f9;
  padding: 25px;
  border-left: 4px solid #333333;
  border-radius: 8px;
  margin-bottom: 30px;
`;

const InfoItem = styled.div`
  display: flex;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  font-weight: bold;
  min-width: 100px;
  color: #555;
  font-size: 1.05em;
`;

const InfoValue = styled.span`
  color: #333;
  font-size: 1.05em;
`;

export default SlangDetails;