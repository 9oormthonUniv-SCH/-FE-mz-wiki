import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SlangListPage = () => {
  const [slangs, setSlangs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const itemsPerPage = 10;

  // 데이터 로딩
  useEffect(() => {
    const loadSlangs = async () => {

      try {
        setLoading(true);
        setError('')

        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${API_BASE_URL}/slangs?page=${page}&limit=${itemsPerPage}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if(!response.ok){
          throw new Error('신조어 목록을 가져올 수 없습니다')
        }
        
        const data = await response.json();

        if(Array.isArray(data)) {
          setSlangs(data);
        } else if (data.slangs) {
          setSlangs(data.slangs);
          setTotalPages(data.totalPages || 1);
        }

      } catch (error) {
        setError(error.messgae);
        console.log("신조어 로드 실패", error);
      } finally {
        setLoading(false);
      }
    };

    loadSlangs();
  },[page]);

  // 좋아요 토글 함수
  const handleLikeToggle = (slangId) => {
    setEntries((prevSlangs) =>
      prevSlangs.map((slang) =>
        slang.id === slangId
          ? {
              ...slang,
              isLiked: !slang.isLiked,
              likes: slang.isLiked ? slang.likes - 1 : slang.likes + 1,
            }
          : slang
      )
    );
  };

  // 로딩 상태
  if (loading) {
    return (
      <EntrySection>
        <LoadingSection>신조어 불러오는 중</LoadingSection>
      </EntrySection>
    );
  }

  if(error) {
    return (
      <EntrySection>
        <ErrorDiv>오류: {error}</ErrorDiv>
      </EntrySection>
    )
  }

  return (
    <EntrySection>
      {/* 헤더 */}
      <EntryHeader>
        <EntryTitle>신조어 둘러보기</EntryTitle>
      </EntryHeader>

      {slangs.length > 0 ? (
        <SlangCardList>
          {slangs.map((slang) => (
            <div key={slang.id} onLikeToggle={handleLikeToggle}>
              {slang.term}
            </div>
          ))}
        </SlangCardList>
      ) : (
        // 신조어가 빈 상태
        <EmptyState>
          <EmptyIcon>📝</EmptyIcon>
          <EmptyText>
            신조어가 아직 없습니다.
            <br />
            새로운 신조어를 등록해보세요!
          </EmptyText>
        </EmptyState>
      )}
    </EntrySection>
  );
};

// 스타일드 컴포넌트
const EntrySection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  margin: 20px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 600px;
  overflow-y: auto;
`;

const EntryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 15px;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
`;

const EntryTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 18px;
`;

const SlangCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const LoadingSection = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.6;
`;

const EmptyText = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
`;

export default SlangListPage;