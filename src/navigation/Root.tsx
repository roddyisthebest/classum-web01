import React from 'react';
import Title from '../components/view/Title';
import Question from '../components/card/Question';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { InitialState, addQuestion } from '../store/slice';
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

const AddButton = styled.button`
  min-width: 460px;
  height: 50px;
  border-radius: 8px;
  background-color: #5b35aa;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 17.5px;
  cursor: pointer;
`;

function Root() {
  const dispatch = useDispatch();
  const questions = useSelector((state: InitialState) => state.questions);

  const onClickAddBtn = () => {
    dispatch(addQuestion());
  };

  return (
    <Container>
      <Title></Title>
      <QuestionList>
        {questions.map((question) => (
          <Question data={question} key={question.questionIdx}></Question>
        ))}
        <AddButton onClick={onClickAddBtn}>질문 추가</AddButton>
      </QuestionList>
    </Container>
  );
}

export default Root;
