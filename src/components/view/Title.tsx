import styled from 'styled-components';
import { InputTitle, InputDescription } from '../../util/style';
import { useDispatch, useSelector } from 'react-redux';
import { setDescription, setTitle } from '../../store/asking';
import { InitialState } from '../../store';

const Wrapper = styled.div`
  background-color: white;
  border: 1px solid #d5d7db;
  border-radius: 7.5px;
  &:focus-within {
    border-color: #377bee;
  }
  min-width: 460px;
  position: relative;
  margin-top: 25px;
`;

const Container = styled.div`
  padding: 30px;
  display: flex;
  gap: 15px 0;
  flex-direction: column;
`;

const Header = styled.div`
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  height: 10px;
  background-color: #5b35aa;
`;

const ModifiedInputTitle = styled(InputTitle)<{ editable: boolean }>`
  cursor: ${(props) => props.editable && 'default'};
`;

const ModifiedInputDescription = styled(InputDescription)<{
  editable: boolean;
}>`
  cursor: ${(props) => props.editable && 'default'};
`;
const CautionColumn = styled.div`
  font-size: 13px;
  color: red;
  font-weight: 500;
`;

// 질문의 타이틀을 보여주는 타이틀 컴포넌트입니다.
function Title({ readOnly }: { readOnly: boolean }) {
  const dispatch = useDispatch();
  const title = useSelector((state: InitialState) => state.asking.title);
  const description = useSelector(
    (state: InitialState) => state.asking.description
  );
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle({ text: e.target.value }));
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDescription({ text: e.target.value }));
  };

  return (
    <Wrapper>
      <Header></Header>
      <Container>
        <ModifiedInputTitle
          readOnly={readOnly}
          editable={readOnly}
          placeholder="설문지 제목"
          onChange={onChangeTitle}
          value={readOnly && title.length === 0 ? '제목없는 설문지' : title}
        ></ModifiedInputTitle>
        <ModifiedInputDescription
          readOnly={readOnly}
          editable={readOnly}
          placeholder="설문지 설명"
          onChange={onChangeDescription}
          value={
            readOnly && description.length === 0 ? '설명 없음' : description
          }
        ></ModifiedInputDescription>
        {readOnly && (
          <CautionColumn>
            <strong>*</strong> 표시는 필수 질문임
          </CautionColumn>
        )}
      </Container>
    </Wrapper>
  );
}

export default Title;
