import { configureStore } from '@reduxjs/toolkit';

import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 🔥 Disables the slow middleware
    }),
});

export default store;