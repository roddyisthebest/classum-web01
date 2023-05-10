import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Type {
  idx: number;
  englishName: string;
  koreanName: string;
}
interface Content {
  idx: number;
  text: string;
}

export interface InitialState {
  question: {
    title: string;
    description: string;
    type: Type | null;
    contents: Content[];
  };
}

const { actions, reducer } = createSlice({
  name: 'store',
  initialState: {
    question: {
      title: '',
      description: '',
      type: null,
      contents: [],
    },
  } as InitialState,
  reducers: {
    setTitle(state, { payload }: PayloadAction<{ text: string }>) {
      return { question: { ...state.question, title: payload.text } };
    },
    setDescription(state, { payload }: PayloadAction<{ text: string }>) {
      return { question: { ...state.question, description: payload.text } };
    },
    setType(state, { payload }: PayloadAction<{ type: Type }>) {
      return { question: { ...state.question, type: payload.type } };
    },
    addContent(state) {
      return {
        question: {
          ...state.question,
          contents: [
            ...state.question.contents,
            {
              idx:
                state.question.contents[state.question.contents.length - 1]
                  .idx + 1,
              text: `옵션 ${state.question.contents.length + 1}`,
            },
          ],
        },
      };
    },
    deleteContent(state, { payload }: PayloadAction<{ idx: number }>) {
      return {
        question: {
          ...state.question,
          contents: state.question.contents.filter(
            (content) => content.idx !== payload.idx
          ),
        },
      };
    },
    updateContent(
      state,
      { payload }: PayloadAction<{ index: number; text: string }>
    ) {
      const contents = [...state.question.contents];
      contents.splice(payload.index, 1, {
        ...contents[payload.index],
        text: payload.text,
      });
      return {
        question: {
          ...state.question,
          contents,
        },
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
