import { configureStore } from '@reduxjs/toolkit';
import askingReducer, { Question, Content } from './asking';
import resultReducer, { Result } from './answer';

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

export interface InitialState {
  asking: Asking;
  answer: Answer;
}

export default configureStore({
  reducer: {
    asking: askingReducer,
    answer: resultReducer,
  },
});
