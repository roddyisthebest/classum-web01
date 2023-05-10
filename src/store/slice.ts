import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Type {
  typeIdx: number;
  englishName: string;
  koreanName: string;
}
interface Content {
  contentIdx: number;
  text: string;
}

interface Question {
  questionIdx: number;
  type: Type | null;
  contents: Content[];
}

export interface InitialState {
  title: string;
  description: string;
  questions: Question[];
}

const { actions, reducer } = createSlice({
  name: 'store',
  initialState: {
    title: '',
    description: '',
    questions: [
      {
        questionIdx: 0,
        type: {
          typeIdx: 3,
          englishName: 'multiple choice',
          koreanName: '객관식',
        },
        contents: [],
      },
    ],
  } as InitialState,
  reducers: {
    setTitle(state, { payload }: PayloadAction<{ text: string }>) {
      return { ...state, title: payload.text };
    },
    setDescription(state, { payload }: PayloadAction<{ text: string }>) {
      return { ...state, description: payload.text };
    },
    setType(
      state,
      { payload }: PayloadAction<{ type: Type; questionIndex: number }>
    ) {
      const questions = [...state.questions];
      questions.splice(payload.questionIndex, 1, {
        ...questions[payload.questionIndex],
        type: payload.type,
      });

      return { ...state, questions };
    },
    addContent(state, { payload }: PayloadAction<{ questionIndex: number }>) {
      const questions = [...state.questions];

      const contents = state.questions[payload.questionIndex].contents;

      questions.splice(payload.questionIndex, 1, {
        ...questions[payload.questionIndex],
        contents: [
          ...contents,
          {
            contentIdx: contents[contents.length - 1].contentIdx + 1,
            text: `옵션 ${contents.length + 1}`,
          },
        ],
      });

      return {
        ...state,
        questions,
      };
    },
    deleteContent(
      state,
      { payload }: PayloadAction<{ contentIdx: number; questionIndex: number }>
    ) {
      const questions = [...state.questions];
      let contents = state.questions[payload.questionIndex].contents;

      contents = contents.filter(
        (content) => content.contentIdx !== payload.contentIdx
      );

      questions.splice(payload.questionIndex, 1, {
        ...questions[payload.questionIndex],
        contents,
      });

      return {
        ...state,
        questions,
      };
    },
    updateContent(
      state,
      {
        payload,
      }: PayloadAction<{
        contentIndex: number;
        questionIndex: number;
        text: string;
      }>
    ) {
      const questions = [...state.questions];

      let contents = state.questions[payload.questionIndex].contents;

      contents.splice(payload.contentIndex, 1, {
        ...contents[payload.contentIndex],
        text: payload.text,
      });

      questions.splice(payload.questionIndex, 1, {
        ...questions[payload.questionIndex],
        contents,
      });
      return {
        ...state,
        questions,
      };
    },
  },
});

export const {
  setTitle,
  setDescription,
  setType,
  addContent,
  deleteContent,
  updateContent,
} = actions;

export default reducer;