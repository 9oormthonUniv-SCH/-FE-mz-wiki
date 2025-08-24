import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

// 로그인 페이지 컴포넌트
const LoginPage = () => {
  // 이메일 입력 상태
  const [email, setEmail] = useState("");
  // 비밀번호 입력 상태
  const [pw, setPw] = useState("");
  // 에러 메시지 상태
  const [error, setError] = useState("");
  //로그인 대기 상태
  const [isLoading, setIsLoading] = useState(false);
  // 페이지 이동 함수
  const navigate = useNavigate();

  //폼 유효성 검사
  const validateForm = () => {
  if (!email.trim()) {
    setError("이메일을 입력해주세요.");
    return false;
  }
  
  if (!email.includes("@")) {
    setError("올바른 이메일 형식을 입력해주세요.");
    return false;
  }
  
  if (!pw.trim()) {
    setError("비밀번호를 입력해주세요.");
    return false;
  }
  
  if (pw.length < 4) {
    setError("비밀번호는 4자리 이상 입력해주세요.");
    return false;
  }
  
  return true;
};

  // 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지

    if(!validateForm) {
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    try {
      // 서버에 로그인 요청 보내기
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // JSON 데이터 전송 명시
        },
        body: JSON.stringify({
          email: email, // 입력한 이메일
          password: pw, // 입력한 비밀번호
        }),
      });

      // 서버 응답 상태에 따른 처리
      if (!response.ok) {
        if (response.status === 401) {
          // 인증 실패 (아이디/비밀번호 불일치)
          setError("이메일 또는 비밀번호가 올바르지 않습니다.");
        } else {
          // 기타 서버 오류
          setError("서버 오류가 발생했습니다.");
        }
        return; // 에러가 있으면 함수 종료
      }

      // 응답 성공 시 JSON 데이터 파싱
      const data = await response.json();
      const generatedToken = `token_${Date.now()}_${Math.random().toString(36).slice(2,11)}`;
      // 로그인 토큰을 로컬 스토리지에 저장해 인증 유지
      localStorage.setItem("token", data.token || generatedToken);
      localStorage.setItem("userEmail",email);
      alert("로그인 되었습니다.");
      // 로그인 성공 후 홈으로 이동
      navigate("/");
    } catch (err) {
      // 네트워크 오류 등 예외 처리
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleLogin(e);
  }
};

  // 로그인 화면 UI 구성
  return (
    <Container>
      <Bookmark />
      <TitleSection>
        <Title>신조어 사전</Title>
        <LoginHeader>Login</LoginHeader>
      </TitleSection>
      <Card>
        <form onSubmit={handleLogin}>
          <FormGroup>
            {/* 이메일 입력 필드 */}
            <input 
              type="email" 
              placeholder="이메일 아이디 입력" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* 비밀번호 입력 필드 */}
            <input 
              type="password" 
              placeholder="비밀번호 입력" 
              value={pw} 
              onChange={(e) => setPw(e.target.value)} 
              onKeyDown={handleKeyPress}
              required
            />

            {/* 버튼 컨테이너 */}
            <ButtonContainer>
              <LoginButton type="submit" disabled={isLoading}>
                {isLoading ? "로딩중" : "로그인"}
              </LoginButton>
            </ButtonContainer>
          </FormGroup>

          {/* 에러 메시지 출력 */}
          {error && <ErrorMsg>{error}</ErrorMsg>}
        </form>
        <Divider>
          {/* 회원가입 페이지로 이동 링크 */}
          <StyledLink to="/signup">회원가입</StyledLink>
        </Divider>
      </Card>
      <Links>
        <span>계정을 잊어버리셨나요?</span>
        <hr />
        <Link to="/find-id">아이디 찾기</Link>
        {/* 아이디 찾기 페이지로 이동 링크 */}
        <Link to="/find-id">비밀번호 찾기</Link>
      </Links>
    </Container>
  );
};

// 전체 레이아웃과 스타일을 담당하는 컨테이너
const Container = styled.div`
  background-color: #7fa6a5;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  position: relative;
  overflow-x: hidden;
`;

// 오른쪽 상단 북마크 모양의 디자인 요소
const Bookmark = styled.div`
  position: absolute;
  top: 0;
  right: 30px;
  width: 40px;
  height: 100px;
  background: #3a2222;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%);
  border-left: 5px solid #eee;
  border-right: 5px solid #eee;
`;

// 타이틀 영역 스타일
const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

// 앱 이름과 로고 텍스트 스타일
const Title = styled.h1`
  font-size: 32px;
  color: #eeeeee;
  text-shadow: 2px 2px #3a3a3a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &::before {
    display: inline-block;
    width: 36px;
    height: 36px;
  }
`;

// 로그인 폼 헤더 스타일
const LoginHeader = styled.div`
  margin-bottom: 10px;
  text-align: center;
  font-family: monospace;
  font-size: 18px;
`;

// 폼 내 입력 및 버튼 그룹 스타일
const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  input,
  button {
    width: 100%;
    padding: 12px;
    border-radius: 20px;
    font-size: 14px;
    box-sizing: border-box;
  }

  input {
    border: none;
    color: black;
    background: #eee;
    &::placeholder {
      color: #aaa;
    }
  }

  button {
    background-color: #4b4b4b;
    color: white;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #333;
    }
  }
`;

// 로그인 폼 카드 스타일
const Card = styled.div`
  background: white;
  padding: 50px;
  border-radius: 10px;
  width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

// 로그인 에러 메시지 스타일
const ErrorMsg = styled.p`
  color: red;
  font-size: 13px;
  margin-top: 8px;
`;

// 구분선 스타일
const Divider = styled.div`
  margin: 35px 0 10px 0;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #333;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #bbb;
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }
`;

// 회원가입 및 아이디/비밀번호 찾기 링크들 스타일
const Links = styled.div`
  margin-top: 25px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-align: center;

  span {
    display: block;
    margin-bottom: 10px;
  }

  a {
    display: block;
    margin: 5px auto;
    width: 100%;
    padding: 2px 0;
    border: 1px solid black;
    border-radius: 25px;
    text-decoration: none;
    color: #333;
    background-color: rgba(200, 200, 200, 0.1);
    box-sizing: border-box;

    &:hover {
      background-color: #ddd;
    }
  }
`;

// 회원가입 텍스트 스타일
const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

// 버튼 컨테이너
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
  }
`;

// 로그인 버튼
const LoginButton = styled.button`
  flex: 1;
  padding: 15px 20px;
  background-color: #007bff;
  height: 54px;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #0056b3;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default LoginPage;