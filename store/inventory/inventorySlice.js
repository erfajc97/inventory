import { createSlice } from "@reduxjs/toolkit";
export const inventorySlice = createSlice({
  name: "inventory",
  initialState: [],
  reducers: {
    setInventory: (state, { payload }) => {
      const { equipments, supplies, out_of_stock } = payload.data;
      const result = [
        { ...supplies, title: "INSUMO" },
        { ...equipments, title: "EQUIPO" },
        { ...out_of_stock },
      ];
      return result;
    },
  },
});

export const { setInventory } = inventorySlice.actions;
