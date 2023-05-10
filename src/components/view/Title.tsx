import styled from 'styled-components';
import { InputTitle, InputDescription } from '../../util/style';
import { useDispatch, useSelector } from 'react-redux';
import { InitialState, setDescription, setTitle } from '../../store/slice';

const Wrapper = styled.div`
  background-color: white;
  border: 1px solid #d5d7db;
  border-radius: 7.5px;
  &:focus-within {
    border-color: #377bee;
  }
  min-width: 700px;
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

function Title() {
  const dispatch = useDispatch();
  const title = useSelector((state: InitialState) => state.title);
  const description = useSelector((state: InitialState) => state.description);
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
        <InputTitle
          placeholder="설문지 제목"
          onChange={onChangeTitle}
          value={title}
        ></InputTitle>
        <InputDescription
          placeholder="설문지 설명"
          onChange={onChangeDescription}
          value={description}
        ></InputDescription>
      </Container>
    </Wrapper>
  );
}

export default Title;
