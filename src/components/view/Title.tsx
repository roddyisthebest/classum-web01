import styled from 'styled-components';
import { InputTitle, InputDescription } from '../../util/style';
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
  return (
    <Wrapper>
      <Header></Header>
      <Container>
        <InputTitle placeholder="설문지 제목"></InputTitle>
        <InputDescription placeholder="설문지 설명"></InputDescription>
      </Container>
    </Wrapper>
  );
}

export default Title;
