import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  FormControl,
  Grid,
  Input,
  InputAdornment,
} from "@mui/material";
import { recipesData } from "@/api/recipes";
import SpinnerComponent from "@/components/Spinner/Spinner";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Search } from "@mui/icons-material";
import { debounce } from "@/utils/helper";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite"; 

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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px",
            }}
          >
            <FormControl variant="standard">
              {/* <InputLabel htmlFor="input-with-icon-adornment">
                With a start adornment
              </InputLabel> */}
              <Input
                id="search-recepie"
                placeholder="Search Your cuisine "
                startAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                }
                onChange={debounce(handleSearchChange)}
              />
            </FormControl>
          </div>
          <Grid container spacing={2}>
            {recipeResults &&
              recipeResults.length > 0 &&
              recipeResults.map((data) => (
                <Grid item xs={12} sm={6} md={4} key={data.id}>
                  <Card
                    sx={{ maxWidth: 300, height: 350, margin: "30px" }}
                    key={data.id}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={data.image}
                        alt="recipe pic"
                        sx={{objectFit:"contain"}}
                      />
                    </CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div" textAlign="center">
                        {data.title}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ display: "flex", justifyContent: "Center" }}
                    >
                      <Button
                        color="inherit"
                        onClick={() => viewDetails(data)}
                        sx={{ cursor: "pointer" }}
                      >
                      Get Recipe
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
              }}
            >
              No results found
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Cards;
