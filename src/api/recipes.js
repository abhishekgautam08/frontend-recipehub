import { API_BASE_URL } from "@/utils/constants";
import axios from "axios";

export const recipesData = async () => {
  const url = `${API_BASE_URL}/recipes`;
  const json = await axios.get(url);
  return json.data;
};
export const particularRecipeData = async (recipeId) => {
  const url = `${API_BASE_URL}/recipes/${recipeId}`;
  const json = await axios.post(url);
  return json.data;
};
