import axios from "axios";
import { setInventory } from "./inventorySlice";
import { getAllInventoryCategories } from "./inventoryCategorySlice";
import verifyResponse from "../../src/helpers/verifyResponse";
import { toast } from 'react-toastify';
import deleteCategory from "../../src/inventory/servicios/deleteCategory";
import deleteEquitment from './../../src/inventory/servicios/deleteEquitment';
import deleteSupplies from './../../src/inventory/servicios/deleteSupplies';

const URL_DEV = "https://topiadev.topiaapp.com/api/inventory";

//THUNKS DE INVENTARIOS
export const setInventoryThunk = (query = "", type) => async (dispatch, ) => {
  try {
    const response = await axios.get(
      `${URL_DEV}/?query=${query}&limit=50&skip=0&type=${type}&company_id=${1}`
    );
    return dispatch(setInventory(response.data));
  } catch (error) {
    console.log(error);
  }
};

//THUNKS DE CATEGORIAS
export const getAllCategoriesThunk = () => async (dispatch, ) => {
  return axios
    .get(`${URL_DEV}/subcategory?company_id=${1}`)
    .then((res) => dispatch(getAllInventoryCategories(res.data)));
};

export const addNewCategory = (data) => async (dispatch, ) => {
  try {
    const newData = { ...data, company_id: 1 };
    const response = await axios.post(`${URL_DEV}/subcategory`, newData);

    dispatch(getAllCategoriesThunk());
    verifyResponse(
      response.data,
      response.status,
      "Categoría agregada con éxito"
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const response = await error.response;
    verifyResponse(
      response.data,
      response.status,
      "Error al agregar la categoría"
    );

    return {
      success: false,
      data: response.data,
    };
  }
};

export const editCategoryThunk = (id, data) => async (dispatch) => {
  try {
    const response = await axios.put(`${URL_DEV}/subcategory/${id}`, data);
    dispatch(getAllCategoriesThunk());
    verifyResponse(
      response.data,
      response.status,
      "Categoria editado con éxito"
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const response = await error.response;
    toast.error("Error al editar categoria");

    return {
      success: false,
      data: response.data,
    };
  }
};

export const deleteCategoryThunk = (id) => async (dispatch) => {
  const { data, status, success } = await deleteCategory(URL_DEV, id);
  dispatch(getAllCategoriesThunk(data));
  return { data, success, status };
};

//THUNKS DE EQUIPOS
export const addNewEquipmentsThunk = (data) => async (dispatch, ) => {
  try {
    
    const newData = { ...data, company_id: 1 };
    const response = await axios.post(`${URL_DEV}/equipments`, newData);

    dispatch(setInventoryThunk());
    verifyResponse(response.data, response.status, "Equipo agregado con éxito");

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const response = await error.response;
    toast.error("Error al agregar el equipo");

    return {
      success: false,
      data: response.data,
    };
  }
};

export const deleteEquipmentsThunk = (id) => async (dispatch) => {
  const { data, status, success } = await deleteEquitment(URL_DEV, id);
  dispatch(setInventoryThunk(data));
  verifyResponse(data, status, "Equipo eliminado con éxito");
  return { data, success, status };
};

export const editEquipmentsThunk = (id, data) => async (dispatch) => {
  try {
    const response = await axios.put(`${URL_DEV}/equipments/${id}`, data);
    dispatch(setInventoryThunk());
    verifyResponse(response.data, response.status, "Equipo editado con éxito");

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const response = await error.response;
    toast.error("Error al editadar el equipo");

    return {
      success: false,
      data: response.data,
    };
  }
};

//THUNKS DE INSUMOS

export const addNewSuppliesThunk = (data) => async (dispatch, ) => {
  try {
    const newData = { ...data, company_id: 1 };
    const response = await axios.post(`${URL_DEV}/supplies`, newData);
    dispatch(setInventoryThunk());
    verifyResponse(
      response.data,
      response.status,
      "Suplemento agregado con éxito"
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const response = await error.response;
    toast.error("Error al agregar suplemento");

    return {
      success: false,
      data: response.data,
    };
  }
};

export const deleteSuppliesThunk = (id) => async (dispatch) => {
  const { data, status, success } = await deleteSupplies(URL_DEV, id);
  dispatch(setInventoryThunk(data));
  verifyResponse(data, status, "Suplemento eliminado con éxitoo");
  return { data, success, status };
};

export const editSuppliesThunk = (id, data) => async (dispatch) => {
  try {
    const response = await axios.put(`${URL_DEV}/supplies/${id}`, data);
    dispatch(setInventoryThunk());
    verifyResponse(
      response.data,
      response.status,
      "Suplemento editado con éxito"
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const response = await error.response;
    console.error("Error al editar suplemento:", error);
    toast.error("Error al editar suplemento");

    return {
      success: false,
      data: response.data,
    };
  }
};
