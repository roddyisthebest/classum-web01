import { configureStore } from '@reduxjs/toolkit';
import askingReducer, { Question } from './asking';

export interface Asking {
  title: string;
  description: string;
  questions: Question[];
}

export interface InitialState {
  asking: Asking;
}

export default configureStore({
  reducer: {
    asking: askingReducer,
  },
});
