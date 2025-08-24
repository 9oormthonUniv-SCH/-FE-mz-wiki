import styled from "styled-components";

const InfoGuide = () => {
  return (
    <InfoSection>
      <InfoCard>
        <InfoIcon>💡</InfoIcon>
        <InfoContent>
          <InfoTitle>신조어 등록 가이드</InfoTitle>
          <InfoList>
            <li>새로운 신조어와 그 의미를 정확히 입력해주세요</li>
            <li>실제 사용 예시를 포함해주시면 더 좋아요</li>
            <li>등록된 신조어는 다른 사용자들과 공유됩니다</li>
          </InfoList>
        </InfoContent>
      </InfoCard>
    </InfoSection>
  );
};

const InfoSection = styled.div`
  margin-bottom: 30px;
`;

const InfoCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 15px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
`;

const InfoIcon = styled.div`
  font-size: 24px;
  margin-top: 2px;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: bold;
`;

const InfoList = styled.ul`
  margin: 0;
  padding-left: 20px;

  li {
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 1.5;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default InfoGuide;
