import Head from "next/head";
import { whoAmI } from "@/api/user";
import Cookies from "js-cookie";
import { COOKIE_TOKEN_KEY } from "@/utils/constants";
import Dashboard from "@/containers/Dashboard";

export default function Home({name}) {
  return (
    <>
      <main>
        <Dashboard name={name} />
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const authToken = context.req.cookies[COOKIE_TOKEN_KEY];

  if (!authToken) {
    return {
      redirect: {
        // permanent: true,
        destination: "/auth",
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
        destination: "/auth",
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
