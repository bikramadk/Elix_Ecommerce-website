import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const TextButton = styled.div`
  width: 100%;
  text-align: end;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  font-weight: 500;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const SignIn = ({ setOpenAuth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      dispatch(
        openSnackbar({
          message: "Please fill in all fields",
          severity: "error",
        })
      );
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      dispatch(
        openSnackbar({
          message: "Please enter a valid email address",
          severity: "error",
        })
      );
      return false;
    }
    
    return true;
  };

  const handleSignIn = async () => {
    if (!validateInputs()) {
      return;
    }

    setButtonLoading(true);
    setButtonDisabled(true);

    try {
      const res = await UserSignIn({ email, password });
      
      // Store token in localStorage if provided
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      
      dispatch(loginSuccess(res.data));
      dispatch(
        openSnackbar({
          message: "Login Successful",
          severity: "success",
        })
      );
      
      // Close the auth modal
      if (setOpenAuth) {
        setOpenAuth(false);
      }
      
      // Redirect to home page
      navigate("/");
      
    } catch (err) {
      console.error("Sign in error:", err);
      
      let errorMessage = "An error occurred during sign in";
      
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      dispatch(
        openSnackbar({
          message: errorMessage,
          severity: "error",
        })
      );
    } finally {
      setButtonLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Welcome to Elix 👋</Title>
        <Span>Please login with your details here</Span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />
        <TextButton>Forgot Password?</TextButton>
        <Button
          text="Sign In"
          onClick={handleSignIn}
          isLoading={buttonLoading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default SignIn;