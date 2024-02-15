/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useUIContext } from "./ItemsUIContext";
import { ModalProgressBar } from "../../_metronic/_partials/controls";

export const ItemCloneDialog = ({ id, uiHelpers, show, onHide, actions }) => {
  // UI Context
  const uiContext = useUIContext();
  const uiProps = useMemo(() => {
    return {
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

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const cloneItem = () => {
    // server request for deleting item by id
    dispatch(actions.cloneItem(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchItems(uiProps.queryParams));
      // clear selections list
      uiProps.setIds([]);
      // closing clone modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="item-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="item-modal-sizes-title-lg">
          {uiHelpers.PageName} Clone
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to clone this {uiHelpers.PageName}?</span>
        )}
        {isLoading && <span>{uiHelpers.PageName} is cloning...</span>}
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
            onClick={cloneItem}
            className="btn btn-primary btn-elevate"
          >
            Clone
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
