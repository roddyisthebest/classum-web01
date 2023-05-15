import React from 'react';
import Title from '../components/view/Title';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion } from '../store/asking';
import { AiFillEye } from 'react-icons/ai';
import { InitialState } from '../store';
import { Link } from 'react-router-dom';
import EditableQs from '../components/card/EditableQs';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px 0;
  min-height: 100vh;
  position: relative;
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

const PreviewButton = styled(Link)`
  min-width: 460px;
  height: 50px;
  border-radius: 8px;
  border: 1px solid #5b35aa;
  color: #5b35aa;
  background-color: white;
  font-weight: 600;
  font-size: 17.5px;
  display: flex;
  justify-content: center;
  gap: 0 10px;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
`;

function Home() {
  const dispatch = useDispatch();
  const questions = useSelector(
    (state: InitialState) => state.asking.questions
  );

  const onClickAddBtn = () => {
    dispatch(addQuestion());
  };

  return (
    <Container>
      <Title readOnly={false}></Title>
      <QuestionList>
        {questions.map((question, index) => (
          <EditableQs
            data={question}
            key={question.questionIdx}
            index={index}
          ></EditableQs>
        ))}
        <AddButton onClick={onClickAddBtn}>질문 추가</AddButton>
        <PreviewButton to="/preview">
          <AiFillEye></AiFillEye>미리보기
        </PreviewButton>
      </QuestionList>
    </Container>
  );
}

export default Home;
