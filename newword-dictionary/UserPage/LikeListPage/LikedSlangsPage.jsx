import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 커스텀 훅
import useLikedSlangs from './hooks/useLikedSlangs';

// 컴포넌트들
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import UserPageHeader from '../components/UserPageHeader';
import SortControls from './components/SortControls';
import SlangGrid from './components/SlangGrid';
import EmptyState from './components/EmptyState';

const LikedSlangsPage = () => {
  const [sortBy, setSortBy] = useState('latest');
  const navigate = useNavigate();
  
  const {
    likedSlangs,
    loading,
    error,
    handleUnlike,
    handleSlangClick,
    getSortedSlangs,
    refetch
  } = useLikedSlangs();

  // 정렬된 신조어 목록
  const sortedSlangs = getSortedSlangs(sortBy);

  // 로딩 상태
  if (loading) {
    return (
      <LoadingSpinner
        message="좋아요 신조어 목록을 불러오는"
        icon="♥️"
      />
    );
  }

  // 에러 상태
  if (error) {
    return (
      <ErrorMessage 
        error={error} 
        onRetry={refetch}
      />
    );
  }

  return (
    <Container>
      {/* 헤더 */}
      <UserPageHeader
        title="❤️ 좋아요한 신조어"
        onBack={() => navigate(-1)}
      />

      {/* 정렬 컨트롤 (좋아요한 신조어가 있을 때만) */}
      {likedSlangs.length > 0 && (
        <SortControls 
          sortBy={sortBy} 
          onSortChange={setSortBy} 
        />
      )}

      {/* 메인 컨텐츠 */}
      <ContentSection>
        {likedSlangs.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <SlangGrid 
              slangs={sortedSlangs}
              onSlangClick={handleSlangClick}
              onUnlike={handleUnlike}
            />
            <ResultSummary>
              총 {likedSlangs.length}개의 좋아요한 신조어
            </ResultSummary>
          </>
        )}
      </ContentSection>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
`;

const ContentSection = styled.div`
  min-height: 400px;
`;

const ResultSummary = styled.div`
  text-align: center;
  padding: 25px;
  background: #e9ecef;
  border-radius: 15px;
  color: #495057;
  font-weight: bold;
  font-size: 16px;
`;

export default LikedSlangsPage;