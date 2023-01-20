import axios from "axios";
import { LoadingStimulate } from "./LoadingStimulate";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const getManuals = async () => {
  await LoadingStimulate(2500);
  const response = await api.get("/manuals").catch((e) => {
    errorHandler(e);
  });
  return response.data;
};

function errorHandler(error) {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    throw new Response(error.response.data);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
  console.log(error.config);
}
