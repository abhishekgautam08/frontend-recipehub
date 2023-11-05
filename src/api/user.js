import { API_API_BASE_URL, COOKIE_TOKEN_KEY } from "../utils/constants";
import Cookies from "js-cookie";

export const loginUser = async (credentials) => {
  let data;
  try {
    const result = await axios.post(
      `${API_API_BASE_URL}/users/login`,
      credentials
    );
    data = result.data;
  } catch (err) {
    console.error("Error while loggin in: Stacktrace: ", err);
  }
  return data;
};


export const SignUpUser = async (credentials) => {
  let data;
  try {
    const result = await axios.post(
      `${API_API_BASE_URL}/users/signup`,
      credentials
    );
    data = result.data;
  } catch (err) {
    console.error("Error while SignUp in: Stacktrace: ", err);
  }
  return data;
};

export const logoutUser = () => {
  Cookies.remove(COOKIE_TOKEN_KEY);
};
