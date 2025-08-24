import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 컴포넌트
import SignUpHeader from './components/SignUpHeader';
import SignUpForm from './components/SignUpForm';
import SignUpFooter from './components/SignUpFooter';
// 스타일
import { Container, Bookmark, Card } from './styles/SignUpStyles';

const SignUpPage = () => {
  // 모든 상태를 메인 컴포넌트에서 관리
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const [emailStatus, setEmailStatus] = useState({
    isChecking: false,
    isAvailable: null,
    message: "",
    hasChecked: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 해당 필드의 에러 메시지 초기화
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // 이메일 필드 변경 시 중복 체크 상태 초기화
    if (name === 'email') {
      setEmailStatus({
        isChecking: false,
        isAvailable: null,
        message: "",
        hasChecked: false,
      });
    }
  };

  // 폼 유효성 검사
  const validateForm = () => {
    const errors = {};

    // 이메일 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "이메일을 입력해주세요.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "올바른 이메일 형식이 아닙니다.";
    }

    // 비밀번호 검사
    if (!formData.password) {
      errors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 8) {
      errors.password = "비밀번호는 8자 이상이어야 합니다.";
    } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(formData.password)) {
      errors.password = "비밀번호는 영문과 숫자를 포함해야 합니다.";
    }

    // 비밀번호 확인 검사
    if (!formData.confirmPassword) {
      errors.confirmPassword = "비밀번호를 다시 입력해주세요.";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }
    return errors;
  };

  // 이메일 중복 체크
  const handleEmailCheck = async () => {
    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    
    if (!emailRegex.test(formData.email)) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    try {
      setEmailStatus((prev) => ({ ...prev, isChecking: true }));

      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${API_BASE_URL}/user/check-email?email=${encodeURIComponent(formData.email)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("이메일 확인 중 오류가 발생했습니다.");
      }

      const data = await response.json();

      setEmailStatus({
        isChecking: false,
        isAvailable: !data.duplicate,
        message: data.duplicate ? "이미 사용 중인 이메일입니다." : "사용 가능한 이메일입니다.",
        hasChecked: true,
      });

    } catch (error) {
      console.error("이메일 체크 실패:", error);
      setEmailStatus({
        isChecking: false,
        isAvailable: null,
        message: "이메일 확인 중 오류가 발생했습니다.",
        hasChecked: true,
      });
    }
  };

  // 회원가입 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 클라이언트 유효성 검사
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // 이메일 중복 체크 확인
    if (!emailStatus.hasChecked || emailStatus.isAvailable !== true) {
      alert("이메일 중복 체크를 완료해주세요.");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        let errorMessage = "회원가입에 실패했습니다.";

        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;

          if (errorData.errors) {
            setValidationErrors(errorData.errors);
            return;
          }
        } catch {
          // JSON 파싱 실패 시 기본 메시지 사용
        }

        if (response.status === 409) {
          setValidationErrors({ email: "이미 가입된 이메일입니다." });
        } else if (response.status === 400) {
          setError("입력 정보를 확인해주세요.");
        } else if (response.status === 500) {
          setError("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } else {
          setError(errorMessage);
        }
        return;
      }

      const result = await response.json();
      console.log("회원가입 성공:", result);

      alert("회원가입이 완료되었습니다! 로그인해주세요.");
      navigate("/login");
      
    } catch (err) {
      console.error("회원가입 오류:", err);
      if (err.name === "TypeError") {
        setError("네트워크 연결을 확인해주세요.");
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Bookmark />
      
      {/* 헤더 */}
      <SignUpHeader />
      
      <Card>
        {/* 폼 */}
        <SignUpForm
          formData={formData}
          validationErrors={validationErrors}
          emailStatus={emailStatus}
          loading={loading}
          error={error}
          onInputChange={handleChange}
          onEmailCheck={handleEmailCheck}
          onSubmit={handleSubmit}
        />
        
        {/* 푸터 */}
        <SignUpFooter />
      </Card>
    </Container>
  );
};

export default SignUpPage;