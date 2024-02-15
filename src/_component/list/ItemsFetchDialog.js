import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
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

export const ItemsFetchDialog = ({ uiHelpers, show, onHide, renderItems }) => {
  // UI Context
  const uiContext = useUIContext();
  const uiProps = useMemo(() => {
    return {
      ids: uiContext.ids,
      queryParams: uiContext.queryParams,
    };
  }, [uiContext]);

  // Redux state
  const { items } = useSelector(
    (state) => ({
      items: selectedItems(state[uiHelpers.StateName].entities, uiProps.ids),
    }),
    shallowEqual
  );

  // if there weren't selected ids we should close modal
  useEffect(() => {
    if (!uiProps.ids || uiProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="item-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="item-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="list-timeline list-timeline-skin-light padding-30">
          <div className="list-timeline-items">
            {items.map((data, index) => renderItems(data, index))}
          </div>
        </div>
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
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
