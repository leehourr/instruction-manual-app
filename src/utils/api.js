import axios from "axios";
import { LoadingStimulate } from "./LoadingStimulate";

// axios.defaults.withCredentials = true;
const getToken = () => {
  const token =
    document.cookie
      .split("; ")
      ?.find((row) => row.startsWith("api_token"))
      ?.split("=")[1] || null;
  // console.log(token);
  return token;
};

export function checkCookieExists(key) {
  if (
    document.cookie.split(";").some((item) => item.trim()?.startsWith(`${key}`))
  ) {
    return true;
  }
  return false;
}
// console.log("check cookie");
// console.log(checkACookieExists("token"));
export const clearAllCookies = () => {
  document.cookie =
    "api_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  // var multiple = res.split(";");
  // for (var i = 0; i < multiple.length; i++) {
  //   var key = multiple[i].split("=");
};

const api = axios.create({
  // baseURL: "http://term-project.ap-northeast-1.elasticbeanstalk.com/api",
  baseURL: "http://127.0.0.1:8000/"
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    // console.log(token);
    if (token !== null) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export const getUser = async () => {
  const hasToken = await checkCookieExists("api_token");
  if (hasToken) {
    const response = await api.get("/user").catch((e) => {
      errorHandler(e);
    });
    return response.data;
  }
  return { role: "" };
};

export const getUserList = async () => {
  const hasToken = await checkCookieExists("api_token");
  if (hasToken) {
    const response = await api.post("/auth/all-users").catch((e) => {
      errorHandler(e);
    });
    return response.data;
  }
  return { role: "" };
};

export const banUser = async (id) => {
  const hasToken = await checkCookieExists("api_token");
  if (hasToken) {
    const response = await api.post("/auth/ban-user", id).catch((e) => {
      errorHandler(e);
    });
    return response.data;
  }
  return null;
};

export const unbanUser = async (id) => {
  const hasToken = await checkCookieExists("api_token");
  if (hasToken) {
    const response = await api.post("/auth/unban-user", id).catch((e) => {
      errorHandler(e);
    });
    return response.data;
  }
  return null;
};

//============= SIGNUP REQUEST ====================
export const signUp = async (credential) => {
  const response = await api.post("/auth/signup", credential).catch((e) => {
    errorHandler(e);
  });
  return response.data;
};

//============= LOGIN REQUEST ====================
export const signIn = async (credential) => {
  // await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
  const response = await api.post("/auth/login", credential);
  return response.data;
};

//============= LOGOUT REQUEST ====================
export const signOut = async () => {
  console.log("token in signout");
  const response = await api.post("/auth/logout").catch((e) => {
    errorHandler(e);
  });
  return response.data;
};

//============= ADD MANUALS REQUEST ====================
export const uploadManual = async (manual) => {
  console.log(manual);
  await LoadingStimulate(1500);
  await api.post("/manuals", manual).catch((e) => {
    errorHandler(e);
  });
};

//============= GET ALL MANUALS REQUEST ====================
export const getManuals = async () => {
  await LoadingStimulate(1000);
  const response = await api.get("/manuals").catch((e) => {
    errorHandler(e);
  });
  return response.data;
};

//============= SEARCH MANUAL ====================
export const searchManual = async (name) => {
  await LoadingStimulate(1500);
  const response = await api.post(`/manuals/${name}`).catch((e) => {
    errorHandler(e);
  });
  return response.data;
};

export const searchAllManual = async (name) => {
  await LoadingStimulate(1500);
  const response = await api.post(`/all-manuals/${name}`).catch((e) => {
    errorHandler(e);
  });
  return response.data;
};

//============= GET YOUR MANUALS REQUEST ====================
export const getYourManuals = async () => {
  await LoadingStimulate(1000);
  // console.log(config);
  const response = await api.post("/your-manuals").catch((e) => {
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
export const getPendingManuals = async (update) => {
  await LoadingStimulate(1500);
  const hasToken = await checkCookieExists("api_token");
  if (hasToken) {
    const response = await api
      .post("/admin/pending-manuals", update)
      .catch((e) => {
        errorHandler(e);
      });
    return response.data;
  }
  return { status: 403 };
};

export function getDataUri(url) {
  return new Promise((resolve) => {
    var image = new Image();
    image.setAttribute("crossOrigin", "anonymous"); //getting images from external domain

    image.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;

      //next three lines for white background in case png has a transparent background
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff"; /// set white fill style
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      canvas.getContext("2d").drawImage(this, 0, 0);

      resolve(canvas.toDataURL("image/jpeg"));
    };

    image.src = url;
  });
}

//
function errorHandler(error) {
  if (error.response) {
    console.log("error from api call");

    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    throw error.response;
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
  console.log(error.config);
}
