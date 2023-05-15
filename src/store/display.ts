import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 특정 컴포넌트들의 가시성에 관련된 데이터에 대한 스토어 - display

const { actions, reducer } = createSlice({
  name: 'display',
  initialState: {
    visibility: {
      ResultPopup: false,
    },
  },
  reducers: {
    setVisibility(
      state,
      { payload }: PayloadAction<{ key: 'ResultPopup'; value: boolean }>
    ) {
      return {
        ...state,
        visibility: {
          ...state.visibility,
          [payload.key]: payload.value,
        },
      };
    },
  },
});

export const { setVisibility } = actions;
export default reducer;
