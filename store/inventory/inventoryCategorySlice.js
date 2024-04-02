import { createSlice } from "@reduxjs/toolkit";

export const inventoryCategoriesSlice = createSlice({
  name: "inventoryCategories",
  initialState: [],
  reducers: {
    getAllInventoryCategories: (state, { payload }) => {
      const { data } = payload;
      return data;
    },
  },
});

export const { getAllInventoryCategories } = inventoryCategoriesSlice.actions;
