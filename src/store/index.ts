import { configureStore } from '@reduxjs/toolkit';
import askingReducer, { Question, Content } from './asking';
import resultReducer, { Result } from './answer';
import displayReducer from './display';
export interface Asking {
  title: string;
  description: string;
  questions: Question[];
}

export interface Answer {
  title: string;
  description: string;
  results: Result[];
}

interface Display {
  visibility: {
    ResultPopup: boolean;
    SelectBox: boolean;
  };
}

export interface InitialState {
  asking: Asking;
  answer: Answer;
  display: Display;
}

export default configureStore({
  reducer: {
    asking: askingReducer,
    answer: resultReducer,
    display: displayReducer,
  },
});
