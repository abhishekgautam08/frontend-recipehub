// Material UI imports
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import Paper from "@mui/material/Paper";
import LockIcon from "@mui/icons-material/Lock";

import Switch from "@mui/material/Switch";
import { useState } from "react";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";

function App() {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div
      style={{
        margin: "0 auto",
        paddingTop: "100px",
        width: "350px",
      }}
    >
      <Paper elevation={3} style={{ padding: "10px", paddingBottom: "50px" }}>
        <div align="center">
          {checked ? (
            <Chip
              icon={<LockIcon />}
              label="Log In"
              variant="outlined"
              color="info"
              sx={{ bgcolor: "black", color: "white" }}
            />
          ) : (
            <Chip
              icon={<FaceIcon />}
              label="Sign Up"
              variant="outlined"
              color="info"
              sx={{ bgcolor: "black", color: "white" }}
            />
          )}
          <br />

          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
           color="default"
          />
        </div>

        {checked ? <SignIn /> : <SignUp />}
      </Paper>
    </div>
  );
}

export default App;
