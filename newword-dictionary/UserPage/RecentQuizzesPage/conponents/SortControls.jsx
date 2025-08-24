import styled from 'styled-components';

const SortControls = ({ sortBy, onSortChange, hasData }) => {
  if (!hasData) return null;

  return (
    <SortSection>
      <SortTitle>정렬:</SortTitle>
      <SortButtons>
        <SortButton 
          $active={sortBy === 'latest'} 
          onClick={() => onSortChange('latest')}
        >
          최신순
        </SortButton>
        <SortButton 
          $active={sortBy === 'oldest'} 
          onClick={() => onSortChange('oldest')}
        >
          오래된순
        </SortButton>
      </SortButtons>
    </SortSection>
  );
};

const SortSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

const SortTitle = styled.h3`
  margin: 0;
  color: #495057;
  font-size: 16px;
  font-weight: bold;
`;

const SortButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const SortButton = styled.button`
  padding: 10px 20px;
  border: 2px solid ${props => props.$active ? '#007bff' : '#e9ecef'};
  background: ${props => props.$active ? '#007bff' : 'white'};
  color: ${props => props.$active ? 'white' : '#495057'};
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #007bff;
    background: ${props => props.$active ? '#0056b3' : '#e7f3ff'};
  }
`;

export default SortControls;