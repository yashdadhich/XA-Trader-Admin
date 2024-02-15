import React, { useState } from "react";
import { Route } from "react-router-dom";
import {
  ItemsCard,
  ItemsLoadingDialog,
  ItemsDeleteDialog,
  ItemDeleteDialog,
  ItemsFetchDialog,
  ItemsUpdateStatusDialog,
  ItemsUIProvider,
} from ".";
import { ItemCloneDialog } from "./ItemCloneDialog";
import { StatusData } from "../constant";

export const ItemsList = ({
  history,
  match,
  actions,
  uiHelpers,
  columns,
  entityName = null,
  customFetchAction = null,
  showAddButton = true,
  showCloneButton = true,
  selectRow = true,
  showActions = true,
  actionsColumnFormatter = null,
  render=null,
  CardStyle=null,
  ...props
}) => {
  const [slug] = useState(match.url);

  const UIEvents = {
    newItemButtonClick: () => {
      history.push(`${match.url}/new`);
    },
    openCloneItemDialog: (data) => {
      history.push({
        pathname: `${match.url}/${data.id}/clone`,
        data,
      });
    },
    openEditItemPage: (id) => {
      history.push(`${match.url}/${id}/edit`);
    },
    openDeleteItemDialog: (id) => {
      history.push(`${match.url}/${id}/delete`);
    },
    openDeleteItemsDialog: () => {
      history.push(`${match.url}/delete`);
    },
    openFetchItemsDialog: () => {
      history.push(`${match.url}/fetch`);
    },
    openUpdateItemsStatusDialog: () => {
      history.push(`${match.url}/updateStatus`);
    },
    openRoleAssignmentPage: (id) => {
      history.push(`${match.url}/${id}/assignment`);
    },
    openWalletTransactionPage: (id) => {
      history.push(`${match.url}/${id}/transactions`);
    },
  };

  return (
    <ItemsUIProvider
      initialFilter={uiHelpers.initialFilter}
      UIEvents={UIEvents}
    >
      <ItemsLoadingDialog name={uiHelpers.StateName} />
      <Route path={`${match.url}/:id/clone`}>
        {({ history, match }) => (
          <ItemCloneDialog
            uiHelpers={uiHelpers}
            actions={actions}
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push(slug);
            }}
          />
        )}
      </Route>
      <Route path={`${match.url}/delete`}>
        {({ history, match }) => (
          <ItemsDeleteDialog
            uiHelpers={uiHelpers}
            actions={actions}
            show={match != null}
            onHide={() => {
              history.push(slug);
            }}
          />
        )}
      </Route>
      <Route path={`${match.url}/:id/delete`}>
        {({ history, match }) => (
          <ItemDeleteDialog
            uiHelpers={uiHelpers}
            actions={actions}
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push(slug);
            }}
          />
        )}
      </Route>
      <Route path={`${match.url}/fetch`}>
        {({ history, match }) => (
          <ItemsFetchDialog
            uiHelpers={uiHelpers}
            renderItems={(item, index) => (
              <div className="list-timeline-item mb-3" key={item.id}>
                <span className="list-timeline-text">
                  <span className="label label-lg label-inline">
                    {index + 1}
                  </span>
                  <span className="ml-5">{item.textField}</span>
                </span>
              </div>
            )}
            show={match != null}
            onHide={() => {
              history.push(slug);
            }}
          />
        )}
      </Route>
      <Route path={`${match.url}/updateStatus`}>
        {({ history, match }) => (
          <ItemsUpdateStatusDialog
            actions={actions}
            uiHelpers={uiHelpers}
            renderItems={(item, index) => (
              <div className="list-timeline-item mb-3" key={item.id}>
                <span className="list-timeline-text">
                  <span className="label label-lg label-inline">
                    {index + 1}
                  </span>
                  <span className="ml-5">{item.textField}</span>
                </span>
              </div>
            )}
            statusData={StatusData}
            show={match != null}
            onHide={() => {
              history.push(slug);
            }}
          />
        )}
      </Route>
      <ItemsCard
        uiHelpers={uiHelpers}
        actions={actions}
        columns={columns}
        entityName={entityName}
        customFetchAction={customFetchAction}
        showAddButton={showAddButton}
        render={render}
        CardStyle={CardStyle}
        showCloneButton={showCloneButton}
        selectRow={selectRow}
        showActions={showActions}
        actionsColumnFormatter={actionsColumnFormatter}
        match={match}
        {...props}
      />
    </ItemsUIProvider>
  );
};
