import { useEffect, useState } from "react";
import styled from "styled-components";
import { dummyTags } from "../../data/dummyData";

const TagSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  padding: 25px;
  margin: 20px 0;
  color: white;
`;

const TagHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const TagIcon = styled.div`
  font-size: 24px;
`;

const TagTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

const TagDescription = styled.p`
  margin: 0 0 20px 0;
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.5;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Tag = styled.button`
  padding: 12px 20px;
  background-color: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.3s;
  backdrop-filter: blur(10px);

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const LoadingTag = styled.div`
  padding: 12px 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: rgba(255, 255, 255, 0.8);
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 15px;
  opacity: 0.6;
`;

const EmptyText = styled.p`
  margin: 0;
  font-size: 16px;
`;

const TagList = ({ onSelectTag }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로딩 시뮬레이션
    const loadTags = async () => {
      setLoading(true);
      
      // 더미 데이터 로딩 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTags(dummyTags || []);
      setLoading(false);
    };

    loadTags();
  }, []);

  const handleTagClick = (tagName) => {
    console.log('선택된 태그:', tagName);
    if (onSelectTag) {
      onSelectTag(tagName);
    }
  };

  return (
    <TagSection>
      <TagHeader>
        <TagIcon>🏷️</TagIcon>
        <div>
          <TagTitle>인기 태그</TagTitle>
          <TagDescription>
            관심 있는 주제의 태그를 클릭해보세요!
          </TagDescription>
        </div>
      </TagHeader>

      <TagContainer>
        {loading ? (
          // 로딩 상태
          Array.from({ length: 8 }, (_, index) => (
            <LoadingTag key={index}>로딩중...</LoadingTag>
          ))
        ) : tags.length > 0 ? (
          // 태그 목록
          tags.map((tag) => (
            <Tag key={tag.id} onClick={() => handleTagClick(tag.name)}>
              #{tag.name}
            </Tag>
          ))
        ) : (
          // 빈 상태
          <EmptyState>
            <EmptyIcon>🏷️</EmptyIcon>
            <EmptyText>아직 등록된 태그가 없습니다.</EmptyText>
          </EmptyState>
        )}
      </TagContainer>
    </TagSection>
  );
};

export default TagList;