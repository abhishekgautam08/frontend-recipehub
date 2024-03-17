import { API_BASE_URL, COOKIE_TOKEN_KEY } from "@/utils/constants";
import axios from "axios";
import Cookies from "js-cookie";


export const loginUser = async (credentials) => {
  try {
    const result = await axios.post(
      `${API_BASE_URL}/users/login`,
      credentials,
      
    );
    return result.data;
  } catch (err) {
    console.error("Error while loggin in: Stacktrace: ", err);
  }
};

export const SignUpUser = async (credentials) => {
  
  try {
    const result = await axios.post(
      `${API_BASE_URL}/users/signup`,
      credentials
    );
    return result.data;
  } catch (err) {
    console.error("Error while SignUp in: Stacktrace: ", err);
  }
};

export const whoAmI = async (authToken) => {
  try {
    const result = await fetch(`${API_BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await result.json();

    if (result.status < 200 || result.status > 399) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

export const logoutUser = () => {
  Cookies.remove(COOKIE_TOKEN_KEY);
};
