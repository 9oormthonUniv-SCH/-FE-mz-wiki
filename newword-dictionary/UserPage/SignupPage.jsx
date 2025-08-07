import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'

const SignUpPage = () => {
  // 폼 입력 상태
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  
  // 유효성 검사 에러 상태
  const [validationErrors, setValidationErrors] = useState({})
  
  // 로딩 및 에러 상태
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const navigate = useNavigate()

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // 해당 필드의 에러 메시지 초기화
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // 실시간 유효성 검사
  const validateForm = () => {
    const errors = {}
    
    // 이메일 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      errors.email = '이메일을 입력해주세요.'
    } else if (!emailRegex.test(formData.email)) {
      errors.email = '올바른 이메일 형식이 아닙니다.'
    }
    
    // 비밀번호 검사
    if (!formData.password) {
      errors.password = '비밀번호를 입력해주세요.'
    } else if (formData.password.length < 8) {
      errors.password = '비밀번호는 8자 이상이어야 합니다.'
    } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(formData.password)) {
      errors.password = '비밀번호는 영문과 숫자를 포함해야 합니다.'
    }
    
    // 비밀번호 확인 검사
    if (!formData.confirmPassword) {
      errors.confirmPassword = '비밀번호를 다시 입력해주세요.'
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다.'
    }
    return errors
  }

  // 회원가입 처리
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // 클라이언트 유효성 검사
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }
    
    setLoading(true)
    setError('')
    try {
      // API 호출
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

      const response = await fetch(`'${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        })
      })

      // 응답 상태 확인
      if (!response.ok) {
        // 에러 응답 처리
        let errorMessage = '회원가입에 실패했습니다.'
        
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
          
          // 특정 필드 에러 처리
          if (errorData.errors) {
            setValidationErrors(errorData.errors)
            return
          }
        } catch {
          // JSON 파싱 실패 시 기본 메시지 사용
        }
        
        // 상태 코드별 에러 처리
        if (response.status === 409) {
          setValidationErrors({ email: '이미 가입된 이메일입니다.' })
        } else if (response.status === 400) {
          setError('입력 정보를 확인해주세요.')
        } else if (response.status === 500) {
          setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
        } else {
          setError(errorMessage)
        }
        return
      }

      // 성공 응답 처리
      const result = await response.json()
      console.log('회원가입 성공:', result)
      
      // 성공 메시지 및 페이지 이동
      alert('회원가입이 완료되었습니다! 로그인해주세요.')
      navigate('/login')
      
    } catch (err) {
      // 네트워크 에러 등 예외 처리
      console.error('회원가입 오류:', err)
      if (err.name === 'TypeError') {
        setError('네트워크 연결을 확인해주세요.')
      } else {
        setError('알 수 없는 오류가 발생했습니다.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Bookmark />
      <TitleSection>
        <Title>신조어 사전</Title>
        <Header>Sign up</Header>
      </TitleSection>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            {/* 이메일 입력 */}
            <InputWrapper>
              <Input
                type="email"
                name="email"
                placeholder="이메일 주소 입력"
                value={formData.email}
                onChange={handleChange}
                hasError={!!validationErrors.email}
              />
              {validationErrors.email && (
                <ErrorMsg>{validationErrors.email}</ErrorMsg>
              )}
            </InputWrapper>

            {/* 비밀번호 입력 */}
            <InputWrapper>
              <Input
                type="password"
                name="password"
                placeholder="비밀번호 입력 (8자 이상, 영문+숫자)"
                value={formData.password}
                onChange={handleChange}
                hasError={!!validationErrors.password}
              />
              {validationErrors.password && (
                <ErrorMsg>{validationErrors.password}</ErrorMsg>
              )}
            </InputWrapper>

            {/* 비밀번호 확인 */}
            <InputWrapper>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="비밀번호 재입력"
                value={formData.confirmPassword}
                onChange={handleChange}
                hasError={!!validationErrors.confirmPassword}
              />
              {validationErrors.confirmPassword && (
                <ErrorMsg>{validationErrors.confirmPassword}</ErrorMsg>
              )}
            </InputWrapper>

            {/* 회원가입 버튼 */}
            <SubmitButton type="submit" disabled={loading}>
              {loading ? '회원가입 중...' : '회원가입'}
            </SubmitButton>
          </FormGroup>

          {/* 전역 에러 메시지 */}
          {error && <ErrorMsg>{error}</ErrorMsg>}
        </form>

        <Divider>
          <StyledLink to="/login">이미 계정이 있으신가요? 로그인</StyledLink>
        </Divider>
      </Card>
    </Container>
  )
}

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
`

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
`

const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
`

const Title = styled.h1`
  font-size: 32px;
  color: #eeeeee;
  text-shadow: 2px 2px #3a3a3a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

const Header = styled.div`
  margin-bottom: 10px;
  text-align: center;
  font-family: monospace;
  font-size: 18px;
`

const Card = styled.div`
  background: white;
  padding: 50px;
  border-radius: 10px;
  width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`

const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 8px;
`

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 20px;
  font-size: 14px;
  box-sizing: border-box;
  border: 2px solid ${props => props.hasError ? '#ff4444' : '#eee'};
  background: #eee;
  color: black;
  
  &::placeholder {
    color: #aaa;
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#ff4444' : '#7fa6a5'};
  }
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 20px;
  background-color: #4b4b4b;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 10px;

  &:hover:not(:disabled) {
    background-color: #333;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const ErrorMsg = styled.p`
  color: red;
  font-size: 13px;
  margin-top: 8px;
  text-align: left;
`

const Divider = styled.div`
  margin: 35px 0 10px 0;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: #333;
`

const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
    color: lightblue;
  }
`

export default SignUpPage;