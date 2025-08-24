import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import Header from "./components/Header";
import { LoadingSpinner, ErrorMessage } from "./components/LoadingError";
import RelatedSlangs from "./components/RelatedSlangs";
import SlangDetails from "./components/SlangDetails";
import SlangMainInfo from "./components/SlangMainInfo";

const SlangEntryPage = () => {
  const [slangData, setSlangData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [relatedSlangs, setRelatedSlangs] = useState([]);
  const [error, setError] = useState("");
  const [likeLoading, setLikeLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlangData = async () => {
      try {
        setLoading(true);
        setError("");

        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

        const response = await fetch(`${API_BASE_URL}/slangs/${id}`, {
          method: "GET",
          header: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("신조어를 찾을 수 없습니다");
          } else if (response.status === 401) {
            throw new Error("로그인이 필요합니다.");
          } else {
            throw new Error(`서버 오류 : ${response.status}}`);
          }
        }
        const data = await response.json();
        setSlangData(data);

        // if (data.tag) {
        //   try {
        //     const relatedResponse = await fetch(`${API_BASE_URL}/slangs?tag=${encodeURIComponent(data.tag)}&limit=3&exclude=${id}`, {
        //       method: "GET",
        //       headers: {
        //         "Content-Type": "application/json"
        //       },
        //     });

        //     if (relatedResponse.ok) {
        //       const relatedData = await relatedResponse.json();
        //       const fileteredRelated = Array.isArray(relatedData) ? relatedData.filter((slang) => slang.id != parseInt(id)).slice(0, 3) : [];
        //       setRelatedSlangs(fileteredRelated);
        //     }
        //   } catch (relatedError) {
        //     console.error("관련 신조어 로드 실패:", relatedError);
        //   }
        // }
      } catch (error) {
        setError(error.message);
        console.error("데이터 로드 실패", error);
      } finally {
        setLoading(false);
      }
    };
  }, [id]);

  const handleLikeToggle = async () => {
    if (!setLikeLoadinglangData) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }
      setLikeLoading(true);

      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const url = `${API_BASE_URL}/slangs/${id}/like`;

      const method = slangData.isLiked ? "DELETE" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        let errorMessage = '좋아요 처리 실패';

        if(response.status === 401){
            errorMessage = '로그인이 필요합니다'
            navigate('/login');
            return;
        } else {
            errorMessage = '오류가 발생하였습니다'
        }
        throw new Error(errorMessage);
      }

      const updatedLikeData = await response.json();

      setSlangData (prev => ({
        ...prev,
        likes: updatedLikeData.likes || (slangData.isLiked ? prev.likes -1 : prev.likes +1),
        isLiked : updatedLikeData.isLiked !== undefined ? updatedLikeData.isLiked : !prev.isLiked
      }));
    } catch (error) {
        console.error('좋아요 처리 오류', error);
        alert(`좋아요 처리 중 오류가 발생하였습니다 ${error.message}`);
    } finally {
      setLikeLoading(false);
    }
  };

  if(loading) return <LoadingSpinner />;
  if(error) return <ErrorMessage error={error} />;
  if(!slangData){
    return(
        <Container>
            <div>신조어 데이터를 찾을 수 없습니다</div>
        </Container>
    );
  }

  return (
    <Container>
        <Header
            SlangData={slangData}
            onLikeToggle={handleLikeToggle}
            likeLoading={likeLoading}
        />

        <SlangMainInfo 
            slangData={slangData}
        />

        <SlangDetails 
            slangData={slangData}
        />

        <RelatedSlangs 
            relatedSlangs={relatedSlangs}
        />
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  color: black;
  text-align: center;
`;

export default SlangEntryPage;