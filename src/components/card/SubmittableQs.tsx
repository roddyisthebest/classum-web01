import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { InputTitle, TextArea } from '../../util/style';
import {
  RiCheckboxBlankLine,
  RiCheckboxBlankCircleLine,
  RiCheckboxBlankFill,
  RiCheckboxBlankCircleFill,
} from 'react-icons/ri';
import { FiAlertCircle } from 'react-icons/fi';
import {
  Question as QuestionType,
  setChosenContent,
  setQuestionText,
  setSubmittable,
} from '../../store/asking';
import { useDispatch } from 'react-redux';
import { Content as ContentType } from '../../store/asking';

const Container = styled.div<{ submittable: boolean }>`
  background-color: white;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => (props.submittable ? '#d5d7db' : 'red')};
  border-radius: 7.5px;

  width: 400px;
  padding: 30px;
  display: flex;
  gap: 15px 0;
  flex-direction: column;
  transition: all 150ms ease-in;
`;

const TitleSection = styled.div`
  display: flex;
  gap: 0 20px;
  align-items: center;
  height: 50px;
  position: relative;
`;

const ContentTitle = styled.div`
  flex: 1;
  font-size: 20px;
  height: 30px;
  font-weight: 600;
`;

const Strong = styled.strong`
  color: red;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px 0;
`;

const ShortSt = styled(InputTitle)`
  font-size: 15px;

  font-weight: 400;
`;

const LongSt = styled(TextArea)`
  font-size: 15px;
  font-weight: 400;
  font-weight: 400;
  &::placeholder {
    color: #6e7377;
  }
`;

const Content = styled.button`
  display: flex;
  align-items: center;
  gap: 0 10px;
  border: none;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
`;

const ContentText = styled.span`
  font-size: 14px;
  color: black;
  font-weight: 600;
`;

const ResetContentBtn = styled.button`
  border: none;
  background-color: transparent;
  color: black;
  font-size: 13px;
  font-weight: 500;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 8px;
  &:hover {
    background-color: #f3f3f3;
  }
  justify-content: center;
  border-radius: 5px;
`;

const ContentColumn = styled.div`
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Select = styled.select`
  border: 1px solid #d5d7db;
  background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>")
    no-repeat;
  background-position: calc(100% - 0.75rem) center !important;
  -moz-appearance: none !important;
  -webkit-appearance: none !important;
  appearance: none !important;
  padding: 15px 10px;
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Option = styled.option`
  font-size: 20px;
`;

const CautionSection = styled.div`
  color: red;
  font-weight: 500;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 0 5px;
`;

// 제출 가능한 질문 컴포넌트입니다. - 편집 x, 오직 항목들 선택만 가능

