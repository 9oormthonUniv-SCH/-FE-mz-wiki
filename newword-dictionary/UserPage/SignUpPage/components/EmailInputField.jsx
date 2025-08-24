import styled from 'styled-components';
import { InputWrapper, ErrorMsg } from '../styles/SignUpStyles';

const EmailInputField = ({
  value,
  onChange,
  onEmailCheck,
  emailStatus,
  validationError
}) => {
  return (
    <InputWrapper>
      <EmailInputContainer>
        <EmailInput
          type="email"
          name="email"
          placeholder="이메일 주소 입력"
          value={value}
          onChange={onChange}
          $hasError={!!validationError}
        />
        <CheckEmailButton
          type="button"
          onClick={onEmailCheck}
          disabled={emailStatus.isChecking || !value.trim()}
        >
          {emailStatus.isChecking ? "확인중" : "이메일 확인"}
        </CheckEmailButton>
      </EmailInputContainer>
      
      {/* 이메일 상태 메시지 */}
      {emailStatus.hasChecked && (
        <EmailStatusMessage>
          {emailStatus.isAvailable === true && (
            <SuccessText>사용 가능한 이메일입니다.</SuccessText>
          )}
          
          {emailStatus.isAvailable === false && (
            <ErrorText>이미 사용 중인 이메일입니다.</ErrorText>
          )}
          
          {emailStatus.isAvailable === null && (
            <ErrorText>이메일 확인 중 오류가 발생했습니다.</ErrorText>
          )}
        </EmailStatusMessage>
      )}
      
      {validationError && <ErrorMsg>{validationError}</ErrorMsg>}
    </InputWrapper>
  );
};

const EmailInputContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 12px;
  border-radius: 20px;
  font-size: 14px;
  box-sizing: border-box;
  border: 2px solid ${(props) => (props.$hasError ? "#ff4444" : "#eee")};
  background: #eee;
  color: black;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? "#ff4444" : "#7fa6a5")};
  }
`;

const CheckEmailButton = styled.button`
  padding: 12px 16px;
  border-radius: 20px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#7fa6a5")};
  color: white;
  border: none;
  font-size: 14px;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  white-space: nowrap;
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: #6b9594;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const EmailStatusMessage = styled.div`
  margin-top: 8px;
  font-size: 13px;
`;

const SuccessText = styled.div`
  color: #28a745;
  font-weight: 500;
`;

const ErrorText = styled.div`
  color: #dc3545;
  font-weight: 500;
`;

export default EmailInputField;