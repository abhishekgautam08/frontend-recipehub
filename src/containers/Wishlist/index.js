import { getRemoveRecipeData, getSaveRecipeData } from "@/api/recipes";
import NavbarComponent from "@/components/Navbar/Navbar";
import SpinnerComponent from "@/components/Spinner/Spinner";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const WishlistContainer = ({ name }) => {
  const [recipeResults, setRecipeResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await getSaveRecipeData();
    setRecipeResults(response);
    setIsLoading(false);
  };

  const viewDetails = (data) => {
    router.push(`/${data.recipeId}`);
  };

  const removeDetails = async (data) => {
    await getRemoveRecipeData(data);
    router.reload();
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
        <>
          <Grid container spacing={2}>
            {recipeResults &&
              recipeResults.length > 0 &&
              recipeResults.map((data) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={data.id}>
                  <Card
                    sx={{ maxWidth: 300, height: 350, margin: "30px" }}
                    // key={data.id}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={data.imageUrl}
                        alt="recipe pic"
                        sx={{ objectFit: "contain" }}
                      />
                    </CardActionArea>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        textAlign="center"
                      >
                        {data.title}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ display: "flex", justifyContent: "Center" }}
                    >
                      <Button
                        color="inherit"
                        onClick={() => viewDetails(data)}
                        sx={{ cursor: "pointer", border: "3px solid" }}
                      >
                        Get Recipe
                      </Button>
                      <Button
                        color="inherit"
                        onClick={() => removeDetails(data)}
                        sx={{ cursor: "pointer", border: "3px solid" }}
                      >
                        Remove Recipe
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>

          {recipeResults && recipeResults.length == 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "40px",
                fontWeight: "bold",
                alignItems: "center",
                width: "100vw",
                height: "calc(100vh - 70px)",
              }}
            >
              No Recipe
            </div>
          )}
        </>
      )}
    </>
  );
};

export default WishlistContainer;
