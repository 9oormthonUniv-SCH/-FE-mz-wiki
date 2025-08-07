import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SearchResultsPage } from './Header';

const SearchPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    // location.state에서 결과가 있으면 사용, 없으면 API 재호출
    if (location.state?.results) {
      setSearchResults(location.state.results);
    } else if (keyword) {
      fetchSearchResults(keyword);
    }
  }, [keyword, location.state]);

  const fetchSearchResults = async (searchKeyword) => {
    try {
      setLoading(true);
      setError('');

      console.log('검색어로 신조어 검색:', searchKeyword);

      // 🎯 더미 응답 시뮬레이션
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
        slang.term.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        slang.meaning.toLowerCase().includes(searchKeyword.toLowerCase())
      );

      setSearchResults(dummyResults);

      /* 🔹 실제 API 코드 (주석 처리)
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
      
      const response = await fetch(
        `${API_BASE_URL}/slangs?keyword=${encodeURIComponent(searchKeyword)}`,
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
      setSearchResults(results);
      */

    } catch (err) {
      console.error('검색 실패:', err);
      setError(err.message || '검색 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchResultsPage 
      searchResults={searchResults}
      loading={loading}
      error={error}
      keyword={keyword}
    />
  );
};

export default SearchPage;