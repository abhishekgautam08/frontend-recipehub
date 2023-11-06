import { particularRecipeData, saveRecipeData } from "@/api/recipes";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import NavbarComponent from "@/components/Navbar/Navbar";
import SpinnerComponent from "@/components/Spinner/Spinner";
import { toast } from "react-toastify";
import { COOKIE_TOKEN_KEY } from "@/utils/constants";
import { whoAmI } from "@/api/user";
import Cookies from "js-cookie";

export default function RecepieDetails({ name }) {
  const [recepieDetail, setRecepieDetail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const recepieId = router.query.recepieId;

  useEffect(() => {
    (async () => {
      await fetchRecepieDetails(recepieId);
    })();
  }, [recepieId]);

  async function fetchRecepieDetails(recepieId) {
    const result = await particularRecipeData(recepieId);

    setRecepieDetail(result);
    setIsLoading(false);
  }

  const saveDetails = async (recepieDetail) => {
    try {
      const response = await saveRecipeData(recepieDetail);
      if (response.status === 200) {
        toast("Recipe saved in wishlist", { type: "success" });
      }
    } catch (error) {
      console.error("Error:", error);
      if (error && error.response && error.response.status == 409) {
        toast("Recipe is already in the wishlist.", { type: "success" });
      }
    }
  };

  return (
    <>
      <NavbarComponent name={name} />
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "calc(100vh - 70px)",
          }}
        >
          <SpinnerComponent />
        </div>
      ) : (
        <Card sx={{ margin: "30px", padding: "20px" }} key={recepieDetail.id}>
          {/* <CardActionArea> */}
          <CardMedia
            component="img"
            height="300"
            image={recepieDetail.image}
            alt="recipe pic"
            sx={{ objectFit: "contain", margin: "10px" }}
          />
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              textAlign="center"
              fontWeight="bold"
            >
              {recepieDetail.title}
            </Typography>
            <Typography variant="subtitle1" component="div" textAlign="center">
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Preparation Time- &nbsp; &nbsp;
              </span>
              {recepieDetail.readyInMinutes} min
            </Typography>
            <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12} sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{ mt: 5, mb: 2 }}
                    variant="h4"
                    component="div"
                  >
                    Ingredients Name & Amount(unit)
                  </Typography>

                  {recepieDetail.extendedIngredients.map((ingredients) => (
                    <List key={ingredients.id}>
                      <ListItem>
                        <ListItemIcon>
                          {" "}
                          <CircleIcon fontSize="10px" />{" "}
                        </ListItemIcon>
                        <ListItemText style={{ textAlign: "left" }}>
                          {ingredients.amount} &nbsp;
                          {ingredients.unit} &nbsp;-&nbsp; {ingredients.name}
                        </ListItemText>
                      </ListItem>
                    </List>
                  ))}
                </Grid>
              </Grid>
            </Box>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              textAlign="center"
            >
              <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                Summary-&nbsp; &nbsp;
              </span>
              <span
                dangerouslySetInnerHTML={{ __html: recepieDetail.summary }}
              />
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              textAlign="center"
              margin={5}
            >
              <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                Instructions-&nbsp; &nbsp;
              </span>

              <span
                dangerouslySetInnerHTML={{ __html: recepieDetail.instructions }}
              />
            </Typography>
          </CardContent>
          {/* </CardActionArea> */}
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="small"
              color="primary"
              href={recepieDetail.sourceUrl}
              target="_blank"
            >
              Source URL
            </Button>
            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              color="inherit"
              onClick={() => saveDetails(recepieDetail)}
              sx={{ cursor: "pointer" }}
            >
              Add to Saved recipe
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
}

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
