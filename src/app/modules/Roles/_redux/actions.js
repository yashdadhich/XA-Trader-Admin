import * as requestFromServer from "./crud";
import { rolesSlice, callTypes } from "./slice";

const { actions } = rolesSlice;

export const fetchItems = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findItems(queryParams)
    .then((response) => {
      const { total: totalCount, data: entities } = response.data;
      dispatch(actions.itemsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Role";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchSelectItems = (titleField) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findSelectItems(titleField)
    .then((response) => {
      const { data: searchItems } = response.data;
      dispatch(actions.selectItemsFetched({ searchItems }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Role";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchItem = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.itemFetched({ data: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getItemById(id)
    .then((response) => {
      dispatch(actions.itemFetched({ data: response.data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Role";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createItem = (data) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createItem(data)
    .then((response) => {
      dispatch(actions.itemCreated({ data: response.data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create Role";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const cloneItem = (id) => async (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return await requestFromServer
    .cloneItem(id)
    .then((response) => {
      dispatch(actions.itemCloned({ data: response.data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't clone Role";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateItem = (data) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateItem(data)
    .then(() => {
      dispatch(actions.itemUpdated({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update Role";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateItemsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForItems(ids, status)
    .then(() => {
      dispatch(actions.itemsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update Role status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteItems = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteItems(ids)
    .then(() => {
      dispatch(actions.itemsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete Role";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteItem = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteItem(id)
    .then((response) => {
      dispatch(actions.itemDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete Role";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
