import axios from 'axios';
import { BASE_URL } from './constant';
import { Data } from './arr';




export const postTodosApi = async (postData: Data) => {
    try {
      debugger
   
      const response = await axios.post(`${BASE_URL}/`, postData ,
      {headers: {
        'Content-Type': 'application/json'
      }});
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };