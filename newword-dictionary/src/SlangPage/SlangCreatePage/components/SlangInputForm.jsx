import styled from "styled-components";

const SlangInputForm = ({ 
    formData,
    validationErrors, 
    error, 
    loading, 
    onInputChange,
    onSubmit,
    onReset 
}) => {
  return (
    <FormSection>
      <Form onSubmit={onSubmit}>
        {/* 신조어 입력 */}
        <FormGroup>
          <FormLabel>
            신조어 <RequiredMark>*</RequiredMark>
          </FormLabel>
          <FormInput
            type="text"
            name="term"
            value={formData.term}
            onChange={onInputChange}
            placeholder="예: 갓생, 킹받다, TMI..."
            $hasError={!!validationErrors.term}
            maxLength={50}
          />
          <CharacterCount>{formData.term.length}/50</CharacterCount>
          {validationErrors.term && <ErrorMessage>{validationErrors.term}</ErrorMessage>}
        </FormGroup>

        {/* 의미 입력 */}
        <FormGroup>
          <FormLabel>
            의미 <RequiredMark>*</RequiredMark>
          </FormLabel>
          <FormTextarea
            name="meaning"
            value={formData.meaning}
            onChange={onInputChange}
            placeholder="신조어의 정확한 의미를 설명해주세요..."
            rows="4"
            $hasError={!!validationErrors.meaning}
            maxLength={200}
          />
          <CharacterCount>{formData.meaning.length}/200</CharacterCount>
          {validationErrors.meaning && <ErrorMessage>{validationErrors.meaning}</ErrorMessage>}
        </FormGroup>

        {/* 사용 예시 입력 */}
        <FormGroup>
          <FormLabel>
            사용 예시 <RequiredMark>*</RequiredMark>
          </FormLabel>
          <FormTextarea
            name="example"
            value={formData.example}
            onChange={onInputChange}
            placeholder="실제로 어떻게 사용되는지 예시를 들어주세요..."
            rows="3"
            $hasError={!!validationErrors.example}
            maxLength={100}
          />
          <CharacterCount>{formData.example.length}/100</CharacterCount>
          {validationErrors.example && <ErrorMessage>{validationErrors.example}</ErrorMessage>}
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
          <ResetButton type="button" onClick={onReset}>
            초기화
          </ResetButton>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? "등록 중" : "신조어 등록하기"}
          </SubmitButton>
        </ButtonGroup>
      </Form>
    </FormSection>
  );
};

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

export default SlangInputForm;