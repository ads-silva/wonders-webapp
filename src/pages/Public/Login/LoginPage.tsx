import { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiAuth } from "../../../api/userApi";
import { useAuth } from "../../../context/AuthProvider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
