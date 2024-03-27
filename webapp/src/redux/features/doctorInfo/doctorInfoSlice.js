import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  id:0,
}

export const doctorInfoSlice = createSlice({

  name: 'doctorInfo',
  initialState,
  
  reducers: {
  
    updateDoctorInfo:(state, action) =>{
        state.username = action.payload.username;
        state.id = action.payload.id;
    },

    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateDoctorInfo, increment, decrement, incrementByAmount } = doctorInfoSlice.actions

export default doctorInfoSlice.reducer