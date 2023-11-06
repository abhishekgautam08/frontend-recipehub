import Head from "next/head";
import { Inter } from "next/font/google";
import Dashboard from "@/containers/Dashboard";
import NavbarComponent from "@/components/Navbar/Navbar";
import { COOKIE_TOKEN_KEY } from "@/utils/constants";
import Cookies from "js-cookie";
import { whoAmI } from "@/api/user";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ name }) {
  return (
    <>
      <Head>
        <title>RecipeHub</title>
        <meta name="description" content="RecipeHub" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavbarComponent name={name} />
        <Dashboard />
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const authToken = context.req.cookies[COOKIE_TOKEN_KEY];
  console.debug({ authToken });

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
  console.debug({ myDetails });
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
