import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import CreatePageHeader from "./components/CreatePageHeader";
import InfoGuide from "./components/InfoGuide";
import PreviewCard from "./components/PreviewCard";
import SlangInputForm from "./components/SlangInputForm";

const SlangCreatePage = () => {
  const [formData, setFormData] = useState({
    term: "",
    meaning: "",
    example: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();

  //입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    //실시간 에러 초기화 - 사용자가 입력하면 해당 필드 에러 제거
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    //전체 에러 메시지 초기화
    if (error) {
      setError("");
    }
  };

  //클라이언트 유효성 검사 함수
  const validateForm = () => {
    const errors = {};

    // 신조어 유효성 검사
    if (!formData.term.trim()) {
      errors.term = "신조어를 입력해주세요";
    } else if (formData.term.length > 50) {
      errors.term = "신조어는 50글자 이하로 입력해주세요";
    }

    // 의미 유효성 검사
    if (!formData.meaning.trim()) {
      errors.meaning = "의미를 입력해주세요.";
    } else if (formData.meaning.length < 5) {
      errors.meaning = "의미는 5글자 이상 입력해주세요.";
    } else if (formData.meaning.length > 200) {
      errors.meaning = "의미는 200글자 이하로 입력해주세요.";
    }

    // 예시 유효성 검사
    if (!formData.example.trim()) {
      errors.example = "사용 예시를 입력해주세요.";
    } else if (formData.example.length < 5) {
      errors.example = "사용 예시는 5글자 이상 입력해주세요.";
    } else if (formData.example.length > 100) {
      errors.example = "사용 예시는 100글자 이하로 입력해주세요.";
    }

    return errors;
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("폼 제출 시작");

    //클라이언트 유효성 검사
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return; // 유효성 검사 실패 시 API 호출하지 않음
    }

    try {
      //로딩 상태 시작 및 에러 초기화
      setLoading(true);
      setError("");
      setValidationErrors({});

      const token = localStorage.getItem("token");
      console.log("신조어 등록 요청", formData);

      //API 호출
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${API_BASE_URL}/slangs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          term: formData.term.trim(),
          meaning: formData.meaning.trim(),
          example: formData.example.trim(),
        }),
      });

      console.log('응답 상태', response.status);

      //응답 상태 코드별 에러 처리
      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          if (errorData.errors) {
            // 서버에서 온 유효성 검사 에러를 상태에 설정
            setValidationErrors(errorData.errors);
            return;
          }
          throw new Error(errorData.message || "입력 정보를 확인해주세요.");
        } else if (response.status === 401) {
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.clear();
          window.location.href = '/login';
        } else if (response.status === 409) {
          throw new Error("이미 등록된 신조어입니다.");
        } else if (response.status === 403) {
          throw new Error("신조어 등록 권한이 없습니다.");
        } else {
          throw new Error("서버 오류가 발생했습니다.");
        }
      }

      //성공 처리
      const result = await response.json();
      console.log("신조어 등록 성공", result);

      alert(`"${result.term}" 신조어가 성공적으로 등록되었습니다!`);
      if(result.id){
        navigate(`/slangs/${result.id}`);
      } else{
        navigate('/');
      }

    } catch (error) {
      console.error('신조어 등록 실패:',error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  //폼 초기화 핸들러
  const handleReset = () => {
    setFormData({
      term: "",
      meaning: "",
      example: "",
    });
    setValidationErrors({});
    setError("");
  };

  return (
    <Container>
      <CreatePageHeader />

      <InfoGuide />

      <SlangInputForm
        formData={formData}
        validationErrors={validationErrors}
        error={error}
        loading={loading}
        onInputChange={handleChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />

      {/* 미리보기 카드 */}
      <PreviewCard formData={formData} />
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
`;

export default SlangCreatePage;