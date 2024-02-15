import React, { useState } from "react";
import { FieldFeedbackLabel } from "./FieldFeedbackLabel";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

export function Input({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = false,
  customFeedbackLabel,
  type = "text",
  ...props
}) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = (e) => {
    setPasswordVisible((prevState) => !prevState);
  };

  const isPasswordField = type === "password";
  const inputType = isPasswordField && !isPasswordVisible ? "password" : "type";

  return (
    <>
      {label && <label>Enter {label}</label>}
      <div className="input-group">
        <input
          type={inputType}
          className={getFieldCSSClasses(touched[field.name], errors[field.name])}
          value={field.value}
          onChange={(e) => {
            // Update the input field value with the new value
            const newValue = e.target.value;
            setFieldValue(field.name, newValue);

            // If the input is a password field, clear the visibility when typing
            if (isPasswordField && isPasswordVisible) {
              setPasswordVisible(false);
            }
          }}
          {...props}
        />
        {isPasswordField && (
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        )}
      </div>
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
