import { Link } from "react-router-dom";
import MagnifierIcon from "./MagnifierIcon";
import ProfileIcon from "./ProfileIcon";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navibar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #7fa6a5;
  height: 80px;
  width: 100%;
  border: 1px solid #3a3a3a;
  padding: 0 30px;
`;

const LogoSection = styled.div`
  font-family: "Gowun Batang", serif;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  &:hover {
    color:black;
  } 
`;

const SearchBox = styled.div`
  position: relative;
  width: 600px;
`;

const SearchText = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 0 45px 0 12px;
  font-size: 14px;
  background-color: #ffffff;
  color: #3a3a3a;
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const StyledMagnifierIcon = styled(MagnifierIcon)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 25px;
  height: 40px;
  pointer-events: none;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 25px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
`;

const ProfileWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #e0e0e0;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    background-color: #d0d0d0;
  }
`;

// 검색 결과 페이지 컴포넌트
const SearchResultsPage = ({ searchResults, loading, error, keyword }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Container>
        <LoadingSection>
          <LoadingSpinner />
          <LoadingText>"{keyword}" 검색 중...</LoadingText>
        </LoadingSection>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorSection>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorText>{error}</ErrorText>
          <RetryButton onClick={() => window.location.reload()}>
            다시 시도
          </RetryButton>
        </ErrorSection>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderSection>
        <BackButton onClick={() => navigate(-1)}>← 뒤로가기</BackButton>
        <SearchTitle>🔍 "{keyword}" 검색 결과</SearchTitle>
      </HeaderSection>

      <ResultStats>
        총 <strong>{searchResults.length}</strong>개의 신조어를 찾았습니다.
      </ResultStats>

      {searchResults.length === 0 ? (
        <EmptySection>
          <EmptyIcon>🔍</EmptyIcon>
          <EmptyTitle>검색 결과가 없습니다</EmptyTitle>
          <EmptyDescription>
            다른 키워드로 검색해보시거나 새로운 신조어를 등록해보세요!
          </EmptyDescription>
          <CreateButton onClick={() => navigate('/create')}>
            신조어 등록하기
          </CreateButton>
        </EmptySection>
      ) : (
        <ResultsList>
          {searchResults.map(slang => (
            <SlangCard key={slang.id}>
              <SlangHeader>
                <SlangTerm>{slang.term}</SlangTerm>
                <LikeCount>❤️ {slang.likeCount}</LikeCount>
              </SlangHeader>
              
              <SlangMeaning>{slang.meaning}</SlangMeaning>
              
              <SlangExample>
                <strong>사용 예시:</strong> "{slang.example}"
              </SlangExample>
            </SlangCard>
          ))}
        </ResultsList>
      )}
    </Container>
  );
};

const Header = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const trimmed = query.trim();
    if (trimmed === "") {
      alert("검색어를 입력해주세요.");
      return;
    }

    if (isSearching) {
      return; // 이미 검색 중이면 중복 요청 방지
    }

    try {
      setIsSearching(true);
      
      console.log('신조어 검색 요청:', trimmed);

      // 🎯 더미 응답 시뮬레이션 (실제 API 호출 대신)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const dummyResults = [
        {
          id: 1,
          term: "갓생",
          meaning: "신과 같은 삶을 살아가는 것, 매우 모범적이고 성실한 생활을 하는 것을 의미합니다.",
          example: "요즘 갓생 살고 있어서 새벽 5시에 일어나서 운동하고 있어.",
          likeCount: 15
        },
        {
          id: 2,
          term: "TMI",
          meaning: "Too Much Information의 줄임말로, 굳이 알려주지 않아도 되는 과도한 정보를 의미합니다.",
          example: "TMI인데 나 어제 라면 3개 먹었어.",
          likeCount: 8
        }
      ].filter(slang => 
        slang.term.toLowerCase().includes(trimmed.toLowerCase()) ||
        slang.meaning.toLowerCase().includes(trimmed.toLowerCase())
      );

      // URL에 검색어와 결과를 포함하여 이동
      navigate(`/search?keyword=${encodeURIComponent(trimmed)}`, {
        state: { results: dummyResults, keyword: trimmed }
      });

      /* 🔹 실제 API 코드
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
      
      const response = await fetch(
        `${API_BASE_URL}/slangs?keyword=${encodeURIComponent(trimmed)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('검색어를 확인해주세요.');
        } else if (response.status === 500) {
          throw new Error('서버 오류가 발생했습니다.');
        } else {
          throw new Error('검색 중 오류가 발생했습니다.');
        }
      }

      const results = await response.json();
      console.log('검색 결과:', results);

      // 검색 결과 페이지로 이동
      navigate(`/search?keyword=${encodeURIComponent(trimmed)}`, {
        state: { results, keyword: trimmed }
      });
      */

    } catch (error) {
      console.error('검색 실패:', error);
      alert(error.message || '검색 중 오류가 발생했습니다.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Navibar>
      <LogoSection>
        <LogoLink to="/">신조어 사전</LogoLink>
      </LogoSection>

      <SearchBox>
        <SearchText 
          type="text" 
          placeholder={isSearching ? "검색 중..." : "검색어 입력"} 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          onKeyDown={handleKeyDown}
          disabled={isSearching}
        />
        <IconWrapper onClick={handleSearch} disabled={isSearching}>
          <StyledMagnifierIcon size={20} color="#333"/>
        </IconWrapper>
      </SearchBox>

      <ProfileWrapper to="/user">
        <ProfileIcon size={40} />
      </ProfileWrapper>
    </Navibar>
  );
};

// 검색 결과 페이지용 스타일 컴포넌트들
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

const LoadingSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #666;
`;

const ErrorSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 50px 20px;
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 15px;
  margin: 50px 0;
`;

const ErrorIcon = styled.span`
  font-size: 24px;
`;

const ErrorText = styled.span`
  font-weight: bold;
  flex: 1;
  text-align: center;
`;

const RetryButton = styled.button`
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #c82333;
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

const SlangCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  }
`;

const SlangHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const SlangTerm = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  margin: 0;
`;

const LikeCount = styled.span`
  font-size: 14px;
  color: #e74c3c;
  font-weight: bold;
`;

const SlangMeaning = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin: 0 0 15px 0;
`;

const SlangExample = styled.div`
  padding: 12px 16px;
  background-color: #f5f5edff;
  border-left: 4px solid #ffc107;
  border-radius: 5px;
  font-size: 14px;
  color: #856404;
  line-height: 1.5;

  strong {
    color: #533f03;
  }
`;

export default Header;
export { SearchResultsPage };