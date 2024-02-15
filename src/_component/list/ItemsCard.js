import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../_metronic/_partials/controls";
import { ItemsGrouping, ItemsFilter, ItemsTable, useUIContext } from ".";

export const ItemsCard = ({
  uiHelpers,
  columns,
  showAddButton,
  showActions,
  selectRow,
  render,
  CardStyle,
  ...props
}) => {
  const UIContext = useUIContext();
  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      queryParams: UIContext.queryParams,
      setQueryParams: UIContext.setQueryParams,
      newItemButtonClick: UIContext.newItemButtonClick,
      openCloneItemDialog: UIContext.openCloneItemDialog,
      openDeleteItemsDialog: UIContext.openDeleteItemsDialog,
      openEditItemPage: UIContext.openEditItemPage,
      openUpdateItemsStatusDialog: UIContext.openUpdateItemsStatusDialog,
      openFetchItemsDialog: UIContext.openFetchItemsDialog,
      openRoleAssignmentPage: UIContext.openRoleAssignmentPage,
      openWalletTransactionPage: UIContext.openWalletTransactionPage,
    };
  }, [UIContext]);

  const cardStyles = {
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    margin: "20px 0",
    padding: "20px",
  };

  const headerStyles = {
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #dee2e6",
    padding: "15px 20px",
    borderRadius: "10px 10px 0 0",
  };

  const buttonStyles = {
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyles = {
    backgroundColor: "#0056b3",
  };

  return (
    <div className="row">
      <div className={CardStyle ? CardStyle : "col-12"}>
        <Card style={cardStyles}>
          <CardHeader style={headerStyles}>
            {showAddButton && (
              <CardHeaderToolbar className="ml-auto">
                <button
                  type="button"
                  style={buttonStyles}
                  onMouseOver={(e) => (e.target.style = buttonHoverStyles)}
                  onMouseOut={(e) => (e.target.style = buttonStyles)}
                  onClick={UIProps.newItemButtonClick}
                >
                  New {uiHelpers.PageName}
                </button>
              </CardHeaderToolbar>
            )}
          </CardHeader>

          <CardBody>
            {render ? (
              render(UIProps.openWalletTransactionPage)
            ) : (
              <>
                <ItemsFilter columns={columns} />
                {UIProps.ids.length > 0 && <ItemsGrouping />}
                <ItemsTable
                  uiHelpers={uiHelpers}
                  columns={columns}
                  showActions={showActions}
                  selectRow={selectRow}
                  {...props}
                />
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
