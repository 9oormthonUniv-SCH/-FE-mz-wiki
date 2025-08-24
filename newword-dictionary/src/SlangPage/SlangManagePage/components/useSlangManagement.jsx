import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useSlangManagement = () => {
  //데이터 관련 상태
  const [slangs, setSlangs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //모달 관련 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSlang, setEditingSlang] = useState(null);
  const [editFormData, setEditFormData] = useState({
    term: "",
    meaning: "",
    example: "",
  });
  const [editValidationErrors, setEditValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const fetchMySlangs = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${API_BASE_URL}/user/slangs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // 서버에서 토큰 만료/무효 응답 시
        if (response.status === 401) {
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          localStorage.clear();
          window.location.href = "/login";
          return;
        } else if (response.status === 404) {
          setSlangs([]);
          // 등록한 신조어가 없는 경우는 에러 아님
          return;
        } else {
          throw new Error(`서버 오류: ${response.status}`);
        }
      }
      const data = await response.json();
      const slangsArray = Array.isArray(data) ? data : data.slangs || data.data || [];
      setSlangs(slangsArray);
    } catch (error) {
      console.log("내 신조어 목록 로드 실패", error);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //모달 관리 함수
  const handleEditClick = (slang) => {
    console.log("수정 모달 열기", slang);

    setEditingSlang(slang);
    setEditFormData({
      term: slang.term,
      meaning: slang.meaning,
      example: slang.example,
    });
    setEditValidationErrors({}); //에러 초기화
    setIsEditModalOpen(true);
  };

  //수정 모달 닫기
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingSlang(null);
    setEditFormData({
      term: "",
      meaning: "",
      example: "",
    });
    setEditValidationErrors({});
  };

  //폼 입력 처리
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;

    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    //실시간 에러 메시지 제거
    if (editValidationErrors[name]) {
      setEditValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  //폼 유효성 검사
  const validateEditForm = () => {
    const errors = {};

    //의미 필드 검사
    if (!editFormData.term.trim()) {
      errors.meaning = "신조어를 입력해주세요";
    } else if (editFormData.term.trim() < 50) {
      errors.meaning = "신조어는 50글자 이하로 입력해주세요";
    }
    if (!editFormData.meaning.trim()) {
      errors.meaning = "의미를 입력해주세요";
    } else if (editFormData.meaning.length < 200) {
      errors.meaning = "의미는 200글자 이하로 입력해주세요";
    }

    //예시 필드 검사
    if (!editFormData.example.trim()) {
      errors.meaning = "사용 예시를 입력해주세요";
    } else if (editFormData.example.length > 100) {
      errors.meaning = "사용 예시는 100글자 이하로 입력해주세요";
    }

    return errors;
  };

  //폼 제출 처리
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    //유효성 검사
    const errors = validateEditForm();
    if (Object.keys(errors).length > 0) {
      setEditValidationErrors(errors);
      return;
    }

    try {
      setIsSubmitting(true); //제출 중 상태
      setEditValidationErrors({});

      const token = localStorage.getItem("token");
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${API_BASE_URL}/api/slangs/${editingSlang.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          term: editFormData.term.trim(),
          meaning: editFormData.meaning.trim(),
          example: editFormData.example.trim(),
        }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          if (errorData.errors) {
            setEditValidationErrors(errorData.errors);
            return;
          }
          throw new Error(errorData.message || "입력 정보를 확인해주세요");
        } else if (response.status === 401) {
          alert("세션이 만료되었습니다.");
          localStorage.clear();
          window.location.href = "/login";
          return;
        } else if (response.status === 403) {
          throw new Error("수정 권한이 없습니다");
        } else if (response.status === 404) {
          throw new Error("존재하지 않는 신조어입니다");
        } else {
          throw new Error("서버 오류가 발생했습니다");
        }
      }

      const updatedSlang = await response.json();

      // 로컬 상태 업데이트
      setSlangs((prev) => prev.map((slang) => (slang.id === editingSlang.id ? updatedSlang : slang)));

      alert(`"${updatedSlang.term || editFormData.term}" 신조어가 성공적으로 수정되었습니다!`);
      handleCloseEditModal();
    } catch (error) {
      console.error("신조어 수정 실패:", error);
      alert(error.message || "신조어 수정에 실패했습니다");
    } finally {
      setIsSubmitting(false); //제출 상태 해제
    }
  };

  // 신조어 삭제
  const handleDelete = async (slangId) => {
    const slang = slangs.find((s) => s.id === slangId);
    if (!window.confirm(`"${slang?.term}" 신조어를 삭제하시겠습니까?\n삭제된 신조어는 복구할 수 없습니다.`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${API_BASE_URL}/api/slangs/${slangId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert("세션이 만료되었습니다.");
          localStorage.clear();
          window.location.href = "/login";
          return;
        } else if (response.status === 403) {
          throw new Error("삭제 권한이 없습니다");
        } else if (response.status === 404) {
          throw new Error("존재하지 않는 신조어입니다");
        } else {
          throw new Error("서버 오류가 발생했습니다");
        }
      }

      // 로컬 상태에서 삭제
      setSlangs((prev) => prev.filter((slang) => slang.id !== slangId));
      alert("신조어가 성공적으로 삭제되었습니다");
    } catch (err) {
      console.error("신조어 삭제 실패:", err);
      alert(err.message || "신조어 삭제에 실패했습니다");
    }
  };

  // 재시도 함수
  const refetch = () => {
    fetchMySlangs();
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchMySlangs();
  }, []);

  // 커스텀 훅에서 반환하는 값들
  return {
    // 상태들
    slangs,
    loading,
    error,
    isEditModalOpen,
    editingSlang,
    editFormData,
    editValidationErrors,
    isSubmitting,

    // 함수들
    fetchMySlangs,
    handleEditClick,
    handleCloseEditModal,
    handleEditFormChange,
    handleEditSubmit,
    handleDelete,
  };
};

export default useSlangManagement;
