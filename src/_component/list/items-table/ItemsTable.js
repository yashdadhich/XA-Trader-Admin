// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from "../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../_metronic/_partials/controls";
import { useUIContext } from "../ItemsUIContext";

export const ItemsTable = ({
  uiHelpers,
  actions,
  columns,
  entityName,
  showActions,
  customFetchAction,
  actionsColumnFormatter,
  selectRow,
  showCloneButton,
  match,
}) => {
  // UI Context
  const UIContext = useUIContext();
  const UIProps = useMemo(() => {
    return {
      ids: UIContext.ids,
      setIds: UIContext.setIds,
      queryParams: UIContext.queryParams,
      setQueryParams: UIContext.setQueryParams,
      openCloneItemDialog: UIContext.openCloneItemDialog,
      openEditItemPage: UIContext.openEditItemPage,
      openDeleteItemDialog: UIContext.openDeleteItemDialog,
      openRoleAssignmentPage: UIContext.openRoleAssignmentPage,
      openWalletTransactionPage: UIContext.openWalletTransactionPage,
    };
  }, [UIContext]);

  // Getting curret state of Item list from store (Redux)
  const { totalCount, entities, listLoading } = useSelector(
    (state) => ({
      totalCount: state[uiHelpers.StateName].totalCount,
      entities: entityName
        ? state[uiHelpers.StateName][entityName]
        : state[uiHelpers.StateName].entities,
      listLoading: state[uiHelpers.StateName].listLoading,
    }),
    shallowEqual
  );

  // Items Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    // clear selections list
    UIProps.setIds([]);
    // server call by queryParams
    if (customFetchAction) {
      dispatch(
        actions[customFetchAction]({ ...UIProps.queryParams, ...match.params })
      );
    } else {
      dispatch(actions.fetchItems({ ...UIProps.queryParams, ...match.params }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UIProps.queryParams, dispatch]);

  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: UIProps.queryParams.pageSize,
    page: UIProps.queryParams.pageNumber,
  };

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                bordered={false}
                hideSelectAll={false}
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={
                  showActions
                    ? [
                        ...columns,
                        {
                          dataField: "action",
                          text: "Actions",
                          formatter: actionsColumnFormatter
                            ? columnFormatters[actionsColumnFormatter]
                            : columnFormatters.ActionsColumnFormatter,
                          formatExtraData: {
                            pageName: uiHelpers.PageName,
                            PageNameKey: uiHelpers.PageNameKey,
                            openCloneItemDialog: UIProps.openCloneItemDialog,
                            openEditItemPage: UIProps.openEditItemPage,
                            openDeleteItemDialog: UIProps.openDeleteItemDialog,
                            openWalletTransactionPage:
                              UIProps.openWalletTransactionPage,
                            showCloneButton,
                          },
                          classes: "text-right pr-0",
                          headerClasses: "text-right pr-3",
                          style: {
                            minWidth: "100px",
                          },
                        },
                      ]
                    : [...columns]
                }
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(UIProps.setQueryParams)}
                selectRow={
                  selectRow
                    ? getSelectRow({
                        entities,
                        ids: UIProps.ids,
                        setIds: UIProps.setIds,
                      })
                    : undefined
                }
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
};
