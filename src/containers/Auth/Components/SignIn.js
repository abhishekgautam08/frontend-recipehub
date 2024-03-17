import React, { useState } from "react";

import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Alert,
  Stack,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import { loginUser } from "@/api/user";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { COOKIE_TOKEN_KEY } from "@/utils/constants";
import { useRouter } from "next/router";

// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function SignIn() {
    const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState();

  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    if (!credentials.email || !isEmail(credentials.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (
      !credentials.password ||
      credentials.password.length < 5 ||
      credentials.password.length > 20
    ) {
      setError(
        "Password is required and must be between 5 and 20 characters long."
      );
      return false;
    }

    return true;
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setError(null);
    const userDetails = await loginUser(credentials);
    const token = userDetails?.token;

    if (!userDetails) {
      return toast("Invalid Details", { type: "error" });
    }

    Cookies.set(COOKIE_TOKEN_KEY, token);

    await router.replace("/");
    setSuccess("Form Submitted Successfully");
  };

  return (
    <div>
      <Stack spacing={2}>
        <div>
          <TextField
            label="Email Address"
            fullWidth
            error={error}
            id="standard-basic"
            variant="standard"
            sx={{ width: "100%" }}
            value={credentials.email}
            InputProps={{}}
            size="small"
            onChange={onChange}
            name="email"
          />
        </div>
        <div>
          <FormControl sx={{ width: "100%" }} variant="standard">
            <InputLabel error={error} htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              error={error}
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={onChange}
              name="password"
              value={credentials.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <div>
          <Button
            variant="contained"
            fullWidth
            startIcon={<LoginIcon />}
            onClick={handleSubmit}
            sx={{bgcolor:"black"}}
          >
            LOGIN
          </Button>
        </div>
      </Stack>
      {/* Show Form Error if any */}
      {error && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="error" size="small">
            {error}
          </Alert>
        </Stack>
      )}

      {/* Show Success if no issues */}
      {success && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="success" size="small">
            {success}
          </Alert>
        </Stack>
      )}
    </div>
  );
}
