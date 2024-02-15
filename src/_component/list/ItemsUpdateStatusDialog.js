import React, { useEffect, useState, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { useUIContext } from "./ItemsUIContext";

const selectedItems = (entities, ids) => {
  const _Items = [];

  ids.forEach((id) => {
    const item = entities.find((el) => el.id === id);
    if (item) {
      _Items.push(item);
    }
  });

  return _Items;
};

export const ItemsUpdateStatusDialog = ({
  uiHelpers,
  show,
  onHide,
  renderItems,
  actions,
  statusData,
}) => {
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
  const { items, isLoading } = useSelector(
    (state) => ({
      items: selectedItems(state[uiHelpers.StateName].entities, uiProps.ids),
      isLoading: state[uiHelpers.StateName].actionsLoading,
    }),
    shallowEqual
  );

  // if there weren't selected item we should close modal
  useEffect(() => {
    if (uiProps.ids || uiProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for updateing item by ids
    dispatch(actions.updateItemsStatus(uiProps.ids, status)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchItems(uiProps.queryParams)).then(() => {
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
      <Modal.Header closeButton>
        <Modal.Title id="item-modal-sizes-title-lg">
          Status has been updated for selected {uiHelpers.PageName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {isLoading && (
          <div className="overlay-layer bg-transparent">
            <div className="spinner spinner-lg spinner-warning" />
          </div>
        )}
        <div className="list-timeline list-timeline-skin-light padding-30">
          <div className="list-timeline-items">
            {items.map((data, index) => renderItems(data, index))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            {statusData &&
              statusData.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
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
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
