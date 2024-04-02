import { configureStore } from "@reduxjs/toolkit";
import { inventorySlice } from "./inventory/inventorySlice";
import { inventoryCategoriesSlice } from "./inventory/inventoryCategorySlice";


export const store = configureStore({
  reducer: {
    inventory: inventorySlice.reducer,
    inventoryCategories: inventoryCategoriesSlice.reducer
  }
});
