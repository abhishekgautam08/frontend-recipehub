import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { recipesData } from "@/api/recipes";
import SpinnerComponent from "@/components/Spinner/Spinner";
import { useEffect, useState } from "react";

const Cards = () => {
  const [recipeResults, setRecipeResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await recipesData();
    setRecipeResults(response);
    setIsLoading(false);
  };

  const viewDetails = (data) => {

  };

  return (
    <>
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <>
          {recipeResults.map((data) => (
            <Card sx={{ maxWidth: 345, margin: "30px" }} key={data.id}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={data.image}
                  alt="recipe pic"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {data.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => viewDetails(data)}
                >
                  View Details
                </Button>
                <Button size="small" color="primary">
                  Add to Saved recipe
                </Button>
              </CardActions>
            </Card>
          ))}
        </>
      )}
    </>
  );
};

export default Cards;
