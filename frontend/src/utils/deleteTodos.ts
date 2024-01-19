import axios from "axios";
import { BASE_URL } from "./constant";



export const deleteTodosApi = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
