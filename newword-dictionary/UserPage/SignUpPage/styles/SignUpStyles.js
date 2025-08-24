import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
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

export const Bookmark = styled.div`
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

export const Card = styled.div`
  background: white;
  padding: 50px;
  border-radius: 10px;
  width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputWrapper = styled.div`
  width: 100%;
  text-align: left;
`;

export const Input = styled.input`
  width: 100%;
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

export const ErrorMsg = styled.p`
  color: #dc3545;
  font-size: 13px;
  margin-top: 5px;
  margin-bottom: 0;
  text-align: left;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  border-radius: 20px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#4b4b4b")};
  color: white;
  font-size: 16px;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  margin-top: 10px;

  &:hover:not(:disabled) {
    background-color: #333;
    transform: translateY(-1px);
  }
`;

export const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
    color: #7fa6a5;
  }
`;