function SubmittableQs({ data, index }: { data: QuestionType; index: number }) {
  const [localSubmit, setLocalSubmit] = useState<{
    first: boolean;
    value: boolean;
  }>({
    first: true,
    value: false,
  });

  const dispatch = useDispatch();

  const check = {
    isItShortStType: () => data.type?.typeIdx === 1,
    isItLongStType: () => data.type?.typeIdx === 2,
    isItTextType: () => data.type?.typeIdx === 1 || data.type?.typeIdx === 2,
    isItMultipleType: () => data.type?.typeIdx === 3,
    isItCheckBoxType: () => data.type?.typeIdx === 4,
    isItDropdownType: () => data.type?.typeIdx === 5,
    isThereOneContent: () => data.contents.length === 1,
    isItLastElement: (index: number) => index === data.contents.length - 1,
    isSubmittable: () => localSubmit.first || localSubmit.value,
  };

  const onChangeSentence = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch(setQuestionText({ questionIndex: index, text: e.target.value }));
  };

  const onClickContentBtn = (
    content: ContentType | null,
    type: 'multiple choice' | 'check box' | 'dropdown'
  ) => {
    dispatch(
      setChosenContent({
        questionIndex: index,
        data: content,
        type,
      })
    );
  };

  const onClickResetContentBtn = () => {
    dispatch(
      setChosenContent({
        type: 'reset',
        data: null,
        questionIndex: index,
      })
    );
  };

  useEffect(() => {
    if (!localSubmit.first && data.required) {
      if (data.text.length === 0 && data.chosenContents.length === 0) {
        setLocalSubmit({ first: false, value: false });
        dispatch(setSubmittable({ questionIndex: index, value: false }));
      } else {
        setLocalSubmit({ first: false, value: true });
        dispatch(setSubmittable({ questionIndex: index, value: true }));
      }
    }

    if (!data.required) {
      setLocalSubmit({ first: false, value: true });
    }
  }, [
    data.chosenContents.length,
    data.required,
    data.text.length,
    dispatch,
    index,
    localSubmit.first,
  ]);

  useEffect(() => {
    if (data.chosenContents.length === 1 || data.text.length === 1) {
      setLocalSubmit((prev) => ({ ...prev, first: false }));
    }
  }, [data.chosenContents, data.text]);

  return (
    <Container submittable={check.isSubmittable()}>
      {(data.title.length !== 0 || data.required) && (
        <TitleSection>
          <ContentTitle>
            {data.required && <Strong>* </Strong>}
            {data.title}
          </ContentTitle>
        </TitleSection>
      )}

      <ContentSection>
        {check.isItShortStType() && (
          <ShortSt
            placeholder="내 답변"
            onChange={onChangeSentence}
            value={data.text}
          ></ShortSt>
        )}
        {check.isItLongStType() && (
          <LongSt
            rows={4}
            placeholder="내 답변"
            onChange={onChangeSentence}
            value={data.text}
          ></LongSt>
        )}
        {check.isItMultipleType() && (
          <>
            {data.contents.map((content, index) => (
              <Content
                key={content.contentIdx}
                onClick={() => onClickContentBtn(content, 'multiple choice')}
              >
                {data.chosenContents.some(
                  (chosenContent) =>
                    chosenContent.contentIdx === content.contentIdx
                ) ? (
                  <RiCheckboxBlankCircleFill
                    fontSize={25}
                    color="#6e7377"
                  ></RiCheckboxBlankCircleFill>
                ) : (
                  <RiCheckboxBlankCircleLine
                    fontSize={25}
                    color="#6e7377"
                  ></RiCheckboxBlankCircleLine>
                )}
                <ContentText>{content.text}</ContentText>
              </Content>
            ))}
            {data.chosenContents.length !== 0 && !data.required && (
              <ContentColumn onClick={onClickResetContentBtn}>
                <ResetContentBtn>선택해제</ResetContentBtn>
              </ContentColumn>
            )}
          </>
        )}

        {check.isItCheckBoxType() && (
          <>
            {data.contents.map((content, index) => (
              <Content
                key={content.contentIdx}
                onClick={() => onClickContentBtn(content, 'check box')}
              >
                {data.chosenContents.some(
                  (chosenContent) =>
                    chosenContent.contentIdx === content.contentIdx
                ) ? (
                  <RiCheckboxBlankFill
                    fontSize={25}
                    color="#6e7377"
                  ></RiCheckboxBlankFill>
                ) : (
                  <RiCheckboxBlankLine
                    fontSize={25}
                    color="#6e7377"
                  ></RiCheckboxBlankLine>
                )}
                <ContentText>{content.text}</ContentText>
              </Content>
            ))}
            {data.chosenContents.length !== 0 && !data.required && (
              <ContentColumn onClick={onClickResetContentBtn}>
                <ResetContentBtn>선택해제</ResetContentBtn>
              </ContentColumn>
            )}
          </>
        )}

        {check.isItDropdownType() && (
          <>
            <Select
              name="pets"
              id="pet-select"
              onChange={(e) => {
                if (e.target.value.length === 0) {
                  return onClickResetContentBtn();
                }
                const content: ContentType = JSON.parse(e.target.value);
                onClickContentBtn(content, 'dropdown');
              }}
            >
              <Option value="" selected={data.chosenContents.length === 0}>
                선택
              </Option>
              {data.contents.map((content) => (
                <Option
                  value={JSON.stringify(content)}
                  key={content.contentIdx}
                >
                  {content.text}
                </Option>
              ))}
            </Select>
          </>
        )}
      </ContentSection>
      {!check.isSubmittable() && (
        <CautionSection>
          <FiAlertCircle></FiAlertCircle>필수 질문입니다.
        </CautionSection>
      )}
    </Container>
  );
}

export default memo(SubmittableQs);
