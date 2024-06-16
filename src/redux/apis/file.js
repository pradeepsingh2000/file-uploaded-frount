import axios from "axios";
import { url } from "../../Const";

export function viewFile(page, limit) {
  return new Promise(async (resolve, reject) => {
    try {
      let token = localStorage.getItem("token");
      const response = await axios.get(
        `${url}/file?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const responseData = response.data;
      resolve(responseData);
    } catch (error) {
      if (error.response) {
        reject(error.response.data);
      } else {
        reject(error);
      }
    }
  });
}

export function EditFile(id, data) {
  return new Promise(async (resolve, reject) => {
    try {
      let token = localStorage.getItem("token");
      const response = await axios.put(`${url}/file/${id}`, data, {
        headers: {
          Authorization: token,
        },
      });
      const responseData = response.data;
      resolve(responseData);
    } catch (error) {
      if (error.response) {
        reject(error.response.data);
      } else {
        reject(error);
      }
    }
  });
}

export function addFile(data) {
  return new Promise(async (resolve, reject) => {
    try {
      let token = localStorage.getItem("token");
      const response = await axios.post(`${url}/file`, data, {
        headers: {
          Authorization: token,
        },
      });
      const responseData = response.data;
      resolve(responseData);
    } catch (error) {
      if (error.response) {
        reject(error.response.data);
      } else {
        reject(error);
      }
    }
  });
}

export function deleteFile(data) {
  return new Promise(async (resolve, reject) => {
    try {
      let token = localStorage.getItem("token");
      const response = await axios.post(`${url}/filedelete`, data, {
        headers: {
          Authorization: token,
        },
      });
      const responseData = response.data;
      resolve(responseData);
    } catch (error) {
      if (error.response) {
        reject(error.response.data);
      } else {
        reject(error);
      }
    }
  });
}
