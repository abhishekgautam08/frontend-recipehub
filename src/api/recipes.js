import { API_BASE_URL, COOKIE_TOKEN_KEY } from "@/utils/constants";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get(COOKIE_TOKEN_KEY);

export const recipesData = async (cuisine = "", offset = 0) => {
  const url = `${API_BASE_URL}/recipes`;
  const json = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      perPage: 20,
      offset,
      cuisine,
    },
  });
  return json.data;
};
export const particularRecipeData = async (recipeId) => {
  const url = `${API_BASE_URL}/recipes/${recipeId}`;
  const json = await axios.post(url, null, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  return json.data;
};
export const saveRecipeData = async (recepieDetail) => {
  const url = `${API_BASE_URL}/recipes`;
  const json = await axios.post(url, recepieDetail, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  return json;
};
export const getSaveRecipeData = async () => {
  const url = `${API_BASE_URL}/recipes/wishlist`;
  const json = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  return json.data;
};
export const getRemoveRecipeData = async (data) => {
  const url = `${API_BASE_URL}/recipes/${data.recipeId}/remove`;
  const json = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  return json.data;
};
