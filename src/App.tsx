import React from 'react';
import Title from './components/view/Title';
import Question from './components/card/Question';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import store from './store';
import Root from './navigation/Root';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  gap: 15px 0;
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 15px 0;
`;

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Root></Root>
      </div>
    </Provider>
  );
}

export default App;
