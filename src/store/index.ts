import { configureStore } from '@reduxjs/toolkit';
import askingReducer, { Question, Content } from './asking';
import resultReducer, { Data } from './result';

export interface Asking {
  title: string;
  description: string;
  questions: Question[];
}

export interface Result {
  title: string;
  description: string;
  contents: Data[];
}

export interface InitialState {
  asking: Asking;
  result: Result;
}

export default configureStore({
  reducer: {
    asking: askingReducer,
    result: resultReducer,
  },
});
