import LoginContainer from "@/containers/Login";
// import { COOKIE_TOKEN_KEY } from "@/utils/constantss";
import React from "react";

const Login = () => {
  return (
    <>
      <LoginContainer />
    </>
  );
};

// export async function getServerSideProps(context) {
//   const authToken = context.req.cookies[COOKIE_TOKEN_KEY];

//   if (!authToken) {
//     return {
//       props: {},
//     };
//   }

//   return {
//     redirect: {
//       permanent: true,
//       destination: "/",
//     },
//     props: {}, // will be passed to the page component as props
//   };
// }

export default Login;
