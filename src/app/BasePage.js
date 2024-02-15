import React, { Suspense, lazy } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { DashboardPage } from "./pages/DashboardPage";

const RolesPage = lazy(() => import("./modules/Roles/pages/index"));
const UsersPage = lazy(() => import("./modules/Users/pages/index"));


const UpdateProfilePage = lazy(() =>
  import("./modules/Auth/pages/UpdateProfile")
);
const ChangePasswordPage = lazy(() =>
  import("./modules/Auth/pages/ChangePassword")
);

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <Redirect exact from="/" to="/dashboard" />

        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/roles" component={RolesPage} />
        <ContentRoute path="/users" component={UsersPage} />
        <ContentRoute path="/update-profile" component={UpdateProfilePage} />
        <ContentRoute path="/change-password" component={ChangePasswordPage} />
        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}
