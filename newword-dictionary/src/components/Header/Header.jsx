import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Logo from "./Logo";
import ProfileSection from "./ProfileSection";
import SearchBox from "./SearchBox";

const Header = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  
  const handleSearch = async () => {
    const trimmed = query.trim();
    if (trimmed === "") {
      alert("검색어를 입력해주세요");
      return;
    }

    if (isSearching) {
      return; // 중복 요청 방지
    }

    try {
      setIsSearching(true);
      console.log("신조어 검색 요청:", trimmed);
      
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${API_BASE_URL}/slangs?keyword=${encodeURIComponent(trimmed)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("응답 url:", response.url);
      console.log("검색 API 응답 상태:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("검색 에러 응답:", errorText);
        
        if (response.status === 400) {
          throw new Error('검색어를 확인해주세요.');
        } else if (response.status === 404) {
          throw new Error('검색 결과를 찾을 수 없습니다.');
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

    } catch (error) {
      console.error("검색 실패:", error);
      alert(error.message || "검색 중 오류가 발생했습니다");
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
      <Logo />

      <SearchBox 
        query={query} 
        onQueryChange={setQuery} 
        onSearch={handleSearch} 
        onKeyDown={handleKeyDown} 
        isSearching={isSearching} 
      />

      <ProfileSection />
    </Navibar>
  );
};

const Navibar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #7fa6a5;
  height: 80px;
  width: 100%;
  border: 1px solid #3a3a3a;
  padding: 0 30px;
`;

export default Header;