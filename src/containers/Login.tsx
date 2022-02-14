import React, { FormEvent, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { signupAsync, loginAsync } from "@/store/actions/login";
import {
  selectIsLoginPending,
  selectIsLoginRejected,
  selectLoginErrorMsg,
} from "@/store/selectors/login";
import { selectIsLoggedIn } from "@/store/selectors/user";
import { selectIsRestoreAuthPending } from "@/store/selectors/restore-auth";
import useInput from "@/components/common/hooks/useInput";
// import Form from "@/components/common/Form";
import Input from "@/components/common/Input";
import Btn from "@/components/common/Btn";
import FormInfo from "@/components/common/FormInfo";
import { Routes } from "@/containers/App";
import Loader from "@/components/common/ProtectedRouter/Loader";
import PageWrap from "@/components/common/PageWrap";
import { Button, Form } from "react-bootstrap";

const Login: React.FC = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const isLoginPending = useSelector(selectIsLoginPending);
  const isLoginRejected = useSelector(selectIsLoginRejected);
  const loginErrorMsg = useSelector(selectLoginErrorMsg);

  const isRestoreAuthPending = useSelector(selectIsRestoreAuthPending);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [isSignUp, setIsSignIn] = useState(false);

  const dispatch = useDispatch();

  const handleInputs = ({
    target: { name, value },
  }: {
    target: { name: string; value: string };
  }) => setUser({ ...user, [name]: value });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signupAsync(user.email, user.password));
      return;
    }
    dispatch(loginAsync(user.email, user.password));
  };

  const handleCheckbox = ({
    target: { checked },
  }: {
    target: { checked: boolean };
  }) => setIsSignIn(checked);

  if (isLoggedIn) return <Redirect to={Routes.ROOT} />;

  const isDisabled = isLoginPending || isRestoreAuthPending;

  // if (isDisabled) return <Loader />;

  return (
    <PageWrap>
      {isDisabled ? (
        <Loader />
      ) : (
        <Form onSubmit={handleSubmit} style={{ minWidth: 250 }}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={user.email}
              onChange={handleInputs}
              disabled={isDisabled}
              type="email"
              required
              autoFocus
              name="email"
              autoComplete="email"
              placeholder="Enter your email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={user.password}
              onChange={handleInputs}
              disabled={isDisabled}
              type="password"
              required
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              onChange={handleCheckbox}
              checked={isSignUp}
              type="checkbox"
              label="I don't have account"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {isSignUp ? "Sign up" : "Sign in"}
          </Button>

          <FormInfo isError={isLoginRejected}>{loginErrorMsg}</FormInfo>
        </Form>
      )}
    </PageWrap>
  );
};

const LoginStyled = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
`;

const InputWrapper = styled.div`
  margin-bottom: 15px;
`;

export default Login;
