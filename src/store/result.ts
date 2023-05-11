import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Result } from '.';
import { Content, Question, Type } from './asking';

export interface Data {
  idx: number;
  title: string;
  contents: Content[];
  text: string;
  type: Type | null;
}

const { actions, reducer } = createSlice({
  name: 'result',
  initialState: {
    title: '',
    description: '',
    contents: [],
  } as Result,
  reducers: {
    setResult(
      state,
      {
        payload,
      }: PayloadAction<{
        title: string;
        description: string;
        data: Question[];
      }>
    ) {
      const questions = [...payload.data];

      const newContents: Data[] = [];

      questions.map((question) => {
        const contents = {
          idx: question.questionIdx,
          title: question.title,
          text: question.text,
          type: question.type,
          contents: question.chosenContents,
        };
        newContents.push(contents);
      });

      return {
        ...state,
        title: payload.title,
        description: payload.description,
        contents: newContents,
      };
    },
  },
});

export const { setResult } = actions;
export default reducer;
