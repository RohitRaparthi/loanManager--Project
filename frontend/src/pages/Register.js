import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";
import styled from "styled-components";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    isLoading: false,
    isRegistered: false,
  };

  onChange = (field) => (event) => {
    this.setState({ [field]: event.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: "" });

    const { name, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({ error: "Passwords do not match" });
      return;
    }

    this.setState({ isLoading: true });

    try {
      const response = await fetch("https://loanmanager-project.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        this.setState({ isRegistered: true });
      } else {
        const data = await response.json();
        this.setState({ error: data.message || "Registration failed. Please try again." });
      }
    } catch (err) {
      this.setState({ error: "Something went wrong. Please try again." });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { name, email, password, confirmPassword, error, isLoading, isRegistered } = this.state;

    if (isRegistered) {
      return <Navigate to="/login" />;
    }

    return (
      <Container>
        <RegisterBox>
          <Header>
            <h1>CREDIT APP</h1>
            <p>Create a new account</p>
          </Header>

          {error && <ErrorBox>{error}</ErrorBox>}

          <Form onSubmit={this.handleSubmit}>
            <InputGroup>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={this.onChange("name")}
                placeholder="Enter your full name"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={this.onChange("email")}
                placeholder="Enter your email"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={this.onChange("password")}
                placeholder="Enter your password"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={this.onChange("confirmPassword")}
                placeholder="Confirm your password"
                required
              />
            </InputGroup>

            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Sign Up"}
            </SubmitButton>
          </Form>

          <SignUpText>
            Already have an account? <Link to="/login">Sign in</Link>
          </SignUpText>
        </RegisterBox>
      </Container>
    );
  }
}

export default Register;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7fafc;
  padding: 16px;`
;

const RegisterBox = styled.div`
  max-width: 400px;
  width: 100%;
  background-color: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);`
;

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
  h1 {
    font-size: 2rem;
    font-weight: bold;
    color: #2f855a;
  }
  p {
    color: #718096;
    margin-top: 8px;
  }`
;

const ErrorBox = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fbd5d5;
  color: #e53e3e;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const Form = styled.form``;

const InputGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  color: #4a5568;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 8px;`
;

const Input = styled.input`
  width: 94%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #38a169;
    box-shadow: 0 0 0 2px rgba(56, 161, 105, 0.5);
  }`
;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #2f855a;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
  &:hover:enabled {
    background-color: #276749;
  }`
;

const SignUpText = styled.p`
  text-align: center;
  color: #4a5568;
  margin-top: 24px;
  a {
    color: #2f855a;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }`
;