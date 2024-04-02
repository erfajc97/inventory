import axios from "axios";
const deleteCategory = async (URL_DEV, id) => {
  try {
    const response = await axios.delete(`${URL_DEV}/subcategory/${id}`);
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
export default deleteCategory;
