/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";

export const StatementActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openWalletTransactionPage }
) => {
  return (
    <>
      {row.totalPayableAmount !== 0 ? (
        <OverlayTrigger
          overlay={<Tooltip id="item-view-tooltip">View Statement</Tooltip>}
        >
          <a
            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
            onClick={() => openWalletTransactionPage(row.id)}
          >
            <span className="svg-icon svg-icon-md svg-icon-primary">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Text/Bullet-list.svg")}
              />
            </span>
          </a>
        </OverlayTrigger>
      ) : null}
    </>
  );
};
