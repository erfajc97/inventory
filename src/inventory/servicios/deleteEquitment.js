import axios from "axios";

const deleteEquitment = async (URL_DEV, id) => {
  try {
    const response = await axios.delete(`${URL_DEV}/equipments/${id}`);
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

export default deleteEquitment;
