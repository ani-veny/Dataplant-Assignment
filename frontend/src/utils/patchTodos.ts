import axios from "axios";
import { BASE_URL } from "./constant";
import { Data } from "./arr";


export const patchTodosApi = async (postData: Data, id: string) => {
  try {
    debugger
    const response = await axios.patch(`${BASE_URL}/${id}`, { data: postData });
    console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
};
