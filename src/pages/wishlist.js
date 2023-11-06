import { whoAmI } from "@/api/user";
import NavbarComponent from "@/components/Navbar/Navbar";
import WishlistContainer from "@/containers/Wishlist";
import { COOKIE_TOKEN_KEY } from "@/utils/constants";
import Cookies from "js-cookie";

const Wishlist = ({ name }) => {
  return (
    <>
      <NavbarComponent name={name} />

      <WishlistContainer />
    </>
  );
};

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
export default Wishlist;
