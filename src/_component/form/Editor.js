import React, { useEffect, useRef, useState } from "react";
import { FormControlLabel, Switch } from "@material-ui/core";
import katex from "katex";
import ReactQuill, { Quill } from "react-quill";
import "./jquery";
import "mathquill/build/mathquill";
import mathquill4quill from "mathquill4quill";
import htmlEditButton from "quill-html-edit-button";
import "katex/dist/katex.min.css";
import "react-quill/dist/quill.snow.css";
import "mathquill/build/mathquill.css";
import "mathquill4quill/mathquill4quill.css";
import { FieldFeedbackLabel } from "../../_metronic/_partials/controls/forms/FieldFeedbackLabel";

// KaTeX dependency
window.katex = katex;

// Quill dependency
const Font = Quill.import("formats/font");
Font.whitelist = ["sans-serif", "KrutiDev010", "Devanagari"];
Quill.register(Font, true);

Quill.register("modules/htmlEditButton", htmlEditButton);

const quillModules = {
  formula: true,
  toolbar: [
    [{ font: Font.whitelist }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ align: [] }],
    ["link", "image", "video", "formula"],
    ["clean"],
  ],
  htmlEditButton: {},
};

const quillFormats = [
  "font",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "align",
  "link",
  "image",
  "video",
  "formula",
];

const getFieldCSSClasses = (touched, errors, formControlClass = true) => {
  const classes = formControlClass ? ["form-control"] : [];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    classes.push("is-valid");
  }

  return classes.join(" ");
};

export function Editor({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = false,
  customFeedbackLabel,
  type = "text",
  ...props
}) {
  const [showEditor, setShowEditor] = useState(false);

  const reactQuill = useRef(null);

  useEffect(() => {
    if (showEditor) {
      const enableMathQuillFormulaAuthoring = mathquill4quill({ Quill, katex });
      enableMathQuillFormulaAuthoring(reactQuill.current.editor, {
        displayHistory: true,
        historySize: 10,
        operators: [
          ["\\pm", "\\pm"],
          ["\\sqrt{x}", "\\sqrt"],
          ["\\sqrt[3]{x}", "\\sqrt[3]{}"],
          ["\\sqrt[n]{x}", "\\nthroot"],
          ["\\frac{x}{y}", "\\frac"],
          ["\\sum^{s}_{x}{d}", "\\sum"],
          ["\\prod^{s}_{x}{d}", "\\prod"],
          ["\\coprod^{s}_{x}{d}", "\\coprod"],
          ["\\int^{s}_{x}{d}", "\\int"],
          ["\\binom{n}{k}", "\\binom"],
        ],
      });
    }
  }, [showEditor]);

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="float-left">
          {label && <label>Enter {label}</label>}
        </div>
        <div className="float-right">
          <FormControlLabel
            name="boolean"
            className="m-0"
            checked={showEditor}
            onChange={() => setShowEditor(!showEditor)}
            value={true}
            control={<Switch color="primary" />}
            label={`${showEditor ? "Hide" : "Show"} Html Editor`}
            labelPlacement="start"
          />
        </div>
      </div>
      <div className="col-lg-12">
        {showEditor ? (
          <ReactQuill
            ref={reactQuill}
            id="editor"
            className={getFieldCSSClasses(
              touched[field.name],
              errors[field.name],
              false
            )}
            value={field.value || ""}
            onChange={field.onChange(field.name)}
            theme="snow"
            modules={quillModules}
            formats={quillFormats}
            placeholder="Type text here, or click on the formula button to enter math."
            {...field}
            {...props}
          />
        ) : (
          <textarea
            rows={5}
            className={getFieldCSSClasses(
              touched[field.name],
              errors[field.name]
            )}
            {...field}
            {...props}
          />
        )}

        {withFeedbackLabel && (
          <FieldFeedbackLabel
            error={errors[field.name]}
            touched={touched[field.name]}
            label={label}
            type={type}
            customFeedbackLabel={customFeedbackLabel}
          />
        )}
      </div>
    </div>
  );
}
