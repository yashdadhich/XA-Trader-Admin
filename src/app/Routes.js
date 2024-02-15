import React, { useEffect } from "react";
import { Redirect, Switch, Route, useHistory } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { Layout } from "../_metronic/layout";
import BasePage from "./BasePage";
import { Logout, AuthPage } from "./modules/Auth";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";
import Unauthorize from "./modules/Auth/pages/unauthorize";

export function Routes() {
  const history = useHistory();

  const { isAuthorized } = useSelector(
    (state) => ({
      isAuthorized: state.auth.user != null,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (isAuthorized) {
      history.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  return (
    <Switch>
      <Route path="/auth/login">
        <AuthPage />
      </Route>
      <Route path="/error" component={ErrorsPage} />
      <Route path="/logout" component={Logout} />
      {process.env.NODE_ENV !== "production" && !isAuthorized && (
        /*Redirect to `/auth/login` when user is not authorized*/
        <Redirect to="/auth/login" />
      )}
      <Route path="/unauthorize" component={Unauthorize} />

      {isAuthorized ? (
        <Layout>
          <BasePage />
        </Layout>
      ) : (
        <Redirect to="/unauthorize" />
      )}
    </Switch>
  );
}
