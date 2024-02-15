import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { FieldFeedbackLabel } from "../../_metronic/_partials/controls/forms/FieldFeedbackLabel";

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control"];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    classes.push("is-valid");
  }

  return classes.join(" ");
};

export function CustomInput({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = false,
  customFeedbackLabel,
  type = "text",
  ...props
}) {
  return (
    <>
     {label && <label>Enter {label}</label>}
      <InputGroup>
        <FormControl
          type={type}
          aria-describedby="basic-addon1"
          className={getFieldCSSClasses(
            touched[field.name],
            errors[field.name]
          )}
          {...field}
          {...props}
        />
      </InputGroup>
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[field.name]}
          touched={touched[field.name]}
          label={label}
          type={type}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
