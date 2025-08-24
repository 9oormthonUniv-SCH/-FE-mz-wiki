import styled from 'styled-components';

const QuizCard = ({ quiz }) => {
  return (
    <Card $isCorrect={quiz.isCorrect}>
      <QuizHeader>
        <QuizInfo>
          <QuizDate>{new Date(quiz.date).toLocaleDateString()}</QuizDate>
          <WordTitle>관련 신조어: {quiz.wordTitle}</WordTitle>
        </QuizInfo>
        <ResultBadge $isCorrect={quiz.isCorrect}>
          {quiz.isCorrect ? '✅ 정답' : '❌ 오답'}
        </ResultBadge>
      </QuizHeader>

      <QuizContent>
        <QuestionSection>
          <QuestionTitle>문제</QuestionTitle>
          <QuestionText>{quiz.question}</QuestionText>
        </QuestionSection>

        <AnswerSection>
          <AnswerRow>
            <AnswerLabel>내 답:</AnswerLabel>
            <UserAnswer $isCorrect={quiz.isCorrect}>
              {quiz.userAnswer}
            </UserAnswer>
          </AnswerRow>
          
          <AnswerRow>
            <AnswerLabel>정답:</AnswerLabel>
            <CorrectAnswer>
              {quiz.correctAnswer}
            </CorrectAnswer>
          </AnswerRow>
        </AnswerSection>
      </QuizContent>
    </Card>
  );
};

const Card = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border-left: 6px solid ${props => props.$isCorrect ? '#28a745' : '#dc3545'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
`;

const QuizHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px 15px 25px;
  border-bottom: 1px solid #f1f3f4;
`;

const QuizInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const QuizDate = styled.div`
  color: #6c757d;
  font-size: 14px;
  font-weight: bold;
`;

const WordTitle = styled.div`
  color: #495057;
  font-size: 13px;
`;

const ResultBadge = styled.span`
  background: ${props => props.$isCorrect ? '#d4edda' : '#f8d7da'};
  color: ${props => props.$isCorrect ? '#155724' : '#721c24'};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
`;

const QuizContent = styled.div`
  padding: 20px 25px;
`;

const QuestionSection = styled.div`
  margin-bottom: 25px;
`;

const QuestionTitle = styled.h4`
  color: #495057;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: bold;
`;

const QuestionText = styled.p`
  color: #333;
  font-size: 18px;
  line-height: 1.6;
  padding: 18px 22px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #007bff;
  margin: 0;
`;

const AnswerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const AnswerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const AnswerLabel = styled.span`
  font-weight: bold;
  color: #495057;
  min-width: 60px;
  font-size: 15px;
`;

const UserAnswer = styled.span`
  padding: 10px 18px;
  border-radius: 25px;
  font-weight: bold;
  background: ${props => props.$isCorrect ? '#d4edda' : '#f8d7da'};
  color: ${props => props.$isCorrect ? '#155724' : '#721c24'};
  font-size: 15px;
`;

const CorrectAnswer = styled.span`
  padding: 10px 18px;
  background: #d4edda;
  color: #155724;
  border-radius: 25px;
  font-weight: bold;
  font-size: 15px;
`;

export default QuizCard;