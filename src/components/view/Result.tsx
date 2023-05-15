import styled from 'styled-components';

import { InputDescription, InputTitle, TextArea } from '../../util/style';
import { useDispatch, useSelector } from 'react-redux';
import { InitialState } from '../../store';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { resetState } from '../../store/asking';
import { setVisibility } from '../../store/display';

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #00000050;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 50%;
  height: 80%;
  border-radius: 8px;
  background-color: white;
  overflow-y: scroll;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px 0;
`;

const Title = styled.div`
  border-radius: 8px;
  padding: 20px;
  background-color: white;
  border: 1px solid #d5d7db;
  border-radius: 7.5px;
  &:focus-within {
    border-color: #377bee;
  }
  position: relative;
  /* margin-top: 20px; */
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 10px 0;
`;

const Content = styled.div`
  background-color: white;
  border-width: 1px;
  border-style: solid;
  border-color: #d5d7db;
  border-radius: 7.5px;

  width: 60%;
  padding: 20px;
  display: flex;
  gap: 15px 0;
  flex-direction: column;
  transition: all 150ms ease-in;
`;

const ContentInputTitle = styled(InputTitle)`
  border-bottom: none;
  &:focus {
    border-bottom: none;
  }
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  cursor: default;
`;

const LongSt = styled(TextArea)`
  font-size: 15px;
  font-weight: 400;
  font-weight: 400;
  &::placeholder {
    color: #6e7377;
  }
  cursor: default;
`;

const ShortSt = styled(InputTitle)`
  font-size: 15px;
  cursor: default;
  font-weight: 400;
`;

const ChosenContent = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  gap: 0 15px;
`;
// 제출 내용을 보여주는 결과 컴포넌트입니다.

function Result() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const answer = useSelector((state: InitialState) => state.answer);
  const check = {
    isItShortStType: (typeIdx: number) => typeIdx === 1,
    isItLongStType: (typeIdx: number) => typeIdx === 2,
  };
  return (
    <Wrapper
      id="Wrapper"
      onClick={(e: any) => {
        if (e.target?.id === 'Wrapper') {
          // eslint-disable-next-line no-restricted-globals
          if (confirm('설문지를 리셋하시겠습니까?')) {
            dispatch(resetState());
          }
          dispatch(setVisibility({ key: 'ResultPopup', value: false }));
          document.body.style.overflow = 'auto';
          navigate('/');
        }
      }}
    >
      <Container>
        <div>제출되었습니다.</div>
        <Title>
          <InputTitle
            style={{ width: '100%', cursor: 'default' }}
            readOnly
            value={answer.title.length === 0 ? '제목없는 설문지' : answer.title}
          ></InputTitle>
          <InputDescription
            style={{ width: '100%', cursor: 'default' }}
            readOnly
            value={
              answer.description.length === 0 ? '설명없음' : answer.description
            }
          ></InputDescription>
        </Title>
        {answer.results.map((result) => (
          <Content key={result.idx}>
            {result.title.length !== 0 && (
              <ContentInputTitle
                readOnly
                value={result.title}
              ></ContentInputTitle>
            )}

            {check.isItShortStType(result.type?.typeIdx as number) && (
              <ShortSt
                placeholder="내 답변"
                readOnly
                value={result.text}
              ></ShortSt>
            )}
            {check.isItLongStType(result.type?.typeIdx as number) && (
              <LongSt
                rows={4}
                placeholder="내 답변"
                value={result.text}
                readOnly
              ></LongSt>
            )}
            {!check.isItShortStType(result.type?.typeIdx as number) &&
              !check.isItLongStType(result.type?.typeIdx as number) &&
              result.contents.map((content) => (
                <ChosenContent key={content.contentIdx}>
                  <RiCheckboxBlankCircleFill
                    fontSize={20}
                    color="#6e7377"
                  ></RiCheckboxBlankCircleFill>
                  {content.text}
                </ChosenContent>
              ))}
          </Content>
        ))}
      </Container>
    </Wrapper>
  );
}

export default Result;
