import React, { memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { InputTitle } from '../../util/style';
import {
  RiArrowDownSFill,
  RiCheckboxBlankLine,
  RiCheckboxBlankCircleLine,
  RiDeleteBin6Line,
} from 'react-icons/ri';
import { TiDeleteOutline } from 'react-icons/ti';
import {
  MdContentCopy,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from 'react-icons/md';
import {
  Question as QuestionType,
  addContent,
  copyQuestion,
  deleteContent,
  deleteQuestion,
  setQuestionTitle,
  setRequired,
  setType,
  updateContent,
} from '../../store/slice';
import { useDispatch } from 'react-redux';

const Container = styled.div`
  background-color: white;
  border: 1px solid #d5d7db;
  border-radius: 7.5px;
  &:focus-within {
    border-color: #377bee;
  }
  min-width: 400px;
  padding: 30px;
  display: flex;
  gap: 15px 0;
  flex-direction: column;
`;

const TitleSection = styled.div`
  display: flex;
  gap: 0 20px;
  align-items: center;
  height: 50px;
  position: relative;
`;

const ModifiedInputTitle = styled(InputTitle)`
  flex: 1;
  font-size: 20px;
  height: 30px;
`;
const SelectBox = styled.button`
  border: 1px solid #d5d7db;
  height: 100%;
  padding: 10px 0;
  width: 130px;
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const SelectList = styled.div<{ visibility: boolean }>`
  width: 130px;
  height: 250px;
  position: absolute;
  right: 0;
  top: -111px;
  z-index: 5;
  background-color: white;
  border-radius: 5px;
  display: ${(props) => (props.visibility ? 'flex' : 'none')};
  flex-direction: column;
  box-shadow: 0 0 10px #00000023;
`;

const SelectItem = styled.button<{ isChecked: boolean }>`
  width: 100%;
  flex: 1;
  background-color: ${(props) => (props.isChecked ? '#ECF3FD' : 'white')};
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
  color: black;
  font-weight: ${(props) => (props.isChecked ? 600 : 400)};
  &:hover {
    background-color: ${(props) => (props.isChecked ? '#ECF3FD' : '#ebebeb')};
    /* : #ebebeb; */
  }

  &:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  &:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

const SelectText = styled.span`
  font-size: 15px;
  color: black;
`;

const ContentSection = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 15px 0;
`;

const Sentence = styled.div`
  width: 50%;
  border-bottom: 1px dotted black;
  color: #6e7377;
  padding-bottom: 5px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 0 10px;
`;

const ModifiedInputContent = styled(InputTitle)`
  flex: 1;
  font-size: 17px;
  height: 20px;
`;
const ContentText = styled.span`
  font-size: 22.5px;
  color: black;
  font-weight: 600;
`;

const NoodButton = styled.button`
  border: none;
  background-color: transparent;
  color: black;
  font-size: 16px;
  font-weight: 500;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UpdateButton = styled(NoodButton)`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  transition: all 150ms ease;
  &:hover {
    background-color: #d5d7db;
  }
`;

const RequiredButton = styled.button`
  border: none;
  background-color: transparent;
  color: black;
  font-size: 14px;
  font-weight: 600;
  padding-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0 7.5px;
`;

const UpdateSection = styled.div`
  border-top: 1px solid #d5d7db;
  padding-top: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0 5px;
`;

function Question({ data, index }: { data: QuestionType; index: number }) {
  interface Type {
    typeIdx: number;
    englishName: string;
    koreanName: string;
  }

  const dispatch = useDispatch();

  const types: Type[] = [
    { typeIdx: 1, englishName: 'short sentence', koreanName: '단답형' },
    { typeIdx: 2, englishName: 'long sentence', koreanName: '장문형' },
    { typeIdx: 3, englishName: 'multiple choice', koreanName: '객관식' },
    { typeIdx: 4, englishName: 'checkBox', koreanName: '체크박스' },
    { typeIdx: 5, englishName: 'dropdown', koreanName: '드롭다운' },
  ];

  const [visibility, setVisibility] = useState<boolean>(false);

  const onClickBox = useCallback(() => {
    setVisibility((prev) => !prev);
  }, []);

  const onClickItem = (type: Type) => {
    dispatch(setType({ type, questionIndex: index }));
    setVisibility(false);
  };

  const onClickDeleteQsBtn = () => {
    dispatch(deleteQuestion({ questionIdx: data.questionIdx }));
  };

  const onClickCopyQsBtn = () => {
    dispatch(copyQuestion({ questionIndex: index }));
  };

  const onClickAddBtn = () => {
    dispatch(addContent({ questionIndex: index }));
  };

  const onChangeCtInput = (contentIndex: number, text: string) => {
    dispatch(
      updateContent({
        questionIndex: index,
        contentIndex,
        text,
      })
    );
  };

  const onClickDeleteCtBtn = (idx: number) => {
    dispatch(
      deleteContent({ contentIdx: idx, questionIndex: data.questionIdx })
    );
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setQuestionTitle({
        questionIndex: data.questionIdx,
        text: e.target.value,
      })
    );
  };

  const onToggleRequiredBtn = () => {
    dispatch(setRequired({ questionIndex: index }));
  };

  const check = {
    isItTextType: () => data.type?.typeIdx === 1 || data.type?.typeIdx === 2,
    isItMultipleType: () => data.type?.typeIdx === 3,
    isItCheckBoxType: () => data.type?.typeIdx === 4,
    isItDropdownType: () => data.type?.typeIdx === 5,
    isThereOneContent: () => data.contents.length === 1,
    isItLastElement: (index: number) => index === data.contents.length - 1,
  };

  return (
    <Container>
      <TitleSection>
        <ModifiedInputTitle
          placeholder="질문"
          value={data.title}
          onChange={onChangeTitle}
        ></ModifiedInputTitle>
        <SelectBox onClick={onClickBox}>
          <SelectText>{data.type?.koreanName}</SelectText>
          <RiArrowDownSFill fontSize={20}></RiArrowDownSFill>
        </SelectBox>

        <SelectList visibility={visibility}>
          {types.map((type) => (
            <SelectItem
              key={type.typeIdx}
              isChecked={type.typeIdx === data.type?.typeIdx}
              onClick={() => onClickItem(type)}
            >
              {type.koreanName}
            </SelectItem>
          ))}
        </SelectList>
      </TitleSection>
      <ContentSection>
        {check.isItTextType() ? (
          <Sentence>{data.type?.koreanName} 텍스트</Sentence>
        ) : (
          <>
            {data.contents.map((content, index) => (
              <Content key={content.contentIdx}>
                {check.isItMultipleType() && (
                  <RiCheckboxBlankCircleLine
                    fontSize={25}
                    color="#6e7377"
                  ></RiCheckboxBlankCircleLine>
                )}
                {check.isItCheckBoxType() && (
                  <RiCheckboxBlankLine
                    fontSize={25}
                    color="#6e7377"
                  ></RiCheckboxBlankLine>
                )}
                {check.isItDropdownType() && (
                  <ContentText>{index + 1}</ContentText>
                )}

                <ModifiedInputContent
                  placeholder="질문"
                  onChange={(e) => onChangeCtInput(index, e.target.value)}
                  value={content.text}
                  autoFocus={check.isItLastElement(index)}
                ></ModifiedInputContent>
                {!check.isThereOneContent() && (
                  <NoodButton
                    onClick={() => onClickDeleteCtBtn(content.contentIdx)}
                  >
                    <TiDeleteOutline
                      color="#6e7377"
                      fontSize={25}
                    ></TiDeleteOutline>
                  </NoodButton>
                )}
              </Content>
            ))}
            <Content>
              {check.isItMultipleType() && (
                <RiCheckboxBlankCircleLine
                  fontSize={25}
                  color="#6e7377"
                ></RiCheckboxBlankCircleLine>
              )}
              {check.isItCheckBoxType() && (
                <RiCheckboxBlankLine
                  fontSize={25}
                  color="#6e7377"
                ></RiCheckboxBlankLine>
              )}
              {check.isItDropdownType() && (
                <ContentText>{data.contents.length + 1}</ContentText>
              )}
              <NoodButton onClick={onClickAddBtn}>추가하기</NoodButton>
            </Content>
          </>
        )}
      </ContentSection>
      <UpdateSection>
        <UpdateButton onClick={onClickCopyQsBtn}>
          <MdContentCopy></MdContentCopy>
        </UpdateButton>
        <UpdateButton onClick={onClickDeleteQsBtn}>
          <RiDeleteBin6Line></RiDeleteBin6Line>
        </UpdateButton>
        <RequiredButton onClick={onToggleRequiredBtn}>
          {data.required ? (
            <MdCheckBox fontSize={18}></MdCheckBox>
          ) : (
            <MdCheckBoxOutlineBlank fontSize={18}></MdCheckBoxOutlineBlank>
          )}
          필수
        </RequiredButton>
      </UpdateSection>
    </Container>
  );
}

export default memo(Question);
