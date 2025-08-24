import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = ({ slangData, onLikeToggle, likeLoading }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        //로그인 체크
        const token = localStorage.getItem('token');

        if(!token){
            alert('로그인이 필요합니다.')
            navigate('/login')
            return;
        }

        //수정 페이지로 이동
        navigate('/slangs/${slangData.id}/edit');
    };

    return(
        <HeaderSection>
            <BackButton onClick = {() => navigate(-1)}>
                ← 뒤로가기
            </BackButton>
            <LikeEditSection>
                <LikeButton
                    $isLiked={slangData.isLiked}
                    onClick={onLikeToggle}
                    disabled={likeLoading}
                >
                    {likeLoading ? (
                        '처리중'
                    ):(
                        <>
                            {slangData.isLiked ? "❤️" : "🤍"} {slangData.likes}
                        </>
                    )}
                </LikeButton>

                <EditBtn onClick={handleEdit}>수정하기</EditBtn>
            </LikeEditSection>
        </HeaderSection>
    );
};

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  padding: 8px 16px;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  color: black;
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    background: #e0e0e0;
  }
`;

const LikeEditSection = styled.div`
  display: flex;
  gap: 15px;
`;

const LikeButton = styled.button`
  padding: 12px 24px;
  background: ${(props) => {
    if (props.disabled) return '#cccccc';
    return props.$isLiked ? "#ff6b6b" : "#f0f0f0";
  }};
  color: ${(props) => {
    if (props.disabled) return '#666666';
    return props.$isLiked ? "white" : "#333";
  }};
  border: 2px solid ${(props) => {
    if (props.disabled) return '#cccccc';
    return props.$isLiked ? "#ff6b6b" : "#ddd";
  }};
  border-radius: 25px;
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
  font-weight: bold;
  transition: all 0.3s;
  min-width: 120px; /* 버튼 크기 고정 */

  &:hover:not(:disabled) {
    background: ${(props) => (props.$isLiked ? "#ff5252" : "#e0e0e0")};
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;

const EditBtn = styled.button`
  background: #8aa7a6ff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    background-color: #6d8584;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default Header;