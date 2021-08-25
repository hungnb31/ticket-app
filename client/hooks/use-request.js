import axios from "axios";

export const useRequest = async (url, method, body, onSuccess) => {
  let response = null;
  let errors = null;
  try {
    const res = await axios[method](url, body);
    response = res.data;
    onSuccess();
  } catch (error) {
    errors = error.response.data.errors;
  }

  return { response, errors };
};
