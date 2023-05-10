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

export interface Question {
  questionIdx: number;
  title: string;
  type: Type | null;
  contents: Content[];
  required: boolean;
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
        required: false,
        questionIdx: Math.random() * 10000000,
        title: '',
        type: {
          typeIdx: 3,
          englishName: 'multiple choice',
          koreanName: '객관식',
        },
        contents: [
          {
            contentIdx: 0,
            text: '옵션1',
          },
        ],
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
    setRequired(state, { payload }: PayloadAction<{ questionIndex: number }>) {
      const questions = [...state.questions];

      questions.splice(payload.questionIndex, 1, {
        ...questions[payload.questionIndex],
        required: !questions[payload.questionIndex].required,
      });
      return { ...state, questions };
    },
    setQuestionTitle(
      state,
      { payload }: PayloadAction<{ text: string; questionIndex: number }>
    ) {
      const questions = [...state.questions];

      questions.splice(payload.questionIndex, 1, {
        ...questions[payload.questionIndex],
        title: payload.text,
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

      const contents = [...state.questions[payload.questionIndex].contents];

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
    addQuestion(state) {
      return {
        ...state,
        questions: [
          ...state.questions,
          {
            title: '',
            questionIdx: Math.random() * 10000000,
            type: {
              typeIdx: 3,
              englishName: 'multiple choice',
              koreanName: '객관식',
            },
            contents: [
              {
                contentIdx: 0,
                text: '옵션 1',
              },
            ],
            required: false,
          },
        ],
      };
    },
    deleteQuestion(state, { payload }: PayloadAction<{ questionIdx: number }>) {
      return {
        ...state,
        questions: state.questions.filter(
          (quetion) => quetion.questionIdx !== payload.questionIdx
        ),
      };
    },
    copyQuestion(state, { payload }: PayloadAction<{ questionIndex: number }>) {
      const questions = [...state.questions];
      questions.splice(payload.questionIndex + 1, 0, {
        ...state.questions[payload.questionIndex],
        questionIdx: Math.random() * 10000000,
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
  addQuestion,
  deleteQuestion,
  copyQuestion,
  setQuestionTitle,
  setRequired,
} = actions;

export default reducer;
