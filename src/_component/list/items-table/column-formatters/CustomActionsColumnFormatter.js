/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";

export const CustomActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { pageName, openCloneItemDialog, openEditItemPage, openDeleteItemDialog }
) => {
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="item-edit-tooltip">Edit {pageName}</Tooltip>}
      >
        <a
          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
          onClick={() => openEditItemPage(row.id)}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
            />
          </span>
        </a>
      </OverlayTrigger>
      <> </>
      <OverlayTrigger
        overlay={<Tooltip id="item-edit-tooltip">Clone {pageName}</Tooltip>}
      >
        <a
          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
          onClick={() => openCloneItemDialog(row)}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/General/Duplicate.svg")}
            />
          </span>
        </a>
      </OverlayTrigger>
      <> </>
      <OverlayTrigger
        overlay={<Tooltip id="item-delete-tooltip">Delete {pageName}</Tooltip>}
      >
        <a
          className="btn btn-icon btn-light btn-hover-danger btn-sm"
          onClick={() => openDeleteItemDialog(row.id)}
        >
          <span className="svg-icon svg-icon-md svg-icon-danger">
            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
          </span>
        </a>
      </OverlayTrigger>
    </>
  );
};
