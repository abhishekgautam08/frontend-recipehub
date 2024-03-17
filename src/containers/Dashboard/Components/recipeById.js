import { particularRecipeData, saveRecipeData } from "@/api/recipes";
import NavbarComponent from "@/components/Navbar/Navbar";
import SpinnerComponent from "@/components/Spinner/Spinner";
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
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CircleIcon from "@mui/icons-material/Circle";
import { FaHeart, FaLink } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

const RecipeById = ({ name }) => {
  const router = useRouter();
  const recepieId = router.query.recepieId;
  const [recepieDetail, setRecepieDetail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await fetchRecepieDetails(recepieId);
    })();
  }, [recepieId]);

  async function fetchRecepieDetails(recepieId) {
    const result = await particularRecipeData(recepieId);
    console.log({ result });
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
        toast("Recipe is already in the wishlist.", { type: "warning" });
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
          <Typography
            variant="h5"
            component="div"
            textAlign="center"
            fontWeight="bold"
          >
            {recepieDetail.title}
          </Typography>

          <CardMedia
            component="img"
            height="300"
            image={recepieDetail.image}
            alt="recipe pic"
            sx={{ objectFit: "contain", margin: "10px" }}
          />
          <CardContent>
            <Typography variant="subtitle1" component="div" textAlign="center">
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Preparation Time- &nbsp;
              </span>
              Ready in &nbsp;
              {recepieDetail.readyInMinutes} minutes
            </Typography>
            <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                  <Typography
                    sx={{ mt: 5, mb: 2 }}
                    variant="h4"
                    component="div"
                    textAlign="left"
                  >
                    Ingredients
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
              <div
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                Summary
              </div>
              <span
                dangerouslySetInnerHTML={{ __html: recepieDetail.summary }}
              />
            </Typography>
            {/* <Typography
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
            </Typography> */}
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              href={recepieDetail.sourceUrl}
              target="_blank"
              sx={{ cursor: "pointer", color: "black" }}
            >
              <FaLink size="20px" />
            </Button>
            <Button
              color="inherit"
              onClick={() => saveDetails(recepieDetail)}
              sx={{ cursor: "pointer" ,border:"3px solid" }}
            >
              Add to Saved recipe
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default RecipeById;
