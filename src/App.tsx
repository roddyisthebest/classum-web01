import React from 'react';
import Title from './components/view/Title';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
`;

function App() {
  return (
    <Container className="App">
      <Title></Title>
    </Container>
  );
}

export default App;
