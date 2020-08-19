// @flow
import * as React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectLoading } from "../store/modules/login";

import FullscreenLoading from "./FullscreenLoading";

type Props = {
  children: React.Node
};

const Authenticated = ({ children }: Props) => {
  const isAuthenticated = useSelector(selectUser);
  const isLoading = useSelector(selectLoading);

  if (isLoading) return <FullscreenLoading />;

  if (isAuthenticated) return children;

  return <Redirect to="/login" />;
};

export default Authenticated;
