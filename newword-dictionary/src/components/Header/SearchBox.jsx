import styled from "styled-components";
import MagnifierIcon from "./components/MagnifierIcon";

const SearchBox = ({
    query,
    onQueryChange,
    onSearch,
    onKeyDown,
    isSearching
}) => {
    return (
        <SearchContainer>
            <SearchInput
                type="text"
                placeholder={isSearching ? "검색 중": "검색어를 입력해주세요"}
                value={query}
                onChange={(e)=> onQueryChange(e.target.value)} // 변경 함수 호출
                onKeyDown={onKeyDown} // 엔터 키 처리
                disabled={isSearching} // 검색 중엔 비활성화
            />
            <IconWrapper
                onClick={isSearching ? undefined : onSearch} // 검색 중이면 클릭 무효
                disabled={isSearching}
            >
                <StyledMagnifierIcon size={20} color="#333"/>
            </IconWrapper>
        </SearchContainer>
    );
};

const SearchContainer = styled.div`
  position: relative;
  width: 600px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 0 45px 0 12px;
  font-size: 14px;
  background-color: #ffffff;
  color: #3a3a3a;
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
  }
`;

const StyledMagnifierIcon = styled(MagnifierIcon)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 25px;
  height: 40px;
  pointer-events: none;
`;

// props 기반 조건부 스타일
const IconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 25px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: ${props => props.disabled ? 0.6 : 0.8};
  }
`;

export default SearchBox;