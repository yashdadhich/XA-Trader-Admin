import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useUIContext } from "./ItemsUIContext";

const prepareFilter = (queryParams, columns, values) => {
  const { searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};

  if (searchText) {
    columns.forEach((column) => {
      filter[column.dataField] = searchText;
    });
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};

export const ItemsFilter = ({ columns }) => {
  // UI Context
  const Context = useUIContext();
  const UIProps = useMemo(() => {
    return {
      setQueryParams: Context.setQueryParams,
      queryParams: Context.queryParams,
    };
  }, [Context]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(UIProps.queryParams, columns, values);
    if (!isEqual(newQueryParams, UIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      UIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          status: "", // values => All=""/Selling=0/Sold=1
          condition: "", // values => All=""/New=0/Used=1
          searchText: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              {/* <div className="col-lg-2">
                <select
                  className="form-control"
                  name="status"
                  placeholder="Filter by Status"
                  onChange={(e) => {
                    setFieldValue("status", e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.status}
                >
                  <option value="">All</option>
                  <option value="0">Selling</option>
                  <option value="1">Sold</option>
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Status
                </small>
              </div>
              <div className="col-lg-2">
                <select
                  className="form-control"
                  placeholder="Filter by Type"
                  name="condition"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("condition", e.target.value);
                    handleSubmit();
                  }}
                  value={values.condition}
                >
                  <option value="">All</option>
                  <option value="0">New</option>
                  <option value="1">Used</option>
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Condition
                </small>
              </div> */}
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Search"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue("searchText", e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Search</b> in all fields
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};
