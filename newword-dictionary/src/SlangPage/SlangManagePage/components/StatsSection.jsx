import styled from "styled-components";

const StatsSection = ({slangs}) => {
    const totalSlangs = slangs.length;

    const totalLikes = slangs.reduce((sum, slang) =>{
        return sum + slang.likeCount;
    },0);

    return(
        <StatsContainer>
            <StatsCard>
                <StatsIcon>📊</StatsIcon>
                <StatsContent>
                    <StatsNumber>{totalSlangs}</StatsNumber>
                    <StatsLabel>등록한 신조어</StatsLabel>
                </StatsContent>
            </StatsCard>

            <StatsCard>
                <StatsIcon>♥️</StatsIcon>
                <StatsContent>
                    <StatsNumber>{totalLikes}</StatsNumber>
                    <StatsLabel>총 좋아요</StatsLabel>
                </StatsContent>
            </StatsCard>
        </StatsContainer>
    );
};

// Grid 레이아웃
const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

// 카드 디자인과 flexbox
const StatsCard = styled.div`
  background: #7fa6a5;
  color: white;
  padding: 25px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 15px rgba(127, 166, 165, 0.2);
`;

const StatsIcon = styled.div`
  font-size: 24px;
`;

const StatsContent = styled.div`
  flex: 1;
`;

const StatsNumber = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatsLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

export default StatsSection;