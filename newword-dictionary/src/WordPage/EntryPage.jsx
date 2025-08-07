import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const EntryPage = () => {
  const [slangData, setSlangData] = useState(null);
  const [relatedSlangs, setRelatedSlangs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likeLoading, setLikeLoading] = useState(false); // 좋아요 처리 로딩 상태
  
  const { id } = useParams();
  const navigate = useNavigate();

  // API에서 신조어 데이터 가져오기
  useEffect(() => {
    const fetchSlangData = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem('token');
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

        console.log('신조어 데이터 요청:', `${API_BASE_URL}/slangs/${id}`);

        // 신조어 상세 정보 API 호출
        const response = await fetch(`${API_BASE_URL}/slangs/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        });

        console.log('API 응답 상태:', response.status);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('신조어를 찾을 수 없습니다.');
          } else if (response.status === 401) {
            throw new Error('로그인이 필요합니다.');
          } else {
            throw new Error(`서버 오류: ${response.status}`);
          }
        }

        const data = await response.json();
        console.log('받아온 신조어 데이터:', data);
        
        setSlangData(data);

        // 같은 태그의 관련 신조어 가져오기
        if (data.tag) {
          try {
            const relatedResponse = await fetch(
              `${API_BASE_URL}/slangs?tag=${encodeURIComponent(data.tag)}&limit=3&exclude=${id}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  ...(token && { 'Authorization': `Bearer ${token}` })
                }
              }
            );

            if (relatedResponse.ok) {
              const relatedData = await relatedResponse.json();
              // 현재 신조어 제외하고 최대 3개만
              const filteredRelated = Array.isArray(relatedData) 
                ? relatedData.filter(slang => slang.id !== parseInt(id)).slice(0, 3)
                : [];
              setRelatedSlangs(filteredRelated);
            }
          } catch (relatedError) {
            console.error('관련 신조어 로드 실패:', relatedError);
            // 관련 신조어는 실패해도 메인 데이터는 표시
          }
        }

      } catch (err) {
        setError(err.message);
        console.error("데이터 로드 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSlangData();
    }
  }, [id]);

  // 좋아요 토글 API 호출 (POST/DELETE)
  const handleLikeToggle = async () => {
    if (!slangData) return;

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      setLikeLoading(true); // 좋아요 로딩 시작
      
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const url = `${API_BASE_URL}/slangs/${id}/like`;
      
      // 현재 좋아요 상태에 따라 POST 또는 DELETE 결정
      const method = slangData.isLiked ? 'DELETE' : 'POST';
      
      console.log('좋아요 API 요청:', method, url);
      console.log('현재 좋아요 상태:', slangData.isLiked);
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('좋아요 API 응답 상태:', response.status);

      if (!response.ok) {
        let errorMessage = '좋아요 처리 실패';
        
        if (response.status === 401) {
          errorMessage = '로그인이 필요합니다.';
          navigate('/login');
          return;
        } else if (response.status === 403) {
          errorMessage = '권한이 없습니다.';
        } else if (response.status === 404) {
          errorMessage = '신조어를 찾을 수 없습니다.';
        } else if (response.status === 500) {
          errorMessage = '서버 오류가 발생했습니다.';
        }
        
        throw new Error(errorMessage);
      }

      // 업데이트된 좋아요 정보 받기
      const updatedLikeData = await response.json();
      console.log('좋아요 업데이트 응답:', updatedLikeData);
      
      // 상태 업데이트
      setSlangData(prev => ({
        ...prev,
        likes: updatedLikeData.likes || (slangData.isLiked ? prev.likes - 1 : prev.likes + 1),
        isLiked: updatedLikeData.isLiked !== undefined ? updatedLikeData.isLiked : !prev.isLiked
      }));

      // 성공 피드백
      console.log(updatedLikeData.isLiked ? '좋아요 추가됨' : '좋아요 취소됨');

    } catch (error) {
      console.error('좋아요 처리 오류:', error);
      alert(`좋아요 처리 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setLikeLoading(false); // 좋아요 로딩 종료
    }
  };

  // 신조어 수정하기 (PUT 요청을 위한 페이지 이동)
  const handleEdit = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    // 수정 페이지로 이동
    navigate(`/slangs/${id}/edit`);
  };

  // 관련 신조어 클릭 처리
  const handleRelatedSlangClick = (slangId) => {
    navigate(`/slangs/${slangId}`);
  };

  // 로딩/에러 처리
  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <div>신조어 정보를 불러오는 중...</div>
          <div>⏳</div>
        </LoadingSpinner>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container>
        <ErrorMessage>
          <p>오류: {error}</p>
          <ErrorButtons>
            <button onClick={() => window.location.reload()}>다시 시도</button>
            <button onClick={() => navigate('/')}>홈으로 돌아가기</button>
          </ErrorButtons>
        </ErrorMessage>
      </Container>
    );
  }
  
  if (!slangData) {
    return (
      <Container>
        <ErrorMessage>신조어 데이터를 찾을 수 없습니다.</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      {/*헤더 섹션 */}
      <HeaderSection>
        <BackButton onClick={() => navigate(-1)}>← 뒤로가기</BackButton>
        <LikeEditSection>
          <LikeButton 
            $isLiked={slangData.isLiked} 
            onClick={handleLikeToggle}
            disabled={likeLoading}
          >
            {likeLoading ? (
              '처리중...'
            ) : (
              <>
                {slangData.isLiked ? "❤️" : "🤍"} {slangData.likes}
              </>
            )}
          </LikeButton>
          <EditBtn onClick={handleEdit}>수정하기</EditBtn>
        </LikeEditSection>
      </HeaderSection>

      {/*메인 정보 */}
      <MainContent>
        <Title>{slangData.title}</Title>
        <TagBadge>{slangData.tag}</TagBadge>
        <Summary>{slangData.summary}</Summary>
      </MainContent>

      {/*상세 설명 */}
      <DetailSection>
        <SectionTitle>📖 상세 설명</SectionTitle>
        <Description>{slangData.definition}</Description>
      </DetailSection>

      {/*사용 예시 */}
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

      {/*기타 정보 */}
      <InfoSection>
        {slangData.origin && (
          <InfoItem>
            <InfoLabel>어원:</InfoLabel>
            <InfoValue>{slangData.origin}</InfoValue>
          </InfoItem>
        )}
        {slangData.pronunciation && (
          <InfoItem>
            <InfoLabel>발음:</InfoLabel>
            <InfoValue>{slangData.pronunciation}</InfoValue>
          </InfoItem>
        )}
        {slangData.createdAt && (
          <InfoItem>
            <InfoLabel>등록일:</InfoLabel>
            <InfoValue>{new Date(slangData.createdAt).toLocaleDateString()}</InfoValue>
          </InfoItem>
        )}
      </InfoSection>

      {/*신조어 추천 */}
      {relatedSlangs.length > 0 && (
        <RecommendSection>
          <SectionTitle>🔗 '{slangData.tag}' 관련 신조어</SectionTitle>
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
      )}
    </Container>
  );
};

//스타일 컴포넌트들
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  color: black;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 50px;
  
  div:first-child {
    font-size: 18px;
    color: #666;
    margin-bottom: 10px;
  }
  
  div:last-child {
    font-size: 24px;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 50px;
  color: #d32f2f;
  background: #ffebee;
  border-radius: 10px;
  border: 1px solid #ffcdd2;
  
  p {
    font-size: 16px;
    margin-bottom: 20px;
    font-weight: bold;
  }
`;

const ErrorButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  
  button {
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
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
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  padding: 8px 16px;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  color: black;
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    background: #e0e0e0;
  }
`;

const LikeEditSection = styled.div`
  display: flex;
  gap: 15px;
`;

const LikeButton = styled.button`
  padding: 12px 24px;
  background: ${(props) => {
    if (props.disabled) return '#cccccc';
    return props.$isLiked ? "#ff6b6b" : "#f0f0f0";
  }};
  color: ${(props) => {
    if (props.disabled) return '#666666';
    return props.$isLiked ? "white" : "#333";
  }};
  border: 2px solid ${(props) => {
    if (props.disabled) return '#cccccc';
    return props.$isLiked ? "#ff6b6b" : "#ddd";
  }};
  border-radius: 25px;
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
  font-weight: bold;
  transition: all 0.3s;
  min-width: 120px; /* 버튼 크기 고정 */

  &:hover:not(:disabled) {
    background: ${(props) => (props.$isLiked ? "#ff5252" : "#e0e0e0")};
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;

const EditBtn = styled.button`
  background: #8aa7a6ff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    background-color: #6d8584;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MainContent = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  background: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 15px;
  color: #333;
  font-weight: bold;
`;

const TagBadge = styled.span`
  background: #007bff;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 20px;
  display: inline-block;
`;

const Summary = styled.p`
  font-size: 1.3em;
  color: #555;
  line-height: 1.6;
  margin-top: 15px;
  font-weight: 500;
`;

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

export default EntryPage;