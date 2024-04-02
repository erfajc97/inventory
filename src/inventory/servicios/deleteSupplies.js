import axios from "axios";

const deleteSupplies = async (URL_DEV, id) => {
  try {
    const response = await axios.delete(`${URL_DEV}/supplies/${id}`);
    return {
      success: true,
      ...response,
    };
  } catch (errorResponse) {
    return {
      success: false,
      ...errorResponse.response,
    };
  }
};

export default deleteSupplies;
