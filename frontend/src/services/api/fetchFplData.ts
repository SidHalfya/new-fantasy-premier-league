// import axios from "axios";
// import { fetchEndPoint } from "./utils";

// export const fetchData = async (endpoint: string, id?: string) => {
//   const url = fetchEndPoint(endpoint, id);
//   console.log("url", url);
//   if (!url) {
//     throw new Error(`Invalid endpoint: ${endpoint}`);
//   }
//   return axios
//     .get(url, {
//       headers: {
//         "Content-Type": "application/json",
//         // "User-Agent": "graphql-fpl",
//       },
//     })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.error("Failed to fetch data:", error);
//     });
// };

export const fetchData = async (params: any, setData: any): Promise<any[]> => {
  const urls = {
    endpoint: `http://127.0.0.1:5000/api/endpoint?endpoint=${params.endpoint}`,
    endpointWithId: `http://127.0.0.1:5000/api/endpoint?endpoint=${params.endpoint}&id=${params.id}`,
  };
  const url = params.id ? urls.endpointWithId : urls.endpoint;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data) {
      console.log("data", data);
      setData(data);
    }
    return [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
