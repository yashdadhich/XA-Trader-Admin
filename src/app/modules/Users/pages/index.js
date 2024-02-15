import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import List from "./List";
import Form from "./Form";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function UserPage({ match }) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path={`${match.url}/new`} component={Form} />
        <ContentRoute path={`${match.url}/:id/edit`} component={Form} />
        <ContentRoute path={match.url} component={List} />
        <Redirect from={match.url} to="/errors" />
      </Switch>
    </Suspense>
  );
}
