import styled from "styled-components";

const SlangMainInfo = ({slangData}) => {
    return (
        <MainContent>
            <Title>{slangData.title}</Title>
            <TagBadge>{slangData.tag}</TagBadge>
            <Summary>{slangData.summary}</Summary>
        </MainContent>
    );
};

const MainContent = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  background: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 15px;
  color: #333;
  font-weight: bold;
`;

const TagBadge = styled.span`
  background: #007bff;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 20px;
  display: inline-block;
`;

const Summary = styled.p`
  font-size: 1.3em;
  color: #555;
  line-height: 1.6;
  margin-top: 15px;
  font-weight: 500;
`;

export default SlangMainInfo;