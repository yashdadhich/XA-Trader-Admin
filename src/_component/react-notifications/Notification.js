/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles((theme) => ({
  success: {
    backgroundColor: "#1bc5bd",
  },
  warning: {
    backgroundColor: "#ffa800",
  },
  error: {
    backgroundColor: "#f64e60",
  },
  info: {
    backgroundColor: "#8950fc",
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

const Notification = ({
  title,
  type,
  message,
  customClassName,
  timeOut,
  onClick,
  onRequestHide,
}) => {
  const requestHide = () => {
    if (onRequestHide) {
      onRequestHide();
    }
  };

  useEffect(() => {
    let timer = null;
    if (timeOut !== 0) {
      timer = setTimeout(requestHide, timeOut);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    // setOpen(false);
  }

  const className = classnames([
    "notification",
    `notification-${type}`,
    customClassName,
  ]);
  // const titleHtml = title ? <h4 className="title">{title}</h4> : null;

  return (
    <div className={className}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={true}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={type}
          message={message}
        />
      </Snackbar>
    </div>
  );
};

Notification.propTypes = {
  type: PropTypes.oneOf([
    "info",
    "success",
    "warning",
    "error",
    "primary",
    "secondary",
  ]),
  title: PropTypes.node,
  message: PropTypes.node,
  timeOut: PropTypes.number,
  onClick: PropTypes.func,
  onRequestHide: PropTypes.func,
  customClassName: PropTypes.string,
};

Notification.defaultProps = {
  type: "info",
  title: null,
  message: null,
  timeOut: 50000000,
  onClick: () => {},
  onRequestHide: () => {},
  customClassName: "",
};

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired,
};

export default Notification;
