import React, { useRef, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import * as auth from "./authRedux";
import { getUserByToken } from "./authCrud";

function AuthInit(props) {
  const didRequest = useRef(false);
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  // We should request user by accessToken before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const { data: user } = await getUserByToken();

          dispatch(props.fulfillUser(user));
        }
      } catch (error) {
        if (!didRequest.current) {
          dispatch(props.logout());
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    };

    const authToken = JSON.parse(localStorage.getItem("authToken"));

    if (authToken) {
      requestUser();
    } else {
      dispatch(props.fulfillUser(undefined));
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line
  }, []);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>;
}

export default connect(null, auth.actions)(AuthInit);
