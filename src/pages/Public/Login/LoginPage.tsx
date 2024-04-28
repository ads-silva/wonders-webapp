import { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiAuth } from "../../../api/userApi";
import { useAuth } from "../../../context/AuthProvider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, Container, TextField, Typography } from "@mui/material";

interface LoginFormState {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { signin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [formState, setFormState] = useState<LoginFormState>({
    email: "requester@mail.com",
    password: "123",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Add your login logic here
    apiAuth(formState)
      .then((response) => {
        const { user, authToken } = response.data;
        signin(user, authToken);
        navigate(from, { replace: true });
      })
      .catch((error: AxiosError) => {
        if (error.status === 401) {
          toast("Invalid username or password. Please try again.", {
            type: "error",
          });
        } else {
          toast("'An unexpected error occurred. Please try again later.'", {
            type: "error",
          });
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: 200 }}>
      <div>
        <Typography component="h1" variant="h5">
          Wonders Web App
        </Typography>
        <form className="" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formState.email}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formState.password}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className=""
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
