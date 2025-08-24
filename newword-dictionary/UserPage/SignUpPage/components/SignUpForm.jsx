// components/SignUpForm.jsx
import { FormGroup, SubmitButton, ErrorMsg } from '../styles/SignUpStyles';
import EmailInputField from './EmailInputField';
import PasswordInputField from './PasswordInputField';

const SignUpForm = ({
  formData,
  validationErrors,
  emailStatus,
  loading,
  error,
  onInputChange,
  onEmailCheck,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        {/* 이메일 입력 */}
        <EmailInputField
          value={formData.email}
          onChange={onInputChange}
          onEmailCheck={onEmailCheck}
          emailStatus={emailStatus}
          validationError={validationErrors.email}
        />

        {/* 비밀번호 입력 */}
        <PasswordInputField
          name="password"
          value={formData.password}
          onChange={onInputChange}
          validationError={validationErrors.password}
          placeholder="비밀번호 입력 (8자 이상, 영문+숫자)"
        />

        {/* 비밀번호 확인 */}
        <PasswordInputField
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={onInputChange}
          validationError={validationErrors.confirmPassword}
          placeholder="비밀번호 재입력"
        />

        {/* 회원가입 버튼 */}
        <SubmitButton 
          type="submit" 
          disabled={loading || (!emailStatus.hasChecked || emailStatus.isAvailable !== true)}
        >
          {loading ? "회원가입 중" : "회원가입"}
        </SubmitButton>
      </FormGroup>

      {/* 전역 에러 메시지 */}
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </form>
  );
};

export default SignUpForm;