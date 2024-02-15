import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import { CircularProgress } from "@material-ui/core";
import * as auth from "../_redux/authRedux";

function Unauthorize(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (process.env.NODE_ENV !== "production") {
        dispatch(props.logout());
      }
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex flex-column flex-root">
      {/*begin::Login*/}
      <div
        className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
        id="kt_login"
      >
        {/*begin::Content*/}
        <div className="d-flex flex-column flex-row-fluid position-relative p-7 overflow-hidden">
          {/* begin::Content body */}
          <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
            <div className="login-form login-signin" id="kt_login_signin_form">
              {/* begin::Head */}
              <div className="text-center mb-10 mb-lg-20">
                <h3 className="font-size-h1">
                  <FormattedMessage id="AUTH.UNAUTHORIZE.TITLE" />
                </h3>
                <p className="text-muted font-weight-bold">
                  You are not authorized to access this.
                </p>
                <CircularProgress
                  className="splash-screen-spinner"
                  color="secondary"
                />
              </div>
              {/* end::Head */}
            </div>
          </div>
          {/*end::Content body*/}
        </div>
        {/*end::Content*/}
      </div>
      {/*end::Login*/}
    </div>
  );
}

export default connect(null, auth.actions)(Unauthorize);
