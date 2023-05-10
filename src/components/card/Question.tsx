import React, { memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { InputTitle } from '../../util/style';
import {
  RiArrowDownSFill,
  RiCheckboxBlankLine,
  RiCheckboxBlankCircleLine,
} from 'react-icons/ri';

import { TiDeleteOutline } from 'react-icons/ti';
import { Question as QuestionType } from '../../store/slice';

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
`;

function Question({ data }: { data: QuestionType }) {
  interface Type {
    idx: number;
    englishName: string;
    koreanName: string;
  }

  interface Content {
    idx: number;
    text: string;
  }

  const types: Type[] = [
    { idx: 1, englishName: 'short sentence', koreanName: '단답형' },
    { idx: 2, englishName: 'long sentence', koreanName: '장문형' },
    { idx: 3, englishName: 'multiple choice', koreanName: '객관식' },
    { idx: 4, englishName: 'checkBox', koreanName: '체크박스' },
    { idx: 5, englishName: 'dropdown', koreanName: '드롭다운' },
  ];

  const [chosenType, setChosenType] = useState<Type>({
    idx: 3,
    englishName: 'multiple choice',
    koreanName: '객관식',
  });

  const [contents, setContents] = useState<Content[]>([
    { idx: 1, text: '옵션1' },
  ]);

  const [visibility, setVisibility] = useState<boolean>(false);

  const onClickBox = useCallback(() => {
    setVisibility((prev) => !prev);
  }, []);

  const onClickItem = useCallback((type: Type) => {
    setChosenType(type);
    setVisibility(false);
  }, []);

  const addContent = () => {
    setContents((prev) => [
      ...prev,
      {
        idx: contents[contents.length - 1].idx + 1,
        text: `옵션 ${contents.length + 1}`,
      },
    ]);
  };

  const updateContent = (index: number, text: string) => {
    const copyContents = [...contents];
    copyContents.splice(index, 1, { ...contents[index], text });
    setContents(copyContents);
  };

  const deleteContent = (idx: number) => {
    setContents((prev) => prev.filter((cont) => cont.idx !== idx));
  };

  const check = {
    isItTextType: () => chosenType.idx === 1 || chosenType.idx === 2,
    isItMultipleType: () => chosenType.idx === 3,
    isItCheckBoxType: () => chosenType.idx === 4,
    isItDropdownType: () => chosenType.idx === 5,
    isThereOneContent: () => contents.length === 1,
    isItLastElement: (index: number) => index === contents.length - 1,
  };

  return (
    <Container>
      <TitleSection>
        <ModifiedInputTitle placeholder="질문"></ModifiedInputTitle>
        <SelectBox onClick={onClickBox}>
          <SelectText>{chosenType.koreanName}</SelectText>
          <RiArrowDownSFill fontSize={20}></RiArrowDownSFill>
        </SelectBox>

        <SelectList visibility={visibility}>
          {types.map((type) => (
            <SelectItem key={type.idx} isChecked={false}>
              {type.koreanName}
            </SelectItem>
          ))}
        </SelectList>
      </TitleSection>
      <ContentSection>
        {check.isItTextType() ? (
          <Sentence>{chosenType.koreanName} 텍스트</Sentence>
        ) : (
          <>
            {contents.map((content, index) => (
              <Content key={content.idx}>
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
                  onChange={(e) => updateContent(index, e.target.value)}
                  value={content.text}
                  autoFocus={check.isItLastElement(index)}
                ></ModifiedInputContent>
                {!check.isThereOneContent() && (
                  <NoodButton onClick={() => deleteContent(content.idx)}>
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
                <ContentText>{contents.length + 1}</ContentText>
              )}
              <NoodButton onClick={addContent}>추가하기</NoodButton>
            </Content>
          </>
        )}
      </ContentSection>
    </Container>
  );
}

export default memo(Question);
