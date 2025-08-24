import styled from "styled-components";

// slang : 신조어 데이터 객체 onEdint : 수정 버튼 클릭 시 호출할 함수 onDelete: 삭제 버튼 클릭 시 호출할 함수
const SlangCard = ({slang, onEdit, onDelete}) => {
    const handleEditClick = () => {
        onEdit(slang);
    };
    const handleDeleteClick = () => {
        onDelete(slang);
    };

    return (
        <Card>
            <SlangHeader>
                <SlangTerm>{slang.term}</SlangTerm>
                <SlangMeta>
                    <LikeCount>♥️ {slang.LikeCount}</LikeCount>
                    <CreateDate>{slang.createdAt}</CreateDate>
                </SlangMeta>
            </SlangHeader>

            <SlangMeaning>{slang.meaning}</SlangMeaning>

            <SlangExample>
                <strong>사용 예시: </strong>"{slang.example}"
            </SlangExample>

            <ButtonGroup>
                <EditButton onClick={handleEditClick}>
                    ✏️ 수정
                </EditButton>
                <DeleteButton onClick={handleDeleteClick}>
                    🗑️ 삭제
                </DeleteButton>
            </ButtonGroup>
        </Card>
    );
};

// 호버 효과와 transform
const Card = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  }
`;

const SlangHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  gap: 15px;
`;

const SlangTerm = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  margin: 0;
`;

const SlangMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-end;
`;

const LikeCount = styled.span`
  font-size: 14px;
  color: #e74c3c;
  font-weight: bold;
`;

const CreateDate = styled.span`
  font-size: 12px;
  color: #666;
`;

const SlangMeaning = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin: 0 0 15px 0;
`;

const SlangExample = styled.div`
  padding: 12px 16px;
  background-color: #f5f5edff;
  border-left: 4px solid #ffc107;
  border-radius: 5px;
  font-size: 14px;
  color: black;
  line-height: 1.5;
  margin-bottom: 20px;

  strong {
    color: #533f03;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;

`;

// 버튼 스타일링
const BaseButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  flex: 1;
`;

const EditButton = styled(BaseButton)`    /* BaseButton 상속 */
  background: #28a745;
  color: white;

  &:hover {
    background: #218838;
    transform: translateY(-1px);
  }
`;

const DeleteButton = styled(BaseButton)`  /* BaseButton 상속 */
  background: #dc3545;
  color: white;

  &:hover {
    background: #c82333;
    transform: translateY(-1px);
  }
`;

export default SlangCard;