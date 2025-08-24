import styled from "styled-components";

const EditModal = ({
  isOpen, // 모달 열림 상태
  editingSlang, // 수정 중인 신조어 데이터
  formData, // 폼 입력 데이터
  validationErrors, // 유효성 검사 에러
  isSubmitting, // 제출 중 상태
  onClose, // 모달 닫기 함수
  onFormChange, // 폼 입력 변경 함수
  onSubmit, // 폼 제출 함수
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    //배경을 클릭했을 때만 모달 닫기
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent onClick={handleContentClick}>
        <ModalHeader>
          <ModalTitle>✏️ "{editingSlang?.term}" 수정</ModalTitle>
        </ModalHeader>
        <ModalForm onSubmit={onSubmit}>

        {/*의미 입력 폼*/}
          <FormGroup>
            <FormLabel>
              의미 <RequiredMark>*</RequiredMark>
            </FormLabel>

            <FormTextarea
              name="meaning"
              value={formData.meaning}
              onChange={onFormChange}
              placeholder="신조어의 정확한 의미를 설명해주세요"
              rows="4"
              $hasError={!!validationErrors.meaning}
              maxLength={200}
            />

            <CharacterCount>{formData.meaning.length}/200</CharacterCount>

            {validationErrors.meaning && <ErrorText>{validationErrors.meaning}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <FormLabel>
              사용 예시 <RequiredMark>*</RequiredMark>
            </FormLabel>

            {/*예시 입력 폼*/}
            <FormTextarea
              name="example"
              value={formData.example}
              onChange={onFormChange}
              placeholder="실제로 어떻게 사용되는지 예시를 알려주세요"
              rows="3"
              $hasError={!!validationErrors.example}
              maxLength={200}
            />
            <CharacterCount>{formData.example.length}/200</CharacterCount>
            {validationErrors.example && <ErrorTExt>{validationErrors.example}</ErrorTExt>}
          </FormGroup>
          {/* 모달 버튼 그룹 */}
          <ModalButtonGroup>
            <CancelButton type="button" onClick={onClose}>
              취소
            </CancelButton>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "수정 중" : "수정 완료"}
            </SubmitButton>
          </ModalButtonGroup>
        </ModalForm>
      </ModalContent>
    </ModalOverlay>
  );
};


// 모달 오버레이
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 15px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 2px solid #eee;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const ModalForm = styled.form`
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

// 조건부 스타일링
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

  &:focus {
    border-color: ${props => props.$hasError ? '#dc3545' : '#007bff'};
    outline: none;
    box-shadow: 0 0 0 3px ${props => 
      props.$hasError 
        ? 'rgba(220,53,69,0.1)' 
        : 'rgba(0,123,255,0.1)'
    };
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

const ErrorText = styled.div`
  color: #dc3545;
  font-size: 14px;
  font-weight: bold;
  margin-top: 5px;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

// 버튼 스타일
const BaseModalButton = styled.button`
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

const CancelButton = styled(BaseModalButton)`
  background: #6c757d;
  color: white;

  &:hover:not(:disabled) {
    background: #5a6268;
    transform: translateY(-1px);
  }
`;

const SubmitButton = styled(BaseModalButton)`
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;

  &:hover:not(:disabled) {
    background: linear-gradient(45deg, #218838, #1ca085);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(40,167,69,0.3);
  }
`;

export default EditModal;