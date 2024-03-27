import { configureStore } from '@reduxjs/toolkit'
import doctorInfoSlice from './features/doctorInfo/doctorInfoSlice'

export const store = configureStore({
  reducer: {
    doctorInfo: doctorInfoSlice,
  },
})