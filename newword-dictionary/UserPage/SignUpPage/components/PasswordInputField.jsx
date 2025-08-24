import { InputWrapper, Input, ErrorMsg } from '../styles/SignUpStyles';

const PasswordInputField = ({ 
  name = "password",
  value, 
  onChange, 
  validationError, 
  placeholder = "비밀번호 입력 (8자 이상, 영문+숫자)" 
}) => {
  return (
    <InputWrapper>
      <Input
        type="password"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        $hasError={!!validationError}
      />
      {validationError && <ErrorMsg>{validationError}</ErrorMsg>}
    </InputWrapper>
  );
};

export default PasswordInputField;