import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: white;
  border: 1px solid #d5d7db;
  border-radius: 7.5px;
  &:focus-within {
    border-color: #377bee;
  }
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

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #e0e0e0;
  outline: none;
  &:focus {
    border-bottom: 2px solid #5b35aa;
  }
  padding: 10px 0;
  transition: all 300ms ease;
  &::placeholder {
    color: #6e7377;
  }
`;

const InputTitle = styled(Input)`
  font-size: 30px;
  font-weight: 600;
`;

const InputDescription = styled(Input)`
  font-size: 20px;
  font-weight: 400;
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
