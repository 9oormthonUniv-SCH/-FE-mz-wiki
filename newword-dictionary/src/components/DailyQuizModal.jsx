import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DailyQuizModal = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState('question');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // 퀴즈 데이터 가져오기
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('authToken');
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
        const response = await fetch(`${API_BASE_URL}/quiz/daily`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('퀴즈 데이터를 불러올 수 없습니다.');
        }

        const data = await response.json();
        setQuizData({
          date: data.date || "오늘의 퀴즈",
          question: data.question,
          options: data.options,
          correctAnswer: data.correctAnswer,
          explanation: data.explanation,
          wordId: data.wordId
        });
      } catch (err) {
        setError(err.message);
        console.error('퀴즈 데이터 로드 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  const handleAnswerSubmit = () => {
    setCurrentStep('result');
  };

  const handleDetailView = () => {
    navigate(`/slangs/${quizData.wordId}`);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 로딩 중일 때
  if (loading) {
    return (
      <ModalBackdrop onClick={handleBackdropClick}>
        <Modal>
          <Header>
            <Title>퀴즈 로딩 중...</Title>
            <CloseButton onClick={onClose}>X</CloseButton>
          </Header>
          <LoadingContent>
            <p>퀴즈를 불러오고 있습니다...</p>
          </LoadingContent>
        </Modal>
      </ModalBackdrop>
    );
  }

  // 에러가 발생했을 때
  if (error || !quizData) {
    return (
      <ModalBackdrop onClick={handleBackdropClick}>
        <Modal>
          <Header>
            <Title>오류 발생</Title>
            <CloseButton onClick={onClose}>X</CloseButton>
          </Header>
          <ErrorContent>
            <p>{error || '퀴즈 데이터를 불러올 수 없습니다.'}</p>
            <RetryButton onClick={() => window.location.reload()}>
              다시 시도
            </RetryButton>
          </ErrorContent>
        </Modal>
      </ModalBackdrop>
    );
  }

  const isCorrect = selectedAnswer === quizData.correctAnswer;

  // 정상적인 퀴즈 화면
  return (
    <ModalBackdrop onClick={handleBackdropClick}>
      <Modal>
        <Header>
          <Title>{quizData.date}</Title>
          <CloseButton onClick={onClose}>X</CloseButton>
        </Header>

        {currentStep === 'question' ? (
          <QuizContent>
            <QuestionBox>
              <p>{quizData.question}</p>
            </QuestionBox>
            
            <OptionsGrid>
              {quizData.options.map((option, index) => (
                <OptionButton
                  key={index}
                  $selected={selectedAnswer === option}
                  onClick={() => setSelectedAnswer(option)}
                >
                  {option}
                </OptionButton>
              ))}
            </OptionsGrid>

            <SubmitButton 
              onClick={handleAnswerSubmit}
              disabled={!selectedAnswer}
            >
              제출하기
            </SubmitButton>
          </QuizContent>
        ) : (
          <QuizResult>
            <ResultStatus>
              <ResultTitle>{isCorrect ? '정답입니다!' : '틀렸습니다!'}</ResultTitle>
              <CorrectAnswer>정답: {quizData.correctAnswer}</CorrectAnswer>
            </ResultStatus>
            
            <Explanation>
              <p>{quizData.explanation}</p>
            </Explanation>
            
            <ResultButtons>
              <DetailButton onClick={handleDetailView}>
                자세히 알아보러 가기
              </DetailButton>
              <CloseResultButton onClick={onClose}>
                닫기
              </CloseResultButton>
            </ResultButtons>
          </QuizResult>
        )}
      </Modal>
    </ModalBackdrop>
  );
};

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #f0f0f0;
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  position: relative;
  border: 3px solid #888;

  @media (max-width: 600px) {
    padding: 20px;
    margin: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 15px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: black;
`;

const CloseButton = styled.button`
  background-color: #f0f0f0;
  color: black;
  font-size: 18px;
  cursor: pointer;
  border: none;
  
  &:hover {
    background: rgba(0,0,0,0.5);
    font-weight: bold;
  }
`;

const LoadingContent = styled.div`
  text-align: center;
  padding: 40px 20px;
  
  p {
    margin: 0;
    font-size: 16px;
    color: #666;
  }
`;

const ErrorContent = styled.div`
  text-align: center;
  padding: 40px 20px;
  
  p {
    margin: 0 0 20px 0;
    font-size: 16px;
    color: #d32f2f;
  }
`;

const RetryButton = styled.button`
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background: #0056b3;
  }
`;

const QuizContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestionBox = styled.div`
  background: white;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;

  p {
    margin: 0;
    font-size: 16px;
    line-height: 1.5;
    color: black;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const OptionButton = styled.button`
  padding: 15px;
  border: 2px solid #ccc;
  border-radius: 8px;
  background: ${props => props.$selected ? '#007bff' : 'white'};
  color: ${props => props.$selected ? 'white' : 'black'};
  border-color: ${props => props.$selected ? '#0056b3' : '#ccc'};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;

  &:hover {
    background: ${props => props.$selected ? '#0056b3' : '#f5f5f5'};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background: ${props => props.disabled ? '#ccc' : '#28a745'};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #218838;
  }
`;

const QuizResult = styled.div`
  text-align: center;
`;

const ResultStatus = styled.div`
  margin-bottom: 20px;
`;

const ResultTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 24px;
  color: #333;
`;

const CorrectAnswer = styled.p`
  margin: 0;
  font-size: 16px;
  color: #666;
`;

const Explanation = styled.div`
  background: white;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  text-align: left;

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: #000;
  }
`;

const ResultButtons = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const BaseButton = styled.button`
  flex: 1;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;

  @media (max-width: 600px) {
    margin-bottom: 10px;
  }
`;

const DetailButton = styled(BaseButton)`
  background: #007bff;
  color: white;

  &:hover {
    background: #0056b3;
  }
`;

const CloseResultButton = styled(BaseButton)`
  background: #6c757d;
  color: white;

  &:hover {
    background: #545b62;
  }
`;

export default DailyQuizModal;