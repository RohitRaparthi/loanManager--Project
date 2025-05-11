import React, { Component } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import styled from 'styled-components'

class Login extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
    showError: false,
    errorMsg: '',
  }

  onChangeEmail = event => this.setState({ email: event.target.value })
  onChangePassword = event => this.setState({ password: event.target.value })

  onSubmitSuccess = token => {
    const navigate = useNavigate()
    const { email } = this.state

    Cookies.set('jwt_token', token, { expires: 7 })

    if (email.includes('admin')) {
      navigate('/admin/dashboard')
    } else if (email.includes('verifier')) {
      navigate('/verifier/dashboard')
    } else {
      navigate('/user/dashboard')
    }
  }

  onSubmitFailure = errorMsg => {
    this.setState({ showError: true, errorMsg })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    this.setState({ isLoading: true, showError: false })

    const { email, password } = this.state
    const userDetails = { email, password }

    try {
      const response = await fetch('https://loanmanager-project.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      })

      const data = await response.json()

      if (response.ok) {
        this.onSubmitSuccess(data.token)
      } else {
        this.onSubmitFailure(data.error || 'Invalid email or password')
      }
    } catch (err) {
      this.onSubmitFailure('Something went wrong. Please try again.')
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { email, password, isLoading, showError, errorMsg } = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Navigate to="/" />
    }

    return (
      <Container>
        <LoginBox>
          <Header>
            <h1>CREDIT APP</h1>
            <p>Sign in to your account</p>
          </Header>

          {showError && <ErrorBox>{errorMsg}</ErrorBox>}

          <Form onSubmit={this.onSubmitForm}>
            <InputGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={this.onChangeEmail}
                placeholder="Enter your email"
                required
              />
              <HelperText>
                Try admin@example.com, verifier@example.com, or user@example.com
              </HelperText>
            </InputGroup>

            <InputGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={this.onChangePassword}
                placeholder="Enter your password"
                required
              />
              <HelperText>Demo Passwords are password123</HelperText>
            </InputGroup>

            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </SubmitButton>
          </Form>

          <SignUpText>
            Don't have an account? <a href="/register">Sign up</a>
          </SignUpText>
        </LoginBox>
      </Container>
    )
  }
}

export default Login

// Styled Components

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7fafc;
  padding: 16px;
`;

const LoginBox = styled.div`
  max-width: 400px;
  width: 100%;
  background-color: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

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
  }
`;

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
  margin-bottom: 8px;
`;

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
  }
`;

const HelperText = styled.p`
  font-size: 0.75rem;
  color: #a0aec0;
  margin-top: 4px;
`;

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
  }
`;

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
  }
`;
