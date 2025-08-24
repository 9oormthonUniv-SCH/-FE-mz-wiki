import styled from 'styled-components';
import SlangCard from './SlangCard';

const SlangGrid = ({ slangs, onSlangClick, onUnlike }) => {
  return (
    <Grid>
      {slangs.map((slang) => (
        <SlangCard
          key={slang.id}
          slang={slang}
          onSlangClick={onSlangClick}
          onUnlike={onUnlike}
        />
      ))}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export default SlangGrid;