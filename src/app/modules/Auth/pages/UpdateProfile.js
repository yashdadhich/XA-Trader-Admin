/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as auth from "../_redux/authRedux";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { useSubheader } from "../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../_metronic/_partials/controls";
import { Input } from "../../../../_metronic/_partials/controls";
import { updateProfile } from "../_redux/authCrud";
import { NotificationManager } from "../../../../_component/react-notifications";
import { MOBILE_NUMBER_REGEX, PINCODE_REGEX} from "../../../../_component/constant";

const initialValues = {
  firstName: "",
  lastName: "",
  companyName: "",
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  phone: "",
  email: "",
};

// Validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("This field is required"),
  lastName: Yup.string().required("This field is required"),
  companyName: Yup.string().required("This field is required"),
  address: Yup.string().required("This field is required"),
  city: Yup.string().required("This field is required"),
  state: Yup.string().required("This field is required"),
  country: Yup.string().required("This field is required"),
  pincode: Yup.string()
  .matches(PINCODE_REGEX, { message: "Enter valid pincode" })
  .required("Enter your pincode"),   email: Yup.string()
  .email()
  .required("This field is required"),
  phone: Yup.string()
  .matches(MOBILE_NUMBER_REGEX, { message: "Enter valid phone number" })
  .required("Enter your mobile number"),  
});

function UpdateProfile(props) {
  const [loading, setLoading] = useState(false);
  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [title, setTitle] = useState("");

  useEffect(() => {
    let _title = "Update Profile";
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

  const UpdateProfile = (values) => {
    enableLoading();

    updateProfile(values)
      .then(() => {
        disableLoading();

        NotificationManager.success(
          "Profile updated successfully",
          "",
          3000,
          null,
          null,
          ""
        );

        props.fulfillUser({ ...props.user, ...values });
      })
      .catch(() => {
        NotificationManager.error(
          "Unable to update profile",
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
            Update Profile
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="mt-5">
          <Formik
            enableReinitialize={true}
            initialValues={
              props.user
                ? {
                    firstName: props.user.firstName,
                    lastName: props.user.lastName,
                    companyName: props.user.companyName,
                    address: props.user.address,
                    city: props.user.city,
                    state: props.user.state,
                    country: props.user.country,
                    pincode: props.user.pincode,
                    phone: props.user.phone,
                    email: props.user.email,
                  }
                : initialValues
            }
            validationSchema={validationSchema}
            onSubmit={(values) => {
              UpdateProfile(values);
            }}
          >
            {({ handleSubmit }) => (
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-4 mb-5">
                    <Field
                      name="firstName"
                      component={Input}
                      placeholder="First Name"
                      label="First Name"
                    />
                  </div>
                  <div className="col-lg-4 mb-5">
                    <Field
                      name="lastName"
                      component={Input}
                      placeholder="Last Name"
                      label="Last Name"
                    />
                  </div>
                  <div className="col-lg-4 mb-5">
                    <Field
                      name="companyName"
                      component={Input}
                      placeholder="Company Name"
                      label="Company Name"
                    />
                  </div>
                  <div className="col-lg-4 mb-5">
                    <Field
                      name="address"
                      component={Input}
                      placeholder="Address"
                      label="Address"
                    />
                  </div>
                  <div className="col-lg-4 mb-5">
                    <Field
                      name="city"
                      component={Input}
                      placeholder="City"
                      label="City"
                    />
                  </div>
                  <div className="col-lg-4 mb-5">
                    <Field
                      name="state"
                      component={Input}
                      placeholder="State"
                      label="State"
                    />
                  </div>
                  <div className="col-lg-4 mb-5">
                    <Field
                      name="country"
                      component={Input}
                      placeholder="Country"
                      label="Country"
                    />
                  </div>
                  <div className="col-lg-4 mb-5">
                    <Field
                      type="number"
                      name="pincode"
                      component={Input}
                      placeholder="Pin Code"
                      label="Pin Code"
                    />
                  </div>
                  <div className="col-lg-4 mb-5">
                    <Field
                      type="number"
                      name="phone"
                      component={Input}
                      placeholder="Phone"
                      label="Phone"
                    />
                  </div>
                  <div className="col-lg-4 mb-5">
                    <Field
                      name="email"
                      component={Input}
                      placeholder="Email"
                      label="Email"
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

export default connect(({ auth }) => {
  const { user } = auth;

  return { user };
}, auth.actions)(UpdateProfile);
