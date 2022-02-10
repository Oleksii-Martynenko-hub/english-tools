import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Routes } from "@/containers/App";
import PageWrap from "@/components/common/PageWrap";
import Navigation from "@/components/common/Navigation";
import Dictionary from "@/components/Dictionary";
import TrainingCamp from "@/components/TrainingCamp";

const Home: React.FC = () => {
  const menuLinks: [string, string, boolean][] = [
    [Routes.DICTIONARY, "Dictionary", true],
    [Routes.TRAINING_CAMP, "Training Camp", true],
    [Routes.PROFILE, "Profile", true],
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const firstAvailableLink = menuLinks.find(
    ([route, name, isAvailable]) => isAvailable
  );

  return (
    <PageWrap nav={<Navigation menuLinks={menuLinks} />}>
      <Switch>
        <Redirect from={Routes.ROOT} to={firstAvailableLink![0]} exact />
        <Route path={Routes.DICTIONARY} component={Dictionary} exact />
        <Route path={Routes.TRAINING_CAMP} component={TrainingCamp} exact />
      </Switch>
    </PageWrap>
  );
};

export default Home;
