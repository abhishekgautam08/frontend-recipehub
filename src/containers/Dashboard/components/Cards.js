import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  FormControl,
  Input,
  InputAdornment,
} from "@mui/material";
import { recipesData } from "@/api/recipes";
import SpinnerComponent from "@/components/Spinner/Spinner";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Search } from "@mui/icons-material";
import { debounce } from "@/utils/helper";

const Cards = () => {
  const router = useRouter();

  const [cuisine, setCuisine] = useState("");
  const [recipeResults, setRecipeResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(cuisine);
  }, [cuisine]);

  const fetchData = async (cuisine) => {
    const response = await recipesData(cuisine);
    setRecipeResults(response);
    setIsLoading(false);
  };

  const viewDetails = (data) => {
    router.push(`/${data.id}`);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setCuisine(value);
  };

  return (
    <>
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <>
          <div>
            <FormControl variant="standard">
              {/* <InputLabel htmlFor="input-with-icon-adornment">
                With a start adornment
              </InputLabel> */}
              <Input
                id="search-recepie"
                startAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                }
                onChange={debounce(handleSearchChange)}
              />
            </FormControl>
          </div>
          {recipeResults &&
            recipeResults.length > 0 &&
            recipeResults.map((data) => (
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

          {recipeResults && recipeResults.length == 0 && (
            <div>No results found</div>
          )}
        </>
      )}
    </>
  );
};

export default Cards;
