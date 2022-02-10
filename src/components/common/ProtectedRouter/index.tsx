import React from "react";
import { useSelector } from "react-redux";
import { RouteProps, Redirect } from "react-router";
import { Route } from "react-router-dom";

import { selectIsLoggedIn } from "@/store/selectors/user";
import { selectIsRestoreAuthPending } from "@/store/selectors/restore-auth";
import { Routes } from "@/containers/App";
import Loader from "./Loader";

const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const isRestoreAuthPending = useSelector(selectIsRestoreAuthPending);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isRestoreAuthPending) return <Loader />;

  return isLoggedIn ? <Route {...props} /> : <Redirect to={Routes.CHECK} />;
};

export default ProtectedRoute;
