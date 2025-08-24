import styled from "styled-components";

import useSlangManagement from "./components/useSlangManagement";

import Header from "./components/Header";
import StatsSection from "./components/StatsSection";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import EmptyState from "./components/EmptyState";
import SlangCard from "./components/SlangCard";
import EditModal from "./components/EditModal";

const SlangManagePage = () => {
  const {
    //상태들
    slangs,
    loading,
    error,
    isEditModalOpen,
    editingSlang,
    editFormData,
    editValidationErrors,
    isSubmitting,

    // 함수들
    fetchMySlangs,
    handleEditClick,
    handleCloseEditModal,
    handleEditFormChange,
    handleEditSubmit,
    handleDelete,
  } = useSlangManagement();

  //로딩 상태 처리
  if (loading) {
    return (
      <Container>
        <LoadingSpinner
          message="내 신조어 목록을 불러오는 중"
          icon="📚"
        />
      </Container>
    );
  }

  if(error) {
    return(
    <Container>
      <ErrorMessage 
        error={error}
        onRetry={fetchMySlangs}
      />
    </Container>
    )
  }

  return (
    <Container>
      <Header />

      <StatsSection slangs={slangs} />

      {/* 메인 컨텐츠 */}
      <ContentSection>
        {slangs.length === 0 ? (
          <EmptyState />
        ) : (
          <SlangListSection>
            <SectionTitle>
              내가 등록한 신조어 ({slangs.length}개)
            </SectionTitle>
            {slangs.map((slang) => (
              <SlangCard 
                key={slang.id} 
                slang={slang} 
                onEdit={handleEditClick}
                onDelete={handleDelete} 
              />
            ))}
          </SlangListSection>
        )}
      </ContentSection>

      <EditModal
        isOpen={isEditModalOpen}
        editingSlang={editingSlang}
        formData={editFormData}
        validationErrors={editValidationErrors}
        isSubmitting={isSubmitting}
        onClose={handleCloseEditModal}
        onFormChange={handleEditFormChange}
        onSubmit={handleEditSubmit}
      />
    </Container>
  );
};

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
`;

const ContentSection = styled.div`
  margin-top: 30px;
`;

const SlangListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 1.5em;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e9ecef;
`;

export default SlangManagePage;

//신조어 등록할 때 사용자 이메일이든 토큰 값이든 신조어 만든 사람 데이터 추가하는 것 요구 그래야 삭제 가능
//수정도 수정 배열이든 추가할 수 있게 해야 함