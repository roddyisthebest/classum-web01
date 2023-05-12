import styled from 'styled-components';
import Title from '../components/view/Title';
import { useDispatch, useSelector } from 'react-redux';
import { InitialState } from '../store';
import SubmittableQs from '../components/card/SubmittableQs';
import { resetChosenContent } from '../store/asking';
import { useEffect, useState } from 'react';
import Result from '../components/view/Result';
import { setResult } from '../store/answer';
import { setVisibility } from '../store/display';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 30px 0; */
  gap: 15px 0;
  position: relative;
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 15px 0;
`;

const ButtonList = styled.div`
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const AddButton = styled.button`
  min-width: 30%;
  height: 50px;
  border-radius: 8px;
  background-color: #5b35aa;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 17.5px;
  cursor: pointer;
`;

const ResetButton = styled.button`
  min-width: 30%;
  height: 50px;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #5b35aa;
  font-weight: 600;
  font-size: 17.5px;
  cursor: pointer;
`;

function Preview() {
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState<boolean>(true);

  const asking = useSelector((state: InitialState) => state.asking);
  const visibility = useSelector(
    (state: InitialState) => state.display.visibility.ResultPopup
  );
  const handleReset = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('양식을 지우시겠습니까?')) {
      dispatch(resetChosenContent());
    }
  };

  const handleSubmit = () => {
    dispatch(setVisibility({ key: 'ResultPopup', value: true }));
    dispatch(
      setResult({
        title: asking.title,
        description: asking.description,
        data: asking.questions,
      })
    );
  };

  useEffect(() => {
    if (asking.questions.some((question) => !question.submittable)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [asking.questions]);

  useEffect(() => {
    if (visibility) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [visibility]);

  return (
    <>
      <Container>
        {visibility && <Result></Result>}

        <Title readOnly={true}></Title>
        <QuestionList>
          {asking.questions.map((question, index) => (
            <SubmittableQs
              data={question}
              key={question.questionIdx}
              index={index}
            ></SubmittableQs>
          ))}
          <ButtonList>
            <AddButton disabled={disabled} onClick={handleSubmit}>
              제출하기
            </AddButton>
            <ResetButton onClick={handleReset}>양식 지우기</ResetButton>
          </ButtonList>
        </QuestionList>
      </Container>
    </>
  );
}

export default Preview;
