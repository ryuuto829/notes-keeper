// @flow
import React from "react";

import PageTitle from "../../../components/PageTitle";
import Empty from "../../../components/Empty";

const NotFound = () => (
  <>
    <PageTitle title="Document is unavailable" />
    <Empty>
      <p>
        Document requested by this link is unavailable. <br />
        (Maybe it was deleted or there are no such document in the store)
      </p>
      <p>Please, create new one, or find it in the 'All PAGES' section!</p>
    </Empty>
  </>
);

export default NotFound;
