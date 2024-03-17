import React from "react";
import AuthPage from "../containers/Auth";
import { whoAmI } from "../api/user";
import { COOKIE_TOKEN_KEY } from "../utils/constants";
import Cookies from "js-cookie";

const Auth = () => {
  return (
    <>
      <AuthPage />
    </>
  );
};

export default Auth;

export async function getServerSideProps(context) {
  const authToken = context.req.cookies[COOKIE_TOKEN_KEY];

  if (!authToken) {
    return {
      props: {},
    };
  }

  const myDetails = await whoAmI(authToken);

  if (!myDetails) {
    Cookies.remove(COOKIE_TOKEN_KEY);
    return {
      props: {},
    };
  }

  return {
    redirect: {
      // permanent: true,
      destination: "/",
    },
    props: {
      user: myDetails.user,
    }, // will be passed to the page component as props
  };
}
