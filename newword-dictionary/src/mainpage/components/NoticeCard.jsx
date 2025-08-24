import styled from "styled-components";

const NoticeCard = () => {
  return (
    <NoticeSection>
      <NoticeHeader>
        <NoticeTitle>신조어 사전 주의사항</NoticeTitle>
      </NoticeHeader>

      <NoticeDescription>
        이 사전은 사용자가 직접 신조어를 등록, 수정, 삭제할 수 있습니다.
        아래의 주의사항을 참고해주세요
      </NoticeDescription>

      <NoticeList>
        <NoticeItem>등록 시 다른 사용자가 이해할 수 있도록 의미를 명확히 작성하세요.</NoticeItem>
        <NoticeItem>비속어, 차별적 표현 등은 등록할 수 없습니다.</NoticeItem>
        <NoticeItem>중복된 단어가 이미 존재하는지 확인한 후 등록해주세요.</NoticeItem>
        <NoticeItem>잘못된 단어라고 판단될 경우 운영자에 의해 삭제될 수 있습니다.</NoticeItem>
        <NoticeItem>수정 시 기존의 의미가 왜곡되지 않도록 주의해주세요.</NoticeItem>
      </NoticeList>
    </NoticeSection>
  );
};

const NoticeSection = styled.div`
  background: #7fa6a5;
  border-radius: 15px;
  padding: 25px;
  margin: 20px 0;
  color: white;
`;

const NoticeHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const NoticeTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
`;

const NoticeDescription = styled.p`
  margin: 0 0 15px 0;
  font-size: 14px;
  opacity: 0.95;
  line-height: 1.5;
`;

const NoticeList = styled.ol`
  margin: 0;
  padding-left: 20px;
  font-size: 14px;
  line-height: 1.6;
`;

const NoticeItem = styled.li`
  margin-bottom: 8px;
  opacity: 0.95;
`;

export default NoticeCard;
