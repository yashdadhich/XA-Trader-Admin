/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as actions from "../_redux/actions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { useSubheader } from "../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../_metronic/_partials/controls";

import * as rolesActions from "../../Roles/_redux/actions";
import { Input } from "../../../../_metronic/_partials/controls";
import { Select } from "../../../../_metronic/_partials/controls";

const initialValues = {
  roleId: "",
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
  roleId: Yup.string().required("This field is required"),
  firstName: Yup.string().required("This field is required"),
  lastName: Yup.string().required("This field is required"),
  companyName: Yup.string().required("This field is required"),
  address: Yup.string().required("This field is required"),
  city: Yup.string().required("This field is required"),
  state: Yup.string().required("This field is required"),
  country: Yup.string().required("This field is required"),
  pincode: Yup.string().required("This field is required"),
  phone: Yup.string().required("This field is required"),
  email: Yup.string().required("This field is required"),
});

export default function({
  history,
  match: {
    params: { id },
  },
}) {
  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, data, roles } = useSelector(
    (state) => ({
      actionsLoading: state.users.actionsLoading,
      data: state.users.data,
      roles: state.roles.searchItems,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchItem(id));
    dispatch(rolesActions.fetchSelectItems("title"));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : "New User";

    if (data && id) {
      _title = "Edit User";
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, id]);

  const saveUser = (values) => {
    if (!id) {
      dispatch(actions.createItem(values)).then(() => backToList());
    } else {
      dispatch(actions.updateItem(values)).then(() => backToList());
    }
  };

  const btnRef = useRef();
  const saveClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToList = () => {
    history.push("/users");
  };

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button type="button" onClick={backToList} className="btn btn-light">
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={saveClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="mt-5">
          <Formik
            enableReinitialize={true}
            initialValues={data || initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              saveUser(values);
            }}
          >
            {({ handleSubmit, values, handleChange, setFieldValue }) => (
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-4 mb-5">
                    <Select name="roleId" label="Role" multiple={false}>
                      <option value="">Select</option>
                      {roles &&
                        roles.map((role) => (
                          <option value={role.id} key={role.id}>
                            {role.title}
                          </option>
                        ))}
                    </Select>
                  </div>
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
