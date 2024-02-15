/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { useSubheader } from "../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../_metronic/_partials/controls";
import { Input } from "../../../../_metronic/_partials/controls";
import { NotificationManager } from "../../../../_component/react-notifications";
import { changePassword } from "../_redux/authCrud";

const initialValues = { oldPassword: "", newPassword: "", confirmPassword: "" };

// Validation schema
const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("This field is required"),
  newPassword: Yup.string().required("This field is required"),
  confirmPassword: Yup.string()
    .required("This field is required")
    .oneOf(
      [Yup.ref("newPassword")],
      "New Password and Confirm Password must be same"
    ),
});

export default function() {
  const [loading, setLoading] = useState(false);
  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [title, setTitle] = useState("");

  useEffect(() => {
    const _title = "Change Password";

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const ChangePassword = (values) => {
    enableLoading();

    changePassword(values.oldPassword, values.newPassword)
      .then(() => {
        disableLoading();

        NotificationManager.success(
          "Password changed successfully",
          "",
          3000,
          null,
          null,
          ""
        );
      })
      .catch(() => {
        NotificationManager.error(
          "Unable to change password",
          "",
          3000,
          null,
          null,
          ""
        );
      })
      .finally(() => {
        disableLoading();
      });
  };

  const btnRef = useRef();
  const saveClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  return (
    <Card>
      {loading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={saveClick}
          >
            Change Password
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="mt-5">
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              ChangePassword(values);
            }}
          >
            {({ handleSubmit }) => (
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-4 mb-5">
                    <Field
                      type="password"
                      name="oldPassword"
                      component={Input}
                      placeholder="Old Password"
                      label="Old Password"
                    />
                  </div>
                  <div className="col-lg-4 mb-5">
                    <Field
                      type="password"
                      name="newPassword"
                      component={Input}
                      placeholder="New Password"
                      label="New Password"
                    />
                  </div>
                  <div className="col-lg-4 mb-5">
                    <Field
                      type="password"
                      name="confirmPassword"
                      component={Input}
                      placeholder="Confirm Password"
                      label="Confirm Password"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  style={{ display: "none" }}
                  ref={btnRef}
                  onSubmit={() => handleSubmit()}
                ></button>
              </Form>
            )}
          </Formik>
        </div>
      </CardBody>
    </Card>
  );
}
