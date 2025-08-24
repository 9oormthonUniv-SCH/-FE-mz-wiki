import styled from 'styled-components';

const QuizStats = ({ stats }) => {
  if (!stats || stats.totalQuizzes === 0) return null;

  return (
    <StatsSection>
      <StatCard>
        <StatNumber>{stats.totalQuizzes}</StatNumber>
        <StatLabel>총 문제 수</StatLabel>
      </StatCard>
      <StatCard>
        <StatNumber>{stats.correctCount}</StatNumber>
        <StatLabel>정답 수</StatLabel>
      </StatCard>
      <StatCard>
        <StatNumber>{stats.accuracy}%</StatNumber>
        <StatLabel>정답률</StatLabel>
      </StatCard>
    </StatsSection>
  );
};

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 0.9em;
  opacity: 0.9;
`;

export default QuizStats;