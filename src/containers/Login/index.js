import { useState } from "react";
import { useRouter } from "next/router";
import { COOKIE_TOKEN_KEY } from "@/utils/constants";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { loginUser } from "@/api/user";
import SpinnerComponent from "@/components/Spinner/Spinner";

function LoginContainer() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    const userDetails = await loginUser(
      credentials
    );
    const token = userDetails?.token;

    if (!userDetails) {
      setIsSubmitting(false);
      return toast("Invalid Details", { type: "error" });
    }

    Cookies.set(COOKIE_TOKEN_KEY, token);

    await router.replace("/");
    toast("User Logged In", { type: "success" });
    setIsSubmitting(false);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      {isSubmitting ? (
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
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={credentials.email}
                onChange={onChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={onChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>

              <Typography variant="body2" color="text.secondary" align="center">
                <br />
                <br />
                Note:- The backend is deployed on a free server, so it takes
                some time to load the First request
              </Typography>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}
export default LoginContainer;
