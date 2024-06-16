import axios from "axios";
import { url } from "../../Const";

export function loginUser(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${url}/login`, data);
      const responseData = response.data;
      resolve(responseData);
    } catch (error) {
      if (error.response) {
        reject(error?.response?.data);
      } else {
        reject(error);
      }
    }
  });
}

export function registerUser(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${url}/register`, data);
      const responseData = response.data;
      resolve(responseData);
    } catch (error) {
      if (error.response) {
        reject(error?.response?.data);
      } else {
        reject(error);
      }
    }
  });
}
