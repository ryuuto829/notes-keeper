// @flow
import * as React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectLoading } from "../store/modules/login";
import { selectInitializing } from "../store/modules/ui";
import DocumentNew from "../scenes/DocumentNew";

import FullscreenLoading from "./FullscreenLoading";

type Props = {
  children: React.Node
};

const Authenticated = ({ children }: Props) => {
  const isAuthenticated = useSelector(selectUser);
  const isLoading = useSelector(selectLoading);
  // const isInitializing = useSelector(selectInitializing);

  if (isLoading) return <FullscreenLoading />;

  // if (isAuthenticated && isInitializing) {
  //   return <DocumentNew />;
  // }

  if (isAuthenticated) return children;

  return <Redirect to="/login" />;
};

export default Authenticated;
