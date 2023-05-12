import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
