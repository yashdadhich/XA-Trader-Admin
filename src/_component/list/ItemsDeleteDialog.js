/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useUIContext } from "./ItemsUIContext";
import { ModalProgressBar } from "../../_metronic/_partials/controls";

export const ItemsDeleteDialog = ({ uiHelpers, show, onHide, actions }) => {
  // UI Context
  const uiContext = useUIContext();
  const uiProps = useMemo(() => {
    return {
      ids: uiContext.ids,
      setIds: uiContext.setIds,
      queryParams: uiContext.queryParams,
    };
  }, [uiContext]);

  // Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state[uiHelpers.StateName].actionsLoading }),
    shallowEqual
  );

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  // if there weren't selected item we should close modal
  useEffect(() => {
    if (!uiProps.ids || uiProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiProps.ids]);

  const deleteItems = () => {
    // server request for deleting item by seleted ids
    dispatch(actions.deleteItems(uiProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchItem(uiProps.queryParams)).then(() => {
        // clear selections list
        uiProps.setIds([]);
        // closing delete modal
        onHide();
      });
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="item-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="item-modal-sizes-title-lg">
          {uiHelpers.PageName} Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            Are you sure to permanently delete selected {uiHelpers.PageName}?
          </span>
        )}
        {isLoading && <span>{uiHelpers.PageName} are deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteItems}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
