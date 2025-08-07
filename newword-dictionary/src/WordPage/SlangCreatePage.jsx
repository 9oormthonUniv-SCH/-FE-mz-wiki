import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SlangCreatePage = () => {
  const [formData, setFormData] = useState({
    term: '',
    meaning: '',
    example: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  
  const navigate = useNavigate();

  // 🎯 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 해당 필드의 에러 메시지 초기화
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // 전체 에러 메시지 초기화
    if (error) {
      setError('');
    }
  };

  // 🎯 폼 유효성 검사
  const validateForm = () => {
    const errors = {};

    if (!formData.term.trim()) {
      errors.term = '신조어를 입력해주세요.';
    } else if (formData.term.length < 2) {
      errors.term = '신조어는 2글자 이상 입력해주세요.';
    } else if (formData.term.length > 50) {
      errors.term = '신조어는 50글자 이하로 입력해주세요.';
    }

    if (!formData.meaning.trim()) {
      errors.meaning = '의미를 입력해주세요.';
    } else if (formData.meaning.length < 5) {
      errors.meaning = '의미는 5글자 이상 입력해주세요.';
    } else if (formData.meaning.length > 200) {
      errors.meaning = '의미는 200글자 이하로 입력해주세요.';
    }

    if (!formData.example.trim()) {
      errors.example = '사용 예시를 입력해주세요.';
    } else if (formData.example.length < 5) {
      errors.example = '사용 예시는 5글자 이상 입력해주세요.';
    } else if (formData.example.length > 100) {
      errors.example = '사용 예시는 100글자 이하로 입력해주세요.';
    }

    return errors;
  };

  // 🎯 신조어 등록 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 클라이언트 유효성 검사
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      setLoading(true);
      setError('');
      setValidationErrors({});

      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('로그인이 필요합니다.');
      }

      console.log('신조어 등록 요청:', formData);

      // 🎯 더미 응답 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 더미 응답 데이터
      const dummyResponse = {
        id: Math.floor(Math.random() * 1000),
        term: formData.term,
        meaning: formData.meaning,
        example: formData.example,
        likeCount: 0
      };

      console.log('신조어 등록 성공:', dummyResponse);
      
      alert(`"${formData.term}" 신조어가 성공적으로 등록되었습니다!`);
      navigate('/'); // 메인 페이지로 이동

      /* 🔹 실제 API 코드
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

      const response = await fetch(`${API_BASE_URL}/slangs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          term: formData.term.trim(),
          meaning: formData.meaning.trim(),
          example: formData.example.trim()
        })
      });

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          if (errorData.errors) {
            setValidationErrors(errorData.errors);
            return;
          }
          throw new Error(errorData.message || '입력 정보를 확인해주세요.');
        } else if (response.status === 401) {
          throw new Error('로그인이 필요합니다.');
        } else if (response.status === 409) {
          throw new Error('이미 등록된 신조어입니다.');
        } else if (response.status === 403) {
          throw new Error('신조어 등록 권한이 없습니다.');
        } else {
          throw new Error('서버 오류가 발생했습니다.');
        }
      }

      const result = await response.json();
      console.log('신조어 등록 성공:', result);
      
      alert(`"${result.term}" 신조어가 성공적으로 등록되었습니다!`);
      navigate('/');
      */

    } catch (err) {
      console.error('신조어 등록 실패:', err);
      
      if (err.message.includes('로그인')) {
        navigate('/login');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // 폼 초기화
  const handleReset = () => {
    setFormData({
      term: '',
      meaning: '',
      example: ''
    });
    setValidationErrors({});
    setError('');
  };

  return (
    <Container>
      {/* 헤더 섹션 */}
      <HeaderSection>
        <BackButton onClick={() => navigate(-1)}>← 뒤로가기</BackButton>
        <PageTitle>✏️ 신조어 등록</PageTitle>
      </HeaderSection>

      {/* 안내 메시지 */}
      <InfoSection>
        <InfoCard>
          <InfoIcon>💡</InfoIcon>
          <InfoContent>
            <InfoTitle>신조어 등록 가이드</InfoTitle>
            <InfoList>
              <li>새로운 신조어와 그 의미를 정확히 입력해주세요</li>
              <li>실제 사용 예시를 포함해주시면 더 좋아요</li>
              <li>등록된 신조어는 다른 사용자들과 공유됩니다</li>
            </InfoList>
          </InfoContent>
        </InfoCard>
      </InfoSection>

      {/* 등록 폼 */}
      <FormSection>
        <Form onSubmit={handleSubmit}>
          {/* 신조어 입력 */}
          <FormGroup>
            <FormLabel>
              신조어 <RequiredMark>*</RequiredMark>
            </FormLabel>
            <FormInput
              type="text"
              name="term"
              value={formData.term}
              onChange={handleChange}
              placeholder="예: 갓생, 킹받다, TMI..."
              $hasError={!!validationErrors.term}
              maxLength={50}
            />
            <CharacterCount>
              {formData.term.length}/50
            </CharacterCount>
            {validationErrors.term && (
              <ErrorMessage>{validationErrors.term}</ErrorMessage>
            )}
          </FormGroup>

          {/* 의미 입력 */}
          <FormGroup>
            <FormLabel>
              의미 <RequiredMark>*</RequiredMark>
            </FormLabel>
            <FormTextarea
              name="meaning"
              value={formData.meaning}
              onChange={handleChange}
              placeholder="신조어의 정확한 의미를 설명해주세요..."
              rows="4"
              $hasError={!!validationErrors.meaning}
              maxLength={200}
            />
            <CharacterCount>
              {formData.meaning.length}/200
            </CharacterCount>
            {validationErrors.meaning && (
              <ErrorMessage>{validationErrors.meaning}</ErrorMessage>
            )}
          </FormGroup>

          {/* 사용 예시 입력 */}
          <FormGroup>
            <FormLabel>
              사용 예시 <RequiredMark>*</RequiredMark>
            </FormLabel>
            <FormTextarea
              name="example"
              value={formData.example}
              onChange={handleChange}
              placeholder="실제로 어떻게 사용되는지 예시를 들어주세요..."
              rows="3"
              $hasError={!!validationErrors.example}
              maxLength={100}
            />
            <CharacterCount>
              {formData.example.length}/100
            </CharacterCount>
            {validationErrors.example && (
              <ErrorMessage>{validationErrors.example}</ErrorMessage>
            )}
          </FormGroup>

          {/* 전체 에러 메시지 */}
          {error && (
            <GlobalError>
              <ErrorIcon>⚠️</ErrorIcon>
              <span>{error}</span>
            </GlobalError>
          )}

          {/* 버튼 그룹 */}
          <ButtonGroup>
            <ResetButton type="button" onClick={handleReset}>
              초기화
            </ResetButton>
            <SubmitButton type="submit" disabled={loading}>
              {loading ? '등록 중...' : '신조어 등록하기'}
            </SubmitButton>
          </ButtonGroup>
        </Form>
      </FormSection>

      {/* 미리보기 섹션 */}
      {(formData.term || formData.meaning || formData.example) && (
        <PreviewSection>
          <PreviewTitle>📋 미리보기</PreviewTitle>
          <PreviewCard>
            <PreviewTerm>{formData.term || '신조어'}</PreviewTerm>
            <PreviewMeaning>{formData.meaning || '의미를 입력해주세요'}</PreviewMeaning>
            {formData.example && (
              <PreviewExample>
                <strong>사용 예시:</strong> "{formData.example}"
              </PreviewExample>
            )}
          </PreviewCard>
        </PreviewSection>
      )}
    </Container>
  );
};

// 스타일 컴포넌트
const Container = styled.div`
  max-width: 800px;
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

const PageTitle = styled.h1`
  font-size: 2.2em;
  color: #333;
  margin: 0;
  font-weight: bold;
`;

const InfoSection = styled.div`
  margin-bottom: 30px;
`;

const InfoCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 15px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
`;

const InfoIcon = styled.div`
  font-size: 24px;
  margin-top: 2px;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: bold;
`;

const InfoList = styled.ul`
  margin: 0;
  padding-left: 20px;
  
  li {
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 1.5;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const FormSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormLabel = styled.label`
  font-weight: bold;
  color: #495057;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const RequiredMark = styled.span`
  color: #dc3545;
  font-size: 14px;
`;

const FormInput = styled.input`
  padding: 15px;
  border: 2px solid ${props => props.$hasError ? '#dc3545' : '#e9ecef'};
  border-radius: 10px;
  font-size: 16px;
  background: #fff;
  transition: all 0.3s;
  color: #333333;

  &:focus {
    border-color: ${props => props.$hasError ? '#dc3545' : '#007bff'};
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(220,53,69,0.1)' : 'rgba(0,123,255,0.1)'};
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const FormTextarea = styled.textarea`
  padding: 15px;
  border: 2px solid ${props => props.$hasError ? '#dc3545' : '#e9ecef'};
  border-radius: 10px;
  font-size: 16px;
  background: #fff;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  transition: all 0.3s;
  color: #333333;

  &:focus {
    border-color: ${props => props.$hasError ? '#dc3545' : '#007bff'};
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(220,53,69,0.1)' : 'rgba(0,123,255,0.1)'};
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const CharacterCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #6c757d;
  margin-top: -3px;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 14px;
  font-weight: bold;
  margin-top: 5px;
`;

const GlobalError = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 10px;
  font-weight: bold;
`;

const ErrorIcon = styled.span`
  font-size: 18px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const BaseButton = styled.button`
  padding: 15px 30px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  flex: 1;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const ResetButton = styled(BaseButton)`
  background: #6c757d;
  color: white;

  &:hover:not(:disabled) {
    background: #5a6268;
    transform: translateY(-1px);
  }
`;

const SubmitButton = styled(BaseButton)`
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;

  &:hover:not(:disabled) {
    background: linear-gradient(45deg, #218838, #1ca085);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(40,167,69,0.3);
  }
`;

const PreviewSection = styled.div`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 25px;
  border: 2px dashed #dee2e6;
`;

const PreviewTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: bold;
  color: #495057;
`;

const PreviewCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const PreviewTerm = styled.h4`
  margin: 0 0 15px 0;
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
`;

const PreviewMeaning = styled.p`
  margin: 0 0 15px 0;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
`;

const PreviewExample = styled.div`
  padding: 12px 16px;
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  border-radius: 5px;
  font-size: 14px;
  color: #856404;
  line-height: 1.5;

  strong {
    color: #533f03;
  }
`;

export default SlangCreatePage;