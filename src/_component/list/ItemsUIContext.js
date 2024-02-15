import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";

const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
}

export const ItemsUIConsumer = UIContext.Consumer;

export function ItemsUIProvider({ initialFilter, UIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    newItemButtonClick: UIEvents.newItemButtonClick,
    openCloneItemDialog: UIEvents.openCloneItemDialog,
    openEditItemPage: UIEvents.openEditItemPage,
    openDeleteItemDialog: UIEvents.openDeleteItemDialog,
    openDeleteItemsDialog: UIEvents.openDeleteItemsDialog,
    openFetchItemsDialog: UIEvents.openFetchItemsDialog,
    openUpdateItemsStatusDialog: UIEvents.openUpdateItemsStatusDialog,
    openRoleAssignmentPage: UIEvents.openRoleAssignmentPage,
    openWalletTransactionPage: UIEvents.openWalletTransactionPage,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
