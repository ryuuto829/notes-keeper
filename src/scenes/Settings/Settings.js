// @flow
import * as React from "react";

import Background from "../../components/Background";
import Scrollable from "../../components/Scrollable";
import PageTitle from "../../components/PageTitle";

const Settings = () => {
  return (
    <Background bgColor="#36393f">
      <Scrollable>
        <PageTitle title="Settings" />
        <div>Settings</div>
      </Scrollable>
    </Background>
  );
};

export default Settings;
