import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchResultCard from './SearchResultCard';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { results = [], keyword = '' } = location.state || {};

  const handleSlangClick = (slang) => {
    console.log('신조어 클릭:', slang);
    navigate(`/slangs/${slang.id}`);
  };

  return (
    <Container>
      <HeaderSection>
        <BackButton onClick={() => navigate(-1)}>← 뒤로가기</BackButton>
        <SearchTitle>🔍 "{keyword}" 검색 결과</SearchTitle>
      </HeaderSection>

      <ResultStats>
        총 <strong>{results.length}</strong>개의 신조어를 찾았습니다.
      </ResultStats>

      {results.length === 0 ? (
        <EmptySection>
          <EmptyIcon>🔍</EmptyIcon>
          <EmptyTitle>검색 결과가 없습니다</EmptyTitle>
          <EmptyDescription>
            다른 키워드로 검색해보시거나 새로운 신조어를 등록해보세요!
          </EmptyDescription>
          <CreateButton onClick={() => navigate('/slangs/create')}>
            신조어 등록하기
          </CreateButton>
        </EmptySection>
      ) : (
        <ResultsList>
          {results.map(slang => (
            <SearchResultCard 
              key={slang.id} 
              slang={slang}
              onCardClick={handleSlangClick}
            />
          ))}
        </ResultsList>
      )}
    </Container>
  );
};

// 스타일 컴포넌트들
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #eee;
`;

const BackButton = styled.button`
  padding: 12px 20px;
  background: #f8f9fa;
  border: 2px solid #dee2e6;
  border-radius: 10px;
  cursor: pointer;
  color: #495057;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s;

  &:hover {
    background: #e9ecef;
    transform: translateX(-2px);
  }
`;

const SearchTitle = styled.h1`
  font-size: 2.2em;
  color: #333;
  margin: 0;
  font-weight: bold;
`;

const ResultStats = styled.div`
  background: #e7f3ff;
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom: 25px;
  font-size: 16px;
  color: #0066cc;
  border: 1px solid #b3d9ff;

  strong {
    font-weight: bold;
    color: #004499;
  }
`;

const EmptySection = styled.div`
  text-align: center;
  padding: 100px 20px;
`;

const EmptyIcon = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
`;

const EmptyDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const CreateButton = styled.button`
  padding: 15px 30px;
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: linear-gradient(45deg, #218838, #1ca085);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(40,167,69,0.3);
  }
`;

const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default SearchResultsPage;