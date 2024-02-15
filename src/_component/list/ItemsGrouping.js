import React, { useMemo } from "react";
import { useUIContext } from "./ItemsUIContext";

export const ItemsGrouping = () => {
  // UI Context
  const uiContext = useUIContext();
  const uiProps = useMemo(() => {
    return {
      ids: uiContext.ids,
      setIds: uiContext.setIds,
      openDeleteItemsDialog: uiContext.openDeleteItemsDialog,
      openFetchItemsDialog: uiContext.openFetchItemsDialog,
      openUpdateItemsStatusDialog: uiContext.openUpdateItemsStatusDialog,
    };
  }, [uiContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="-font-bold font-danger-">
                <span>
                  Selected records count: <b>{uiProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={uiProps.openDeleteItemsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              {/* &nbsp;
              <button
                type="button"
                className="btn btn-primary font-weight-bolder font-size-sm"
                onClick={uiProps.openFetchItemsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-primary font-weight-bolder font-size-sm"
                onClick={uiProps.openUpdateItemsStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
