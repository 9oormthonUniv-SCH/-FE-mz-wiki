import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SlangManagePage = () => {
  const [slangs, setSlangs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSlang, setEditingSlang] = useState(null);
  const [editFormData, setEditFormData] = useState({
    meaning: '',
    example: ''
  });
  const [editValidationErrors, setEditValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // 내가 등록한 신조어 목록 가져오기
  const fetchMySlangs = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('로그인이 필요합니다.');
      }

      console.log('내 신조어 목록 요청');

      // 더미 데이터 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const dummySlangs = [
        {
          id: 1,
          term: '갓생',
          meaning: '신과 같은 삶을 살아가는 것, 매우 모범적이고 성실한 생활을 하는 것을 의미합니다.',
          example: '요즘 갓생 살고 있어서 새벽 5시에 일어나서 운동하고 있어.',
          likeCount: 15,
          createdAt: '2024-01-15'
        },
        {
          id: 2,
          term: 'TMI',
          meaning: 'Too Much Information의 줄임말로, 굳이 알려주지 않아도 되는 과도한 정보를 의미합니다.',
          example: 'TMI인데 나 어제 라면 3개 먹었어.',
          likeCount: 8,
          createdAt: '2024-01-10'
        },
        {
          id: 3,
          term: '킹받다',
          meaning: '매우 화가 나거나 짜증이 날 때 사용하는 표현입니다.',
          example: '버스 놓쳐서 진짜 킹받네.',
          likeCount: 23,
          createdAt: '2024-01-08'
        }
      ];

      setSlangs(dummySlangs);

      /* 🔹 실제 API 코드
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

      const response = await fetch(`${API_BASE_URL}/my-slangs`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('로그인이 필요합니다.');
        }
        throw new Error('신조어 목록을 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      setSlangs(data);
      */

    } catch (err) {
      console.error('신조어 목록 로딩 실패:', err);
      if (err.message.includes('로그인')) {
        navigate('/login');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMySlangs();
  }, []);

  //  수정 모달 열기
  const handleEditClick = (slang) => {
    setEditingSlang(slang);
    setEditFormData({
      meaning: slang.meaning,
      example: slang.example
    });
    setEditValidationErrors({});
    setIsEditModalOpen(true);
  };

  // 수정 모달 닫기
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingSlang(null);
    setEditFormData({ meaning: '', example: '' });
    setEditValidationErrors({});
  };

  // 수정 폼 입력 핸들러
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 해당 필드의 에러 메시지 초기화
    if (editValidationErrors[name]) {
      setEditValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // 수정 폼 유효성 검사
  const validateEditForm = () => {
    const errors = {};

    if (!editFormData.meaning.trim()) {
      errors.meaning = '의미를 입력해주세요.';
    } else if (editFormData.meaning.length < 5) {
      errors.meaning = '의미는 5글자 이상 입력해주세요.';
    } else if (editFormData.meaning.length > 200) {
      errors.meaning = '의미는 200글자 이하로 입력해주세요.';
    }

    if (!editFormData.example.trim()) {
      errors.example = '사용 예시를 입력해주세요.';
    } else if (editFormData.example.length < 5) {
      errors.example = '사용 예시는 5글자 이상 입력해주세요.';
    } else if (editFormData.example.length > 100) {
      errors.example = '사용 예시는 100글자 이하로 입력해주세요.';
    }

    return errors;
  };

  // 신조어 수정 처리
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const errors = validateEditForm();
    if (Object.keys(errors).length > 0) {
      setEditValidationErrors(errors);
      return;
    }

    try {
      setIsSubmitting(true);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('로그인이 필요합니다.');
      }

      console.log('신조어 수정 요청:', {
        id: editingSlang.id,
        ...editFormData
      });

      // 더미 응답 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 로컬 상태 업데이트
      setSlangs(prevSlangs => 
        prevSlangs.map(slang => 
          slang.id === editingSlang.id 
            ? { ...slang, meaning: editFormData.meaning, example: editFormData.example }
            : slang
        )
      );

      alert('신조어가 성공적으로 수정되었습니다!');
      handleCloseEditModal();

      /* 🔹 실제 API 코드
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

      const response = await fetch(`${API_BASE_URL}/slangs/${slang_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          meaning: editFormData.meaning.trim(),
          example: editFormData.example.trim()
        })
      });

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          if (errorData.errors) {
            setEditValidationErrors(errorData.errors);
            return;
          }
          throw new Error(errorData.message || '입력 정보를 확인해주세요.');
        } else if (response.status === 401) {
          throw new Error('로그인이 필요합니다.');
        } else if (response.status === 403) {
          throw new Error('수정 권한이 없습니다.');
        } else if (response.status === 404) {
          throw new Error('해당 신조어를 찾을 수 없습니다.');
        } else {
          throw new Error('서버 오류가 발생했습니다.');
        }
      }

      const updatedSlang = await response.json();
      
      setSlangs(prevSlangs => 
        prevSlangs.map(slang => 
          slang.id === editingSlang.id ? updatedSlang : slang
        )
      );

      alert('신조어가 성공적으로 수정되었습니다!');
      handleCloseEditModal();
      */

    } catch (err) {
      console.error('신조어 수정 실패:', err);
      if (err.message.includes('로그인')) {
        navigate('/login');
      } else {
        alert(err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 신조어 삭제 처리
  const handleDelete = async (slang) => {
    const confirmDelete = window.confirm(
      `"${slang.term}" 신조어를 정말 삭제하시겠습니까?\n\n삭제된 신조어는 복구할 수 없습니다.`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('로그인이 필요합니다.');
      }

      console.log('신조어 삭제 요청:', slang.id);

      // 더미 응답 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 500));

      // 로컬 상태에서 삭제
      setSlangs(prevSlangs => prevSlangs.filter(s => s.id !== slang.id));

      alert(`"${slang.term}" 신조어가 삭제되었습니다.`);

      /* 🔹 실제 API 코드
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${API_BASE_URL}/api/slangs/${slang.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('로그인이 필요합니다.');
        } else if (response.status === 403) {
          throw new Error('삭제 권한이 없습니다.');
        } else if (response.status === 404) {
          throw new Error('해당 신조어를 찾을 수 없습니다.');
        } else {
          throw new Error('서버 오류가 발생했습니다.');
        }
      }

      setSlangs(prevSlangs => prevSlangs.filter(s => s.id !== slang.id));
      alert(`"${slang.term}" 신조어가 삭제되었습니다.`);
      */

    } catch (err) {
      console.error('신조어 삭제 실패:', err);
      if (err.message.includes('로그인')) {
        navigate('/login');
      } else {
        alert(err.message);
      }
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSection>
          <LoadingSpinner />
          <LoadingText>내 신조어 목록을 불러오는 중...</LoadingText>
        </LoadingSection>
      </Container>
    );
  }

  return (
    <Container>
      {/* 헤더 섹션 */}
      <HeaderSection>
        <BackButton onClick={() => navigate(-1)}>← 뒤로가기</BackButton>
        <PageTitle>📝 내 신조어 관리</PageTitle>
      </HeaderSection>

      {/* 통계 섹션 */}
      <StatsSection>
        <StatsCard>
          <StatsIcon>📊</StatsIcon>
          <StatsContent>
            <StatsNumber>{slangs.length}</StatsNumber>
            <StatsLabel>등록한 신조어</StatsLabel>
          </StatsContent>
        </StatsCard>
        <StatsCard>
          <StatsIcon>❤️</StatsIcon>
          <StatsContent>
            <StatsNumber>{slangs.reduce((sum, slang) => sum + slang.likeCount, 0)}</StatsNumber>
            <StatsLabel>총 좋아요</StatsLabel>
          </StatsContent>
        </StatsCard>
      </StatsSection>

      {/* 에러 메시지 */}
      {error && (
        <ErrorSection>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorText>{error}</ErrorText>
          <RetryButton onClick={fetchMySlangs}>다시 시도</RetryButton>
        </ErrorSection>
      )}

      {/* 신조어 목록 */}
      {slangs.length === 0 ? (
        <EmptySection>
          <EmptyIcon>📝</EmptyIcon>
          <EmptyTitle>아직 등록한 신조어가 없습니다</EmptyTitle>
          <EmptyDescription>새로운 신조어를 등록해보세요!</EmptyDescription>
          <CreateButton onClick={() => navigate('/create')}>
            신조어 등록하기
          </CreateButton>
        </EmptySection>
      ) : (
        <SlangListSection>
          {slangs.map(slang => (
            <SlangCard key={slang.id}>
              <SlangHeader>
                <SlangTerm>{slang.term}</SlangTerm>
                <SlangMeta>
                  <LikeCount>❤️ {slang.likeCount}</LikeCount>
                  <CreateDate>{slang.createdAt}</CreateDate>
                </SlangMeta>
              </SlangHeader>
              
              <SlangMeaning>{slang.meaning}</SlangMeaning>
              
              <SlangExample>
                <strong>사용 예시:</strong> "{slang.example}"
              </SlangExample>

              <ButtonGroup>
                <EditButton onClick={() => handleEditClick(slang)}>
                  ✏️ 수정
                </EditButton>
                <DeleteButton onClick={() => handleDelete(slang)}>
                  🗑️ 삭제
                </DeleteButton>
              </ButtonGroup>
            </SlangCard>
          ))}
        </SlangListSection>
      )}

      {/* 수정 모달 */}
      {isEditModalOpen && (
        <ModalOverlay onClick={handleCloseEditModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>✏️ "{editingSlang?.term}" 수정</ModalTitle>
              <CloseButton onClick={handleCloseEditModal}>✕</CloseButton>
            </ModalHeader>

            <ModalForm onSubmit={handleEditSubmit}>
              <FormGroup>
                <FormLabel>
                  의미 <RequiredMark>*</RequiredMark>
                </FormLabel>
                <FormTextarea
                  name="meaning"
                  value={editFormData.meaning}
                  onChange={handleEditFormChange}
                  placeholder="신조어의 정확한 의미를 설명해주세요..."
                  rows="4"
                  $hasError={!!editValidationErrors.meaning}
                  maxLength={200}
                />
                <CharacterCount>
                  {editFormData.meaning.length}/200
                </CharacterCount>
                {editValidationErrors.meaning && (
                  <ErrorMessage>{editValidationErrors.meaning}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  사용 예시 <RequiredMark>*</RequiredMark>
                </FormLabel>
                <FormTextarea
                  name="example"
                  value={editFormData.example}
                  onChange={handleEditFormChange}
                  placeholder="실제로 어떻게 사용되는지 예시를 들어주세요..."
                  rows="3"
                  $hasError={!!editValidationErrors.example}
                  maxLength={100}
                />
                <CharacterCount>
                  {editFormData.example.length}/100
                </CharacterCount>
                {editValidationErrors.example && (
                  <ErrorMessage>{editValidationErrors.example}</ErrorMessage>
                )}
              </FormGroup>

              <ModalButtonGroup>
                <ModalCancelButton type="button" onClick={handleCloseEditModal}>
                  취소
                </ModalCancelButton>
                <ModalSubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? '수정 중...' : '수정 완료'}
                </ModalSubmitButton>
              </ModalButtonGroup>
            </ModalForm>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

// 스타일 컴포넌트들
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #eee;
`;

const BackButton = styled.button`
  padding: 12px 20px;
  background: #f8f9fa;
  border: 2px solid #dee2e6;
  border-radius: 10px;
  cursor: pointer;
  color: #495057;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s;

  &:hover {
    background: #e9ecef;
    transform: translateX(-2px);
  }
`;

const PageTitle = styled.h1`
  font-size: 2.2em;
  color: #333;
  margin: 0;
  font-weight: bold;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatsCard = styled.div`
  background: #7fa6a5;
  color: white;
  padding: 25px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 15px rgba(127, 166, 165, 0.2);
`;

const StatsIcon = styled.div`
  font-size: 24px;
`;

const StatsContent = styled.div`
  flex: 1;
`;

const StatsNumber = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatsLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

const LoadingSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #666;
`;

const ErrorSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 30px;
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const ErrorIcon = styled.span`
  font-size: 24px;
`;

const ErrorText = styled.span`
  font-weight: bold;
  flex: 1;
`;

const RetryButton = styled.button`
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #c82333;
  }
`;

const EmptySection = styled.div`
  text-align: center;
  padding: 100px 20px;
`;

const EmptyIcon = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
`;

const EmptyDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
`;

const CreateButton = styled.button`
  padding: 15px 30px;
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: linear-gradient(45deg, #218838, #1ca085);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(40,167,69,0.3);
  }
`;

const SlangListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SlangCard = styled.div`
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
  color: #black;
  line-height: 1.5;
  margin-bottom: 20px;

  strong {
    color: #533f03;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

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

const EditButton = styled(BaseButton)`
  background: #28a745;
  color: white;

  &:hover {
    background: #218838;
    transform: translateY(-1px);
  }
`;

const DeleteButton = styled(BaseButton)`
  background: #dc3545;
  color: white;

  &:hover {
    background: #c82333;
    transform: translateY(-1px);
  }
`;

// 모달 스타일들
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 15px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 2px solid #eee;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 5px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f8f9fa;
    color: #333;
  }
`;

const ModalForm = styled.form`
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormLabel = styled.label`
  font-weight: bold;
  color: #495057;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const RequiredMark = styled.span`
  color: #dc3545;
  font-size: 14px;
`;

const FormTextarea = styled.textarea`
  padding: 15px;
  border: 2px solid ${props => props.$hasError ? '#dc3545' : '#e9ecef'};
  border-radius: 10px;
  font-size: 16px;
  background: #fff;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  transition: all 0.3s;

  &:focus {
    border-color: ${props => props.$hasError ? '#dc3545' : '#007bff'};
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(220,53,69,0.1)' : 'rgba(0,123,255,0.1)'};
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const CharacterCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #6c757d;
  margin-top: -3px;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 14px;
  font-weight: bold;
  margin-top: 5px;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const BaseModalButton = styled.button`
  padding: 15px 30px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  flex: 1;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const ModalCancelButton = styled(BaseModalButton)`
  background: #6c757d;
  color: white;

  &:hover:not(:disabled) {
    background: #5a6268;
    transform: translateY(-1px);
  }
`;

const ModalSubmitButton = styled(BaseModalButton)`
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;

  &:hover:not(:disabled) {
    background: linear-gradient(45deg, #218838, #1ca085);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(40,167,69,0.3);
  }
`;

export default SlangManagePage;