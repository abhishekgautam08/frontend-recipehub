import React from "react";
import RecipeById from "@/containers/Dashboard/Components/recipeById";
import { whoAmI } from "@/api/user";
import Cookies from "js-cookie";
import { COOKIE_TOKEN_KEY } from "@/utils/constants";

const RecepieDetails = ({name}) => {
  return (
    <>
      <RecipeById name={name} />
    </>
  );
};

export default RecepieDetails;

export async function getServerSideProps(context) {
  const authToken = context.req.cookies[COOKIE_TOKEN_KEY];

  if (!authToken) {
    return {
      redirect: {
        // permanent: true,
        destination: "/login",
      },
      props: {},
    };
  }

  const myDetails = await whoAmI(authToken);

  if (!myDetails) {
    Cookies.remove(COOKIE_TOKEN_KEY);
    return {
      redirect: {
        // permanent: true,
        destination: "/login",
      },
      props: {},
    };
  }

  return {
    props: {
      name: myDetails.user.name,
    },
  };
}
