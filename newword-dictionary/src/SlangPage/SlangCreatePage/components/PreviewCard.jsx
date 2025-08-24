import styled from "styled-components";

const PreviewCard = ({ formData }) => {
  const hasFormData = formData.term || formData.meaning || formData.example;
  if (!hasFormData) {
    return null;
  }

  return (
    <PreviewSection>
      <PreviewTitle>📋 미리보기</PreviewTitle>
      <PreviewCardStyle>
        <PreviewTerm>{formData.term || "신조어"}</PreviewTerm>
        <PreviewMeaning>{formData.meaning || "의미를 입력해주세요"}</PreviewMeaning>
        {formData.example && (
          <PreviewExample>
            <strong>사용 예시:</strong> "{formData.example}"
          </PreviewExample>
        )}
      </PreviewCardStyle>
    </PreviewSection>
  );
};

const PreviewSection = styled.div`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 25px;
  border: 2px dashed #dee2e6;
`;

const PreviewTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: bold;
  color: #495057;
`;

const PreviewCardStyle = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const PreviewTerm = styled.h4`
  margin: 0 0 15px 0;
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
`;

const PreviewMeaning = styled.p`
  margin: 0 0 15px 0;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
`;

const PreviewExample = styled.div`
  padding: 12px 16px;
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  border-radius: 5px;
  font-size: 14px;
  color: #856404;
  line-height: 1.5;

  strong {
    color: #533f03;
  }
`;

export default PreviewCard;