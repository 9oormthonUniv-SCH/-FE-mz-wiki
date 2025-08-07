import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// 더미 데이터 import
import { dummySlangs } from '../src/data/dummyData';

const LikedSlangsPage = () => {
  const [likedSlangs, setLikedSlangs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('latest'); // 정렬 옵션: latest, oldest
  
  const navigate = useNavigate();

  // 더미 데이터로 좋아요한 신조어 목록 가져오기
  useEffect(() => {
    const fetchLikedSlangs = async () => {
      try {
        setLoading(true);
        setError('');

        // 더미 데이터 시뮬레이션을 위한 딜레이
        await new Promise(resolve => setTimeout(resolve, 800));

        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('로그인이 필요합니다.');
        }

        console.log('더미 데이터로 좋아요 목록 로드');

        // 🎯 dummySlangs에서 isLiked가 true인 신조어들을 가져오기
        const currentLikedSlangs = dummySlangs
          .filter(slang => slang.isLiked)
          .map(slang => ({
            ...slang,
            likedAt: new Date().toISOString().split('T')[0] // 임시 좋아요 날짜
          }));

        console.log('현재 좋아요된 신조어들:', currentLikedSlangs);
        setLikedSlangs(currentLikedSlangs);

        /* 🔹 실제 API 코드 (주석 처리)
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
        
        const response = await fetch(`${API_BASE_URL}/slangs/likes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
            throw new Error('로그인이 필요합니다.');
          } else if (response.status === 403) {
            throw new Error('접근 권한이 없습니다.');
          } else {
            throw new Error(`서버 오류: ${response.status}`);
          }
        }

        const data = await response.json();
        const slangsArray = Array.isArray(data) ? data : (data.slangs || data.data || []);
        setLikedSlangs(slangsArray);
        */

      } catch (err) {
        console.error('좋아요 목록 로드 실패:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedSlangs();
  }, [navigate]);

  // 🎯 페이지 포커스 시 좋아요 목록 새로고침 (EntryPage에서 좋아요 변경 시 반영)
  useEffect(() => {
    const handleFocus = () => {
      // dummySlangs에서 isLiked가 true인 신조어들을 다시 가져오기
      const currentLikedSlangs = dummySlangs
        .filter(slang => slang.isLiked)
        .map(slang => ({
          ...slang,
          likedAt: slang.likedAt || new Date().toISOString().split('T')[0]
        }));

      setLikedSlangs(currentLikedSlangs);
      console.log('좋아요 목록 업데이트:', currentLikedSlangs);
    };

    // 페이지 포커스 시 업데이트
    window.addEventListener('focus', handleFocus);
    
    // 주기적으로 업데이트 (1초마다)
    const interval = setInterval(handleFocus, 1000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  // 🎯 좋아요 취소 처리 (더미 데이터 버전)
  const handleUnlike = async (slangId, slangTitle) => {
    const confirmUnlike = window.confirm(`'${slangTitle}'의 좋아요를 취소하시겠습니까?`);
    
    if (!confirmUnlike) return;

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      // 더미 데이터에서 즉시 제거 (API 호출 시뮬레이션)
      await new Promise(resolve => setTimeout(resolve, 300)); // 0.3초 딜레이로 API 호출 시뮬레이션

      console.log(`더미 데이터에서 ${slangTitle} 좋아요 취소`);
      
      // 원본 dummySlangs에서 isLiked 상태 변경
      const slangIndex = dummySlangs.findIndex(slang => slang.id === slangId);
      if (slangIndex !== -1) {
        dummySlangs[slangIndex].isLiked = false;
        dummySlangs[slangIndex].likes = Math.max(0, dummySlangs[slangIndex].likes - 1);
      }

      // 화면에서 제거
      setLikedSlangs(prev => prev.filter(slang => slang.id !== slangId));

      console.log(`${slangTitle} 좋아요 취소 완료`);

      /* 🔹 실제 API 코드
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

      const response = await fetch(`${API_BASE_URL}/slangs/${slangId}/like`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setLikedSlangs(prev => prev.filter(slang => slang.id !== slangId));
        console.log(`${slangTitle} 좋아요 취소 완료`);
      } else {
        throw new Error('좋아요 취소 실패');
      }
      */
      
    } catch (error) {
      console.error('좋아요 취소 오류:', error);
      alert('좋아요 취소 중 오류가 발생했습니다.');
    }
  };

  // 🎯 신조어 클릭 시 상세 페이지로 이동
  const handleSlangClick = (slangId) => {
    navigate(`/slangs/${slangId}`);
  };

  // 🎯 정렬된 목록 반환
  const getSortedSlangs = () => {
    let sorted = [...likedSlangs];

    // 정렬
    switch (sortBy) {
      case 'latest':
        sorted.sort((a, b) => new Date(b.likedAt || b.createdAt) - new Date(a.likedAt || a.createdAt));
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.likedAt || a.createdAt) - new Date(b.likedAt || b.createdAt));
        break;
      default:
        break;
    }

    return sorted;
  };

  const sortedSlangs = getSortedSlangs();

  // 로딩 상태
  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <div>좋아요한 신조어 목록을 불러오는 중...</div>
          <div>❤️</div>
        </LoadingSpinner>
      </Container>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <Container>
        <ErrorMessage>
          <h2>⚠️ 오류 발생</h2>
          <p>{error}</p>
          <ErrorButtons>
            <button onClick={() => window.location.reload()}>다시 시도</button>
            <button onClick={() => navigate('/')}>홈으로 돌아가기</button>
          </ErrorButtons>
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      {/* 헤더 섹션 */}
      <HeaderSection>
        <BackButton onClick={() => navigate(-1)}>← 뒤로가기</BackButton>
        <PageTitle>❤️ 좋아요한 신조어</PageTitle>
      </HeaderSection>

      {/* 정렬 컨트롤 */}
      {likedSlangs.length > 0 && (
        <SortSection>
          <SortTitle>정렬:</SortTitle>
          <SortButtons>
            <SortButton 
              $active={sortBy === 'latest'} 
              onClick={() => setSortBy('latest')}
            >
              최신순
            </SortButton>
            <SortButton 
              $active={sortBy === 'oldest'} 
              onClick={() => setSortBy('oldest')}
            >
              오래된순
            </SortButton>
          </SortButtons>
        </SortSection>
      )}

      {/* 신조어 목록 */}
      <ContentSection>
        {likedSlangs.length === 0 ? (
          <EmptyState>
            <EmptyIcon>💔</EmptyIcon>
            <EmptyTitle>아직 좋아요한 신조어가 없어요</EmptyTitle>
            <EmptyDescription>
              마음에 드는 신조어를 찾아서 좋아요를 눌러보세요!
            </EmptyDescription>
            <GoHomeButton onClick={() => navigate('/')}>
              신조어 둘러보기
            </GoHomeButton>
          </EmptyState>
        ) : (
          <>
            {/* 🎯 2열로 표시되는 그리드 */}
            <SlangGrid>
              {sortedSlangs.map((slang) => (
                <SlangCard key={slang.id}>
                  <CardHeader>
                    <TagBadge>{slang.tag}</TagBadge>
                    <UnlikeButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnlike(slang.id, slang.title);
                      }}
                      title="좋아요 취소"
                    >
                      💔
                    </UnlikeButton>
                  </CardHeader>

                  <CardContent onClick={() => handleSlangClick(slang.id)}>
                    <SlangTitle>{slang.title}</SlangTitle>
                    <SlangSummary>{slang.summary}</SlangSummary>
                    
                    <CardFooter>
                      <LikeInfo>❤️ {slang.likes || 0}</LikeInfo>
                      {slang.likedAt && (
                        <LikedDate>
                          좋아요: {new Date(slang.likedAt).toLocaleDateString()}
                        </LikedDate>
                      )}
                    </CardFooter>
                  </CardContent>
                </SlangCard>
              ))}
            </SlangGrid>

            {/* 결과 요약 */}
            <ResultSummary>
              총 {likedSlangs.length}개의 좋아요한 신조어
            </ResultSummary>
          </>
        )}
      </ContentSection>
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

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 80px 20px;
  
  div:first-child {
    font-size: 18px;
    color: #666;
    margin-bottom: 15px;
  }
  
  div:last-child {
    font-size: 32px;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: #ffebee;
  border-radius: 15px;
  border: 2px solid #ffcdd2;
  margin: 40px 0;

  h2 {
    color: #d32f2f;
    margin-bottom: 15px;
    font-size: 24px;
  }

  p {
    color: #d32f2f;
    font-size: 16px;
    margin-bottom: 25px;
    line-height: 1.5;
  }
`;

const ErrorButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;

  button {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;

    &:first-child {
      background: #007bff;
      color: white;

      &:hover {
        background: #0056b3;
      }
    }

    &:last-child {
      background: #6c757d;
      color: white;

      &:hover {
        background: #545b62;
      }
    }
  }
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

const PageTitle = styled.h1`
  font-size: 2.2em;
  color: #333;
  margin: 0;
  font-weight: bold;
`;

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

const ContentSection = styled.div`
  min-height: 400px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: #f8f9fa;
  border-radius: 20px;
  border: 2px dashed #dee2e6;
`;

const EmptyIcon = styled.div`
  font-size: 4em;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.h2`
  color: #495057;
  margin-bottom: 15px;
  font-size: 1.8em;
`;

const EmptyDescription = styled.p`
  color: #6c757d;
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const GoHomeButton = styled.button`
  background: linear-gradient(45deg, #007bff, #0056b3);
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,123,255,0.3);
  }
`;

const SlangGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
`;

const SlangCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  border: 2px solid #f8f9fa;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    border-color: #007bff;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px 10px 20px;
`;

const TagBadge = styled.span`
  background: linear-gradient(45deg, #007bff, #0056b3);
  color: white;
  padding: 6px 14px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
`;

const UnlikeButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s;

  &:hover {
    background: #ffebee;
    transform: scale(1.2);
  }
`;

const CardContent = styled.div`
  padding: 0 20px 20px 20px;
  cursor: pointer;
`;

const SlangTitle = styled.h3`
  color: #333;
  margin-bottom: 12px;
  font-size: 1.5em;
  font-weight: bold;
`;

const SlangSummary = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 1.05em;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #f1f3f4;
`;

const LikeInfo = styled.div`
  color: #ff6b6b;
  font-weight: bold;
  font-size: 15px;
`;

const LikedDate = styled.div`
  color: #adb5bd;
  font-size: 13px;
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