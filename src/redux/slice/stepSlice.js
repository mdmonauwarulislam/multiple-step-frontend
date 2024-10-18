import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 1,
};

const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1; 
    },
    resetStep: (state) => {
      state.step = 1;
    },
  },
});

export const { nextStep, prevStep, resetStep } = stepSlice.actions;
export default stepSlice.reducer;
