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

import { Input } from "../../../../_metronic/_partials/controls";

const initialValues = { title: "" };

// Validation schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required("This field is required"),
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
  const { actionsLoading, data } = useSelector(
    (state) => ({
      actionsLoading: state.roles.actionsLoading,
      data: state.roles.data,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchItem(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : "New Role";

    if (data && id) {
      _title = "Edit Role";
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, id]);

  const saveRole = (values) => {
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
    history.push("/roles");
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
              saveRole(values);
            }}
          >
            {({ handleSubmit, values, handleChange, setFieldValue }) => (
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-4 mb-5">
                    <Field
                      name="title"
                      component={Input}
                      placeholder="Title"
                      label="Title"
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
