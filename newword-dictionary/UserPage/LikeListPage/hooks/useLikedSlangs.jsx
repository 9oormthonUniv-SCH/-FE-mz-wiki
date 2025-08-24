import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useLikedSlangs = () => {
  const [likedSlangs, setLikedSlangs] = useState([]); // 좋아요한 신조어 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(""); // 에러 메시지

  const navigate = useNavigate(); // 페이지 이동

  // 좋아요한 신조어 목록 가져오기
  const fetchLikedSlangs = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${API_BASE_URL}/api/user/liked-slangs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          localStorage.clear();
          window.location.href = "/login";
          return;
        } else if (response.status === 404) {
          setLikedSlangs([]);
          return;
        } else {
          throw new Error(`서버 오류: ${response.status}`);
        }
      }

      const data = await response.json();
      const slangsArray = Array.isArray(data) ? data : data.slangs || data.data || [];
      setLikedSlangs(slangsArray);
    } catch (err) {
      console.error("좋아요 신조어 목록 로드 실패:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 좋아요 취소
  const handleUnlike = async (slangId) => {
    try {
      const token = localStorage.getItem("token");
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${API_BASE_URL}/api/slangs/${slangId}/unlike`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert("세션이 만료되었습니다.");
          localStorage.clear();
          window.location.href = "/login";
          return;
        }
        throw new Error("좋아요 취소에 실패했습니다.");
      }

      // 로컬 상태에서 해당 신조어 제거
      setLikedSlangs((prev) => prev.filter((slang) => slang.id !== slangId));
    } catch (err) {
      console.error("좋아요 취소 실패:", err);
      alert("좋아요 취소에 실패했습니다.");
    }
  };

  // 신조어 클릭 (상세 페이지로 이동)
  const handleSlangClick = (slangId) => {
    navigate(`/slangs/${slangId}`);
  };

  // 정렬된 신조어 목록 반환
  const getSortedSlangs = (sortBy) => {
    let sorted = [...likedSlangs];

    switch (sortBy) {
      case "latest":
        sorted.sort((a, b) => new Date(b.likedAt || b.createdAt) - new Date(a.likedAt || a.createdAt));
        break;
      case "oldest":
        sorted.sort((a, b) => new Date(a.likedAt || a.createdAt) - new Date(b.likedAt || b.createdAt));
        break;
      default:
        break;
    }

    return sorted;
  };

  // 재시도 함수
  const refetch = () => {
    fetchLikedSlangs();
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchLikedSlangs();
  }, []);

  return {
    likedSlangs,
    loading,
    error,
    handleUnlike,
    handleSlangClick,
    getSortedSlangs,
    refetch,
  };
};

export default useLikedSlangs;
