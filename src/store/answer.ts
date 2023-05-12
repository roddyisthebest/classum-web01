import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Answer } from '.';
import { Content, Question, Type } from './asking';

export interface Result {
  idx: number;
  title: string;
  contents: Content[];
  text: string;
  type: Type | null;
}

const { actions, reducer } = createSlice({
  name: 'answer',
  initialState: {
    title: '',
    description: '',
    results: [],
  } as Answer,
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

      const newResults: Result[] = [];

      questions.map((question) => {
        const result = {
          idx: question.questionIdx,
          title: question.title,
          text: question.text,
          type: question.type,
          contents: question.chosenContents,
        };
        newResults.push(result);
      });

      return {
        ...state,
        title: payload.title,
        description: payload.description,
        results: newResults,
      };
    },
  },
});

export const { setResult } = actions;
export default reducer;
