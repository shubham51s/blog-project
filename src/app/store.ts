import { configureStore } from "@reduxjs/toolkit";
import muteReducer from "../features/mute/muteSlice";

export const store = configureStore({
  reducer: {
    mutes: muteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
