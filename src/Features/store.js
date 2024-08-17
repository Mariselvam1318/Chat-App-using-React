
import themeSliceReducer from "./themeSlice";
import refreshSidebar from "./refreshSidebar";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    themeKey: themeSliceReducer,
    refreshKey: refreshSidebar,
  },
});
export default store;