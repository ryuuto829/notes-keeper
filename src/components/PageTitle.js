// @flow
import * as React from "react";
import { Helmet } from "react-helmet";

type Props = {
  title: string
};

const PageTitle = ({ title }: Props) => {
  return (
    <Helmet>
      <title>{`${title} - notesKeeper`}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};

export default PageTitle;
