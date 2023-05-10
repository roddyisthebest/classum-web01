import React from 'react';
import Title from './components/view/Title';
import Question from './components/card/Question';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  gap: 15px 0;
`;

function App() {
  return (
    <Container className="App">
      <Title></Title>
      <Question></Question>
    </Container>
  );
}

export default App;
