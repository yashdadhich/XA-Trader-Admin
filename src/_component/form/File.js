import React, { useEffect, useState } from "react";
import { SignedUploader, UploadField } from "@navjobs/upload";
import { Button, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { FieldFeedbackLabel } from "../../_metronic/_partials/controls/forms/FieldFeedbackLabel";
import { toAbsoluteUrl } from "../../_metronic/_helpers";

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

export function File({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = false,
  customFeedbackLabel,
  files = [],
  onUpload = null,
  multiple = false,
  ...props
}) {
  const [uploadFieldKey, setUploadFieldKey] = useState(
    `${label}-${values[field.name].length}`
  );
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const getUploadUrl = (fileName) => {
    return axios.get(
      `${process.env.REACT_APP_FILE_URL}/file/${encodeURIComponent(
        // eslint-disable-next-line no-useless-concat
        fileName.replace(/.([^.]*)$/, "%2E" + "$1")
      )}`
    );
  };

  const getFileUrl = (fileName) => {
    return axios.get(
      `${process.env.REACT_APP_FILE_URL}/files/${encodeURIComponent(
        // eslint-disable-next-line no-useless-concat
        fileName.replace(/.([^.]*)$/, "%2E" + "$1")
      )}`
    );
  };

  useEffect(() => {
    if (files && values[field.name].length > 0) {
      files.map(async (file) => {
        const response = await getFileUrl(file.fileName);

        if (!response.error) {
          if (multiple) {
            setUploadedFiles([
              ...uploadedFiles,
              { fileName: response.data[0], fileType: file.fileType },
            ]);
          } else {
            setUploadedFiles([
              { fileName: response.data[0], fileType: file.fileType },
            ]);
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {label && <label>Enter {label}</label>}
      <SignedUploader
        key={label}
        beforeRequest={({ files }) =>
          new Promise(async (resolve, reject) => {
            const response = await getUploadUrl(files[0].name);

            if (response.error && response.error.message) {
              reject({ error: response.error.message });
            }

            resolve({
              fileName: response.data.fileName,
              fileType: files[0].type,
              url: response.data.url[0],
            });
          })
        }
        request={({ before, files }) => ({
          url: before.url,
          method: "PUT",
          headers: {
            "Content-Type": files[0].type,
          },
        })}
        afterRequest={({ before }) =>
          new Promise(async (resolve) => {
            const response = await getFileUrl(before.fileName);

            let uploadedFile = "";

            if (!response.error) {
              uploadedFile = response.data[0];
            }

            if (multiple) {
              setFieldValue(field.name, [
                ...values[field.name],
                { fileName: before.fileName, fileType: before.fileType },
              ]);

              setUploadedFiles([
                ...uploadedFiles,
                { fileName: uploadedFile, fileType: before.fileType },
              ]);
            } else {
              setFieldValue(field.name, [
                { fileName: before.fileName, fileType: before.fileType },
              ]);

              setUploadedFiles([
                { fileName: uploadedFile, fileType: before.fileType },
              ]);
            }

            setUploadFieldKey(`${label}-${values[field.name].length + 1}`);

            resolve("finished the upload!");
          })
        }
        uploadOnSelection={true}
        {...field}
        {...props}
      >
        {({
          onFiles,
          startUpload,
          progress,
          complete,
          canceled,
          failed,
          files: currentFiles,
        }) => (
          <div className="uploader">
            <UploadField
              id="uploader"
              name="uploader"
              key={uploadFieldKey}
              onFiles={onFiles}
              uploadProps={{
                accept: ".jpg,.jpeg,.png,.gif,.txt,.pdf,.doc,.docx",
              }}
              className={getFieldCSSClasses(
                touched[field.name],
                errors[field.name]
              )}
            ></UploadField>

            <div className="w-100 float-left">
              {progress && !complete && (
                <ProgressBar
                  now={progress}
                  label={`${progress}%`}
                  variant="info"
                  style={{ height: 20 }}
                />
              )}
              {/* {complete ? <Progress value={100} color="success" style={{height: 20}} /> : null} */}
              {canceled ? (
                <ProgressBar
                  now="100"
                  label="100%"
                  variant="warning"
                  style={{ height: 20 }}
                />
              ) : null}
              {failed ? (
                <ProgressBar
                  now="100"
                  label="100%"
                  variant="danger"
                  style={{ height: 20 }}
                />
              ) : null}
            </div>

            <div className="uploaded-files">
              {uploadedFiles.map(
                (uploadedFile, index) =>
                  uploadedFile && (
                    <div className="uploaded-file" key={index}>
                      <div className="file">
                        {["image/jpeg", "image/png", "image/gif"].includes(
                          uploadedFile.fileType
                        ) && (
                          <a
                            href={uploadedFile.fileName}
                            rel="noopener noreferrer"
                            target="_blank"
                            key={index}
                          >
                            <img src={uploadedFile.fileName} alt="" />
                          </a>
                        )}
                        {uploadedFile.fileType === "text/plain" && (
                          <a
                            href={uploadedFile.fileName}
                            rel="noopener noreferrer"
                            target="_blank"
                            key={index}
                          >
                            <img
                              src={toAbsoluteUrl("/media/svg/upload/txt.svg")}
                              alt=""
                            />
                          </a>
                        )}
                        {uploadedFile.fileType === "application/pdf" && (
                          <a
                            href={uploadedFile.fileName}
                            rel="noopener noreferrer"
                            target="_blank"
                            key={index}
                          >
                            <img
                              src={toAbsoluteUrl("/media/svg/upload/pdf.svg")}
                              alt=""
                            />
                          </a>
                        )}
                        {uploadedFile.fileType === "application/msword" && (
                          <a
                            href={uploadedFile.fileName}
                            rel="noopener noreferrer"
                            target="_blank"
                            key={index}
                          >
                            <img
                              src={toAbsoluteUrl("/media/svg/upload/doc.svg")}
                              alt=""
                            />
                          </a>
                        )}
                        {uploadedFile.fileType ===
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
                          <a
                            href={uploadedFile.fileName}
                            rel="noopener noreferrer"
                            target="_blank"
                            key={index}
                          >
                            <img
                              src={toAbsoluteUrl("/media/svg/upload/docx.svg")}
                              alt=""
                            />
                          </a>
                        )}
                      </div>
                      <div className="link">
                        <Button
                          type="button"
                          variant="outline-danger"
                          size="sm"
                          block
                          onClick={() => {
                            const newFiles = uploadedFiles
                              .slice(0, index)
                              .concat(uploadedFiles.slice(index + 1));

                            setUploadedFiles(newFiles);

                            if (onUpload) {
                              onUpload(newFiles);
                            }

                            setUploadFieldKey(
                              `${label}-${values[field.name].length - 1}`
                            );
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </SignedUploader>
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[field.name]}
          touched={touched[field.name]}
          label={label}
          type="file"
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
