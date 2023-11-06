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
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Cards = () => {
  const router = useRouter();

  const [cuisine, setCuisine] = useState("");
  const [recipeResults, setRecipeResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const resultsPerPage = 20;

  useEffect(() => {
    fetchData(cuisine, (currentPage - 1) * resultsPerPage);
  }, [cuisine, currentPage]);

  const fetchData = async (cuisine, offset) => {
    setIsLoading(true);
    const response = await recipesData(cuisine, offset);
    setRecipeResults(response);
    setIsLoading(false);
  };

  const viewDetails = (data) => {
    router.push(`/${data.id}`);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setCuisine(value);
    setCurrentPage(1);
  };

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  };

  return (
    <>
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
                placeholder="Search Your Cuisine"
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
                        sx={{ cursor: "pointer" }}
                      >
                        Get Recipe
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}

            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Stack spacing={2}>
                <Pagination
                  count={5}
                  page={currentPage}
                  color="primary"
                  onChange={handlePageChange}
                />
              </Stack>
            </div>
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
              No results found
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Cards;
