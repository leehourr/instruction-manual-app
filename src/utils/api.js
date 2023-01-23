import axios from "axios";
import { LoadingStimulate } from "./LoadingStimulate";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

//============= LOGIN REQUEST ====================
export const signUp = async () => {
  const response = await api.get("/auth/logout").catch((e) => {
    errorHandler(e);
  });
  return response.data;
};

//============= LOGIN REQUEST ====================
export const signIn = async (credential) => {
  await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
  const response = await api.post("/auth/login", credential).catch((e) => {
    errorHandler(e);
  });

  const user = api.post("/your-manuals", { user_id: 2 });
  console.log(user);
  return response.data;
};

//============= LOGOUT REQUEST ====================
export const signOut = async () => {
  const response = await api.get("/auth/logout").catch((e) => {
    errorHandler(e);
  });
  return response.data;
};

//============= GET ALL MANUALS REQUEST ====================
export const getManuals = async () => {
  await LoadingStimulate(1500);
  const response = await api.get("/manuals").catch((e) => {
    errorHandler(e);
  });
  return response.data;
};

//============= SEARCH MANUAL ====================
export const searchManual = async (name) => {
  await LoadingStimulate(1500);
  const response = await api.get(`/manuals/${name}`).catch((e) => {
    errorHandler(e);
  });
  return response.data;
};

//============= GET YOUR MANUALS REQUEST ====================
export const getYourManuals = async () => {
  await LoadingStimulate(1500);
  const response = await api.get("/your-manuals").catch((e) => {
    errorHandler(e);
  });
  return response.data;
};

//============= GET COMPLAINTS FROM USERS ====================
export const getComplaints = async () => {
  await LoadingStimulate(1500);
  const response = await api.get("/complaints").catch((e) => {
    errorHandler(e);
  });
  return response.data;
};

//============= GET PENDING MANUALS ====================
export const getPendingManuals = async () => {
  await LoadingStimulate(1500);
  const response = await api.get("/admin/pending-manuals").catch((e) => {
    errorHandler(e);
  });
  return response.data;
};

//
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
