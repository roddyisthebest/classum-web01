import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Asking } from '.';
interface Type {
  typeIdx: number;
  englishName: string;
  koreanName: string;
}
export interface Content {
  contentIdx: number;
  text: string;
}

export interface Question {
  questionIdx: number;
  title: string;
  type: Type | null;
  contents: Content[];
  chosenContents: Content[];
  required: boolean;
  text: string;
  submittable: {
    first: boolean;
    value: boolean;
  };
}

const { actions, reducer } = createSlice({
  name: 'asking',
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
        chosenContents: [],
        text: '',
        submittable: {
          first: false,
          value: false,
        },
      },
    ],
  } as Asking,
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
    setQuestionText(
      state,
      { payload }: PayloadAction<{ questionIndex: number; text: string }>
    ) {
      const questions = [...state.questions];

      questions.splice(payload.questionIndex, 1, {
        ...questions[payload.questionIndex],
        text: payload.text,
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
            chosenContents: [],
            text: '',
            submittable: {
              first: false,
              value: false,
            },
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

    setChosenContent(
      state,
      {
        payload,
      }: PayloadAction<{
        questionIndex: number;
        data: Content | null;
        type: 'multiple choice' | 'check box' | 'dropdown' | 'reset';
      }>
    ) {
      const questions = [...state.questions];
      let chosenContents = [
        ...state.questions[payload.questionIndex].chosenContents,
      ];
      if (payload.type === 'multiple choice') {
        if (
          chosenContents.some(
            (chosenContent) =>
              chosenContent.contentIdx === payload.data?.contentIdx
          )
        ) {
          chosenContents = chosenContents.filter(
            (chosenContent) =>
              chosenContent.contentIdx !== payload.data?.contentIdx
          );
        } else {
          chosenContents = [payload.data as Content];
        }

        questions.splice(payload.questionIndex, 1, {
          ...questions[payload.questionIndex],
          chosenContents,
        });
      } else if (payload.type === 'check box') {
        if (
          chosenContents.some(
            (chosenContent) =>
              chosenContent.contentIdx === payload.data?.contentIdx
          )
        ) {
          chosenContents = chosenContents.filter(
            (chosenContent) =>
              chosenContent.contentIdx !== payload.data?.contentIdx
          );
        } else {
          chosenContents.push(payload.data as Content);
        }

        questions.splice(payload.questionIndex, 1, {
          ...questions[payload.questionIndex],
          chosenContents,
        });
      } else if (payload.type === 'dropdown') {
        chosenContents = [payload.data as Content];
        questions.splice(payload.questionIndex, 1, {
          ...questions[payload.questionIndex],
          chosenContents,
        });
      } else if (payload.type === 'reset') {
        questions.splice(payload.questionIndex, 1, {
          ...questions[payload.questionIndex],
          chosenContents: [],
        });
      }

      return { ...state, questions };
    },
    resetChosenContent(state) {
      const questions = [...state.questions];

      const newQuestions: Question[] = [];

      questions.map((question) =>
        newQuestions.push({ ...question, chosenContents: [], text: '' })
      );

      return { ...state, questions: newQuestions };
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
  setQuestionText,
  setRequired,
  setChosenContent,
  resetChosenContent,
} = actions;

export default reducer;